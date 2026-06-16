"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FRAMES, type FrameId } from "./frames";

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 5;
const NAV_DURATION = 600;
const ZOOM_INTENSITY = 0.0032;

type Pan = { x: number; y: number };

type CanvasContextValue = {
  pan: Pan;
  zoom: number;
  isPanning: boolean;
  activeFrame: FrameId;
  navigateToFrame: (frameId: FrameId) => void;
  setActiveFrame: (frameId: FrameId) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onPanStart: (event: React.MouseEvent) => void;
};

const CanvasContext = createContext<CanvasContextValue | null>(null);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function normalizeWheelDelta(event: WheelEvent, pageHeight: number) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * pageHeight;
  }
  return event.deltaY;
}

export function CanvasProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState<Pan>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [activeFrame, setActiveFrame] = useState<FrameId>("home");
  const animationRef = useRef<number | null>(null);
  const panStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(
    null,
  );
  const panRef = useRef(pan);
  const zoomRef = useRef(zoom);
  const wheelDeltaRef = useRef(0);
  const wheelAnchorRef = useRef<{ x: number; y: number } | null>(null);
  const wheelFrameRef = useRef<number | null>(null);

  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const applyTransform = useCallback((nextPan: Pan, nextZoom: number) => {
    panRef.current = nextPan;
    zoomRef.current = nextZoom;
    setPan(nextPan);
    setZoom(nextZoom);
  }, []);

  const centerOnFrame = useCallback((frameId: FrameId, targetZoom = 1) => {
    const container = containerRef.current;
    if (!container) return;

    const frame = FRAMES[frameId];
    const viewportW = container.clientWidth;
    const viewportH = container.clientHeight;
    const frameCenterX = frame.x + frame.width / 2;
    const frameCenterY = frame.y + frame.height / 2;

    return {
      x: viewportW / 2 - frameCenterX * targetZoom,
      y: viewportH / 2 - frameCenterY * targetZoom,
      zoom: targetZoom,
    };
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initial = centerOnFrame("home", 1);
    if (initial) {
      applyTransform({ x: initial.x, y: initial.y }, initial.zoom);
    }
  }, [applyTransform, centerOnFrame]);

  const navigateToFrame = useCallback(
    (frameId: FrameId) => {
      const container = containerRef.current;
      if (!container) return;

      const target = centerOnFrame(frameId, 1);
      if (!target) return;

      setActiveFrame(frameId);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (wheelFrameRef.current) {
        cancelAnimationFrame(wheelFrameRef.current);
        wheelFrameRef.current = null;
        wheelDeltaRef.current = 0;
      }

      const startPan = { ...panRef.current };
      const startZoom = zoomRef.current;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = clamp(elapsed / NAV_DURATION, 0, 1);
        const eased = easeInOutCubic(progress);

        applyTransform(
          {
            x: startPan.x + (target.x - startPan.x) * eased,
            y: startPan.y + (target.y - startPan.y) * eased,
          },
          startZoom + (target.zoom - startZoom) * eased,
        );

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [applyTransform, centerOnFrame],
  );

  const applyWheelZoom = useCallback(() => {
    wheelFrameRef.current = null;

    const anchor = wheelAnchorRef.current;
    const delta = wheelDeltaRef.current;
    wheelDeltaRef.current = 0;

    if (!anchor || delta === 0) return;

    const currentZoom = zoomRef.current;
    const currentPan = panRef.current;
    const zoomFactor = Math.exp(-delta * ZOOM_INTENSITY);
    const nextZoom = clamp(currentZoom * zoomFactor, MIN_ZOOM, MAX_ZOOM);

    if (nextZoom === currentZoom) return;

    const canvasX = (anchor.x - currentPan.x) / currentZoom;
    const canvasY = (anchor.y - currentPan.y) / currentZoom;

    applyTransform(
      {
        x: anchor.x - canvasX * nextZoom,
        y: anchor.y - canvasY * nextZoom,
      },
      nextZoom,
    );
  }, [applyTransform]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const rect = container.getBoundingClientRect();
      wheelAnchorRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      wheelDeltaRef.current += normalizeWheelDelta(event, rect.height);

      if (wheelFrameRef.current === null) {
        wheelFrameRef.current = requestAnimationFrame(applyWheelZoom);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (wheelFrameRef.current) {
        cancelAnimationFrame(wheelFrameRef.current);
      }
    };
  }, [applyWheelZoom]);

  const onPanStart = useCallback(
    (event: React.MouseEvent) => {
      if (event.button !== 0) return;
      const target = event.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [data-no-pan]")) return;

      event.preventDefault();
      setIsPanning(true);
      panStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        panX: panRef.current.x,
        panY: panRef.current.y,
      };

      const onMove = (moveEvent: MouseEvent) => {
        if (!panStartRef.current) return;
        const dx = moveEvent.clientX - panStartRef.current.x;
        const dy = moveEvent.clientY - panStartRef.current.y;
        applyTransform(
          {
            x: panStartRef.current.panX + dx,
            y: panStartRef.current.panY + dy,
          },
          zoomRef.current,
        );
      };

      const onUp = () => {
        setIsPanning(false);
        panStartRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [applyTransform],
  );

  return (
    <CanvasContext.Provider
      value={{
        pan,
        zoom,
        isPanning,
        activeFrame,
        navigateToFrame,
        setActiveFrame,
        containerRef,
        onPanStart,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within CanvasProvider");
  }
  return context;
}

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

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const NAV_DURATION = 600;

type Pan = { x: number; y: number };

type CanvasContextValue = {
  pan: Pan;
  zoom: number;
  isPanning: boolean;
  activeFrame: FrameId;
  navigateToFrame: (frameId: FrameId) => void;
  setActiveFrame: (frameId: FrameId) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onWheel: (event: WheelEvent) => void;
  onPanStart: (event: React.MouseEvent) => void;
};

const CanvasContext = createContext<CanvasContextValue | null>(null);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

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
      setPan({ x: initial.x, y: initial.y });
      setZoom(initial.zoom);
    }
  }, [centerOnFrame]);

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

      const startPan = { ...panRef.current };
      const startZoom = zoomRef.current;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = clamp(elapsed / NAV_DURATION, 0, 1);
        const eased = easeInOutCubic(progress);

        setPan({
          x: startPan.x + (target.x - startPan.x) * eased,
          y: startPan.y + (target.y - startPan.y) * eased,
        });
        setZoom(startZoom + (target.zoom - startZoom) * eased);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [centerOnFrame],
  );

  const onWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      setZoom((currentZoom) => {
        const delta = -event.deltaY * 0.0015;
        const nextZoom = clamp(currentZoom + delta * currentZoom, MIN_ZOOM, MAX_ZOOM);

        setPan((currentPan) => {
          const canvasX = (mouseX - currentPan.x) / currentZoom;
          const canvasY = (mouseY - currentPan.y) / currentZoom;

          return {
            x: mouseX - canvasX * nextZoom,
            y: mouseY - canvasY * nextZoom,
          };
        });

        return nextZoom;
      });
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handler = (event: WheelEvent) => onWheel(event);
    container.addEventListener("wheel", handler, { passive: false });
    return () => container.removeEventListener("wheel", handler);
  }, [onWheel]);

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
        panX: pan.x,
        panY: pan.y,
      };

      const onMove = (moveEvent: MouseEvent) => {
        if (!panStartRef.current) return;
        const dx = moveEvent.clientX - panStartRef.current.x;
        const dy = moveEvent.clientY - panStartRef.current.y;
        setPan({
          x: panStartRef.current.panX + dx,
          y: panStartRef.current.panY + dy,
        });
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
    [pan.x, pan.y],
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
        onWheel,
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

"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PAGES, type PageConfig, type PageId } from "./pages";

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 5;
const IMMERSE_ZOOM = 3.4;
const IMMERSE_LEAVE_DURATION = 680;
const IMMERSE_ENTER_DURATION = 720;
const ZOOM_INTENSITY = 0.0032;
const IMMERSE_SESSION_KEY = "canvas-immerse";

type Pan = { x: number; y: number };

type ViewTarget = Pan & { zoom: number };

type CanvasContextValue = {
  pan: Pan;
  zoom: number;
  isPanning: boolean;
  isNavigating: boolean;
  currentPage: PageConfig | null;
  registerPage: (pageId: PageId) => void;
  recenterToFit: () => void;
  immerseNavigate: (href: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onPanStart: (event: React.MouseEvent) => void;
  bindWheel: (element: HTMLDivElement) => () => void;
};

const CanvasContext = createContext<CanvasContextValue | null>(null);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
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

function centerOnPoint(
  container: HTMLDivElement,
  focusX: number,
  focusY: number,
  targetZoom: number,
): ViewTarget {
  const viewportW = container.clientWidth;
  const viewportH = container.clientHeight;

  return {
    x: viewportW / 2 - focusX * targetZoom,
    y: viewportH / 2 - focusY * targetZoom,
    zoom: targetZoom,
  };
}

function resolvePageView(container: HTMLDivElement, page: PageConfig): ViewTarget {
  let zoom = page.initialZoom;

  if (page.fitToViewport) {
    const { width, height, padding = 0.85 } = page.fitToViewport;
    zoom = Math.min(
      container.clientWidth / width,
      container.clientHeight / height,
    ) * padding;
    zoom = clamp(zoom, MIN_ZOOM, MAX_ZOOM);
  }

  const focusY = page.focusY + (page.focusOffsetY ?? 0);

  return centerOnPoint(container, page.focusX, focusY, zoom);
}

export function CanvasProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState<Pan>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageConfig | null>(null);
  const animationRef = useRef<number | null>(null);
  const panStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(
    null,
  );
  const panRef = useRef(pan);
  const zoomRef = useRef(zoom);
  const wheelDeltaRef = useRef(0);
  const wheelAnchorRef = useRef<{ x: number; y: number } | null>(null);
  const wheelFrameRef = useRef<number | null>(null);
  const registeredPageRef = useRef<PageId | null>(null);

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

  const cancelAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const animateTo = useCallback(
    (
      target: ViewTarget,
      duration: number,
      easing: (t: number) => number = easeInOutCubic,
      onComplete?: () => void,
    ) => {
      const container = containerRef.current;
      if (!container) return;

      cancelAnimation();

      const startPan = { ...panRef.current };
      const startZoom = zoomRef.current;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = clamp(elapsed / duration, 0, 1);
        const eased = easing(progress);

        applyTransform(
          {
            x: startPan.x + (target.x - startPan.x) * eased,
            y: startPan.y + (target.y - startPan.y) * eased,
          },
          startZoom + (target.zoom - startZoom) * eased,
        );

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          animationRef.current = null;
          onComplete?.();
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [applyTransform, cancelAnimation],
  );

  const initializePageView = useCallback(
    (page: PageConfig) => {
      const container = containerRef.current;
      if (!container) return;

      const entering = sessionStorage.getItem(IMMERSE_SESSION_KEY) === "1";
      sessionStorage.removeItem(IMMERSE_SESSION_KEY);

      const target = resolvePageView(container, page);

      if (entering) {
        const immersed = centerOnPoint(
          container,
          page.focusX,
          page.focusY + (page.focusOffsetY ?? 0),
          IMMERSE_ZOOM,
        );
        applyTransform({ x: immersed.x, y: immersed.y }, immersed.zoom);
        animateTo(target, IMMERSE_ENTER_DURATION, easeOutCubic);
        return;
      }

      applyTransform({ x: target.x, y: target.y }, target.zoom);
    },
    [animateTo, applyTransform],
  );

  const registerPage = useCallback(
    (pageId: PageId) => {
      registeredPageRef.current = pageId;
      const page = PAGES[pageId];
      setCurrentPage(page);

      if (wheelFrameRef.current) {
        cancelAnimationFrame(wheelFrameRef.current);
        wheelFrameRef.current = null;
        wheelDeltaRef.current = 0;
      }

      cancelAnimation();

      requestAnimationFrame(() => {
        initializePageView(page);
      });
    },
    [cancelAnimation, initializePageView],
  );

  const recenterToFit = useCallback(() => {
    const page = currentPage;
    const container = containerRef.current;
    if (!page?.fitToViewport || !container) return;

    const target = resolvePageView(container, page);
    applyTransform({ x: target.x, y: target.y }, target.zoom);
  }, [applyTransform, currentPage]);

  const immerseNavigate = useCallback(
    (href: string) => {
      const container = containerRef.current;
      const page = currentPage;
      if (!container || !page || isNavigating) return;

      const targetPage = Object.values(PAGES).find((entry) => entry.href === href);
      if (!targetPage || targetPage.id === page.id) return;

      setIsNavigating(true);
      cancelAnimation();

      if (wheelFrameRef.current) {
        cancelAnimationFrame(wheelFrameRef.current);
        wheelFrameRef.current = null;
        wheelDeltaRef.current = 0;
      }

      const immerseTarget = centerOnPoint(
        container,
        page.immerseFocusX,
        page.immerseFocusY,
        IMMERSE_ZOOM,
      );

      animateTo(immerseTarget, IMMERSE_LEAVE_DURATION, easeInOutCubic, () => {
        sessionStorage.setItem(IMMERSE_SESSION_KEY, "1");
        router.push(href);
        setIsNavigating(false);
      });
    },
    [animateTo, cancelAnimation, currentPage, isNavigating, router],
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

  const bindWheel = useCallback(
    (element: HTMLDivElement) => {
      const handleWheel = (event: WheelEvent) => {
        if (isNavigating) return;
        event.preventDefault();

        const rect = element.getBoundingClientRect();
        wheelAnchorRef.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };

        wheelDeltaRef.current += normalizeWheelDelta(event, rect.height);

        if (wheelFrameRef.current === null) {
          wheelFrameRef.current = requestAnimationFrame(applyWheelZoom);
        }
      };

      element.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        element.removeEventListener("wheel", handleWheel);
        if (wheelFrameRef.current) {
          cancelAnimationFrame(wheelFrameRef.current);
          wheelFrameRef.current = null;
        }
      };
    },
    [applyWheelZoom, isNavigating],
  );

  const onPanStart = useCallback(
    (event: React.MouseEvent) => {
      if (event.button !== 0 || isNavigating) return;
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
    [applyTransform, isNavigating],
  );

  return (
    <CanvasContext.Provider
      value={{
        pan,
        zoom,
        isPanning,
        isNavigating,
        currentPage,
        registerPage,
        recenterToFit,
        immerseNavigate,
        containerRef,
        onPanStart,
        bindWheel,
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

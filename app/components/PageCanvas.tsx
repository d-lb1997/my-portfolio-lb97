"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useCanvas } from "@/lib/canvas-context";
import { PAGES, type PageId } from "@/lib/pages";
import { DOT_GRID_SIZE } from "@/lib/canvas-dots";
import { CanvasPacMan } from "./CanvasPacMan";

const DOT_MARGIN = 3200;

type ViewportSize = {
  width: number;
  height: number;
};

type DotBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function getDotBounds(
  panX: number,
  panY: number,
  zoom: number,
  viewport: ViewportSize,
): DotBounds {
  if (viewport.width === 0 || viewport.height === 0) {
    return { left: -6400, top: -6400, width: 12800, height: 12800 };
  }

  const visibleLeft = -panX / zoom;
  const visibleTop = -panY / zoom;
  const visibleRight = visibleLeft + viewport.width / zoom;
  const visibleBottom = visibleTop + viewport.height / zoom;

  const left = Math.floor((visibleLeft - DOT_MARGIN) / DOT_GRID_SIZE) * DOT_GRID_SIZE;
  const top = Math.floor((visibleTop - DOT_MARGIN) / DOT_GRID_SIZE) * DOT_GRID_SIZE;
  const right =
    Math.ceil((visibleRight + DOT_MARGIN) / DOT_GRID_SIZE) * DOT_GRID_SIZE;
  const bottom =
    Math.ceil((visibleBottom + DOT_MARGIN) / DOT_GRID_SIZE) * DOT_GRID_SIZE;

  return {
    left,
    top,
    width: right - left,
    height: bottom - top,
  };
}

type PageCanvasProps = {
  pageId: PageId;
  children: React.ReactNode;
};

export function PageCanvas({ pageId, children }: PageCanvasProps) {
  const {
    pan,
    zoom,
    isPanning,
    isNavigating,
    registerPage,
    recenterToFit,
    containerRef,
    onPanStart,
    bindWheel,
  } = useCanvas();

  const page = PAGES[pageId];
  const [viewport, setViewport] = useState<ViewportSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    registerPage(pageId);
  }, [pageId, registerPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateViewport = () => {
      setViewport({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    updateViewport();

    const observer = new ResizeObserver(updateViewport);
    observer.observe(container);

    return () => observer.disconnect();
  }, [containerRef, pageId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    return bindWheel(container);
  }, [bindWheel, containerRef, pageId]);

  useEffect(() => {
    if (!page.fitToViewport || viewport.width === 0 || viewport.height === 0) {
      return;
    }

    recenterToFit(pageId);
  }, [page.fitToViewport, pageId, recenterToFit, viewport.width, viewport.height]);

  const dotBounds = useMemo(
    () => getDotBounds(pan.x, pan.y, zoom, viewport),
    [pan.x, pan.y, zoom, viewport],
  );

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden bg-canvas-bg transition-opacity duration-300 ${
        isNavigating ? "pointer-events-none" : ""
      }`}
      onMouseDown={onPanStart}
      style={{ cursor: isPanning ? "grabbing" : "grab" }}
    >
      <div
        className="absolute left-0 top-0 will-change-transform"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        <div
          className="dot-grid absolute"
          style={{
            left: dotBounds.left,
            top: dotBounds.top,
            width: dotBounds.width,
            height: dotBounds.height,
          }}
          aria-hidden="true"
        />

        {pageId === "home" ? <CanvasPacMan dotBounds={dotBounds} /> : null}

        <div
          className="absolute"
          style={{
            left: page.contentX,
            top: page.contentY,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

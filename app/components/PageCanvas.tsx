"use client";

import { useEffect, useLayoutEffect } from "react";
import { useCanvas } from "@/lib/canvas-context";
import { PAGES, type PageId } from "@/lib/pages";

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
    containerRef,
    onPanStart,
    bindWheel,
  } = useCanvas();

  const page = PAGES[pageId];

  useLayoutEffect(() => {
    registerPage(pageId);
  }, [pageId, registerPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    return bindWheel(container);
  }, [bindWheel, containerRef, pageId]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden transition-opacity duration-300 ${
        isNavigating ? "pointer-events-none" : ""
      }`}
      onMouseDown={onPanStart}
      style={{ cursor: isPanning ? "grabbing" : "grab" }}
    >
      <div
        className="dot-grid absolute left-0 top-0 will-change-transform"
        style={{
          width: page.canvasWidth,
          height: page.canvasHeight,
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
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

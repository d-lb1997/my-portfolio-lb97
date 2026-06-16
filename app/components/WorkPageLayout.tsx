"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCanvas } from "@/lib/canvas-context";
import {
  computeFitZoom,
  PAGES,
  WORK_FRAME_HEIGHT,
  WORK_FRAME_WIDTH,
  WORK_NAV_OFFSET_X,
  WORK_NAV_OFFSET_Y,
} from "@/lib/pages";
import { WorkNav } from "./WorkNav";

type WorkPageLayoutProps = {
  children: React.ReactNode;
};

export function WorkPageLayout({ children }: WorkPageLayoutProps) {
  const { registerPage } = useCanvas();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const page = PAGES.work;

  useLayoutEffect(() => {
    registerPage("work");
  }, [registerPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !page.fitToViewport) return;

    const updateScale = () => {
      setScale(
        computeFitZoom(
          container.clientWidth,
          container.clientHeight,
          page.fitToViewport!,
          page.initialZoom,
        ),
      );
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);

    return () => observer.disconnect();
  }, [page.fitToViewport, page.initialZoom]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-30 overflow-hidden bg-canvas-bg"
    >
      <div className="dot-grid absolute inset-0" aria-hidden="true" />

      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div
          className="relative origin-center"
          style={{
            width: WORK_FRAME_WIDTH,
            minHeight: WORK_FRAME_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="absolute"
            style={{
              left: WORK_NAV_OFFSET_X,
              top: WORK_NAV_OFFSET_Y,
            }}
            data-no-pan
          >
            <WorkNav />
          </div>

          {children}
        </div>
      </div>

      <div
        className="canvas-edge-fade pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />
    </div>
  );
}

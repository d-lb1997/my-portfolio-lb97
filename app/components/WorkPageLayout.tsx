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

type ViewportSize = {
  width: number;
  height: number;
};

function getWorkNavPosition(
  viewport: ViewportSize,
  scale: number,
): { left: number; top: number } {
  const scaledWidth = WORK_FRAME_WIDTH * scale;
  const scaledHeight = WORK_FRAME_HEIGHT * scale;
  const contentLeft = (viewport.width - scaledWidth) / 2;
  const contentTop = (viewport.height - scaledHeight) / 2;

  return {
    left: contentLeft + WORK_NAV_OFFSET_X * scale,
    top: contentTop + WORK_NAV_OFFSET_Y * scale,
  };
}

export function WorkPageLayout({ children }: WorkPageLayoutProps) {
  const { registerPage } = useCanvas();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [viewport, setViewport] = useState<ViewportSize>({ width: 0, height: 0 });
  const page = PAGES.work;

  useLayoutEffect(() => {
    registerPage("work");
  }, [registerPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !page.fitToViewport) return;

    const updateLayout = () => {
      setViewport({
        width: container.clientWidth,
        height: container.clientHeight,
      });
      setScale(
        computeFitZoom(
          container.clientWidth,
          container.clientHeight,
          page.fitToViewport!,
          page.initialZoom,
        ),
      );
    };

    updateLayout();

    const observer = new ResizeObserver(updateLayout);
    observer.observe(container);

    return () => observer.disconnect();
  }, [page.fitToViewport, page.initialZoom]);

  const navPosition =
    viewport.width > 0 ? getWorkNavPosition(viewport, scale) : null;

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 z-30 overflow-hidden bg-transparent"
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
            {children}
          </div>
        </div>

        <div
          className="canvas-edge-fade pointer-events-none absolute inset-0 z-[1]"
          aria-hidden="true"
        />
      </div>

      {navPosition ? (
        <div className="pointer-events-none fixed inset-0 z-[80]">
          <div
            className="pointer-events-auto absolute"
            style={{
              left: navPosition.left,
              top: navPosition.top,
            }}
            data-no-pan
          >
            <WorkNav />
          </div>
        </div>
      ) : null}
    </>
  );
}

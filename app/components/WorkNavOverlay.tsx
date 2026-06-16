"use client";

import { useCanvas } from "@/lib/canvas-context";
import {
  PAGES,
  WORK_NAV_OFFSET_X,
  WORK_NAV_OFFSET_Y,
} from "@/lib/pages";
import { WorkNav } from "./WorkNav";

export function WorkNavOverlay() {
  const { pan, zoom, isNavigating } = useCanvas();
  const page = PAGES.work;

  const left = pan.x + (page.contentX + WORK_NAV_OFFSET_X) * zoom;
  const top = pan.y + (page.contentY + WORK_NAV_OFFSET_Y) * zoom;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[80] transition-opacity duration-300 ${
        isNavigating ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="pointer-events-auto absolute"
        style={{ left, top }}
        data-no-pan
      >
        <WorkNav />
      </div>
    </div>
  );
}

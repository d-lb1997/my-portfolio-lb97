"use client";

import { WORK_NAV_VIEWPORT_LEFT, WORK_UI_TOP, WORK_NAV_WIDTH } from "@/lib/pages";
import { WorkNav } from "./WorkNav";

export function WorkNavOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      <div
        className="pointer-events-auto fixed"
        style={{
          top: WORK_UI_TOP,
          left: WORK_NAV_VIEWPORT_LEFT,
          width: WORK_NAV_WIDTH,
        }}
        data-no-pan
      >
        <WorkNav />
      </div>
    </div>
  );
}

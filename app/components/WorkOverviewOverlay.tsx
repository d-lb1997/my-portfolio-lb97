"use client";

import {
  WORK_CONTENT_VIEWPORT_LEFT,
  WORK_CONTENT_VIEWPORT_RIGHT,
  WORK_UI_BOTTOM,
  WORK_UI_TOP,
} from "@/lib/pages";
import { WORK_OVERVIEW } from "@/lib/work-data";
import { useWorkPage } from "@/lib/work-page-context";
import { WorkOverviewSplineEmbed } from "./WorkOverviewSplineEmbed";

export function WorkOverviewOverlay() {
  const { selectedProjectId } = useWorkPage();

  if (selectedProjectId !== WORK_OVERVIEW.id) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[75]">
      <div
        className="work-overview-panel fixed overflow-hidden"
        style={{
          top: WORK_UI_TOP,
          bottom: WORK_UI_BOTTOM,
          left: WORK_CONTENT_VIEWPORT_LEFT,
          right: WORK_CONTENT_VIEWPORT_RIGHT,
        }}
      >
        <WorkOverviewSplineEmbed />
      </div>
    </div>
  );
}

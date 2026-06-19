"use client";

import dynamic from "next/dynamic";
import {
  WORK_CONTENT_VIEWPORT_LEFT,
  WORK_CONTENT_VIEWPORT_RIGHT,
  WORK_UI_BOTTOM,
  WORK_UI_TOP,
} from "@/lib/pages";
import { WORK_OVERVIEW } from "@/lib/work-data";
import { useWorkPage } from "@/lib/work-page-context";
import { WorkOverviewHero } from "./WorkOverviewHero";

const WorkOverviewSpline = dynamic(
  () =>
    import("./WorkOverviewSpline").then((mod) => mod.WorkOverviewSpline),
  {
    ssr: false,
    loading: () => <div className="work-spline-loading" aria-hidden="true" />,
  },
);

export function WorkOverviewOverlay() {
  const { selectedProjectId } = useWorkPage();

  if (selectedProjectId !== WORK_OVERVIEW.id) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[75]">
      <div
        className="work-overview-panel pointer-events-none fixed overflow-visible"
        style={{
          top: WORK_UI_TOP,
          bottom: WORK_UI_BOTTOM,
          left: WORK_CONTENT_VIEWPORT_LEFT,
          right: WORK_CONTENT_VIEWPORT_RIGHT,
        }}
      >
        <div className="work-overview-layout">
          <div className="work-overview-copy pointer-events-none" data-no-pan>
            <WorkOverviewHero />
          </div>
          <div className="work-overview-scene pointer-events-auto" data-no-pan>
            <WorkOverviewSpline />
          </div>
        </div>
      </div>
    </div>
  );
}

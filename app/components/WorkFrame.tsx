"use client";

import {
  WORK_FRAME_HEIGHT,
  WORK_FRAME_WIDTH,
  WORK_NAV_WIDTH,
} from "@/lib/pages";
import { WORK_OVERVIEW } from "@/lib/work-data";
import { useWorkPage } from "@/lib/work-page-context";
import { WorkOverviewHero } from "./WorkOverviewHero";
import { WorkProjectPanel } from "./WorkProjectPanel";

export function WorkFrame() {
  const { selectedProjectId, selectedProject } = useWorkPage();
  const isOverview = selectedProjectId === WORK_OVERVIEW.id;

  return (
    <section
      className="relative overflow-visible"
      style={{ width: WORK_FRAME_WIDTH, minHeight: WORK_FRAME_HEIGHT }}
      aria-label="Work"
    >
      {isOverview ? (
        <div
          className="absolute top-[88px] flex items-start pr-10"
          style={{ left: WORK_NAV_WIDTH + 48 }}
        >
          <WorkOverviewHero />
        </div>
      ) : (
        <WorkProjectPanel project={selectedProject} />
      )}
    </section>
  );
}

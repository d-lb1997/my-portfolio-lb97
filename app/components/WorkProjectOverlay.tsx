"use client";

import { WORK_OVERVIEW } from "@/lib/work-data";
import { useWorkPage } from "@/lib/work-page-context";
import {
  WORK_CONTENT_VIEWPORT_LEFT,
  WORK_CONTENT_VIEWPORT_RIGHT,
  WORK_UI_BOTTOM,
  WORK_UI_TOP,
} from "@/lib/pages";
import { WorkProjectPanel } from "./WorkProjectPanel";

export function WorkProjectOverlay() {
  const { selectedProjectId, selectedProject } = useWorkPage();

  if (selectedProjectId === WORK_OVERVIEW.id) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[75]">
      <div
        className="work-project-panel pointer-events-auto fixed overflow-y-auto overflow-x-visible"
        style={{
          top: WORK_UI_TOP,
          bottom: WORK_UI_BOTTOM,
          left: WORK_CONTENT_VIEWPORT_LEFT,
          right: WORK_CONTENT_VIEWPORT_RIGHT,
        }}
        data-no-pan
      >
        <WorkProjectPanel project={selectedProject} />
      </div>
    </div>
  );
}

"use client";

import { WORK_OVERVIEW } from "@/lib/work-data";
import { useWorkPage } from "@/lib/work-page-context";
import { WorkNav } from "./WorkNav";
import { WorkProjectPanel } from "./WorkProjectPanel";

export function WorkCompactOverlay() {
  const { selectedProjectId, selectedProject } = useWorkPage();
  const showContent = selectedProjectId !== WORK_OVERVIEW.id;

  return (
    <div className="work-compact-layout pointer-events-none fixed inset-x-0 bottom-8 top-[6.75rem] z-[80] flex flex-col gap-4 px-6 lg:hidden">
      <div className="work-compact-nav pointer-events-auto w-full shrink-0" data-no-pan>
        <WorkNav />
      </div>

      {showContent && (
        <div
          className="work-compact-content work-project-panel pointer-events-auto min-h-0 w-full flex-1 overflow-y-auto overflow-x-visible"
          data-no-pan
        >
          <WorkProjectPanel project={selectedProject} />
        </div>
      )}
    </div>
  );
}

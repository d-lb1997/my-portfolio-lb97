"use client";

import { WorkFrame } from "@/app/components/WorkFrame";
import { WorkCompactOverlay } from "@/app/components/WorkCompactOverlay";
import { WorkNavOverlay } from "@/app/components/WorkNavOverlay";
import { WorkProjectOverlay } from "@/app/components/WorkProjectOverlay";
import { PageCanvas } from "@/app/components/PageCanvas";
import { WorkPageProvider } from "@/lib/work-page-context";

export default function WorkPage() {
  return (
    <WorkPageProvider>
      <PageCanvas pageId="work">
        <WorkFrame />
      </PageCanvas>
      <WorkNavOverlay />
      <WorkProjectOverlay />
      <WorkCompactOverlay />
    </WorkPageProvider>
  );
}

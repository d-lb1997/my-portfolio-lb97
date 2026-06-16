"use client";

import { PageCanvas } from "@/app/components/PageCanvas";
import { WorkFrame } from "@/app/components/WorkFrame";
import { WorkNavOverlay } from "@/app/components/WorkNavOverlay";
import { WorkPageProvider } from "@/lib/work-page-context";

export default function WorkPage() {
  return (
    <WorkPageProvider>
      <PageCanvas pageId="work">
        <WorkFrame />
      </PageCanvas>
      <WorkNavOverlay />
    </WorkPageProvider>
  );
}

"use client";

import { PageCanvas } from "@/app/components/PageCanvas";
import { WorkFrame } from "@/app/components/WorkFrame";
import { WorkNavOverlay } from "@/app/components/WorkNavOverlay";

export default function WorkPage() {
  return (
    <>
      <PageCanvas pageId="work">
        <WorkFrame />
      </PageCanvas>
      <WorkNavOverlay />
    </>
  );
}

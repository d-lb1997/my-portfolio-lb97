"use client";

import { WorkFrame } from "@/app/components/WorkFrame";
import { WorkPageLayout } from "@/app/components/WorkPageLayout";
import { WorkPageProvider } from "@/lib/work-page-context";

export default function WorkPage() {
  return (
    <WorkPageProvider>
      <WorkPageLayout>
        <WorkFrame />
      </WorkPageLayout>
    </WorkPageProvider>
  );
}

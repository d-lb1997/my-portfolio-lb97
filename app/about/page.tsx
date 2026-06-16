"use client";

import { AboutFrame } from "@/app/components/AboutFrame";
import { PageCanvas } from "@/app/components/PageCanvas";

export default function AboutPage() {
  return (
    <PageCanvas pageId="about">
      <AboutFrame />
    </PageCanvas>
  );
}

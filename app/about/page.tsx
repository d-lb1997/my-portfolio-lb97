"use client";

import { AboutCharacter } from "@/app/components/AboutCharacter";
import { AboutCompactFrame } from "@/app/components/AboutCompactFrame";
import { AboutFrame } from "@/app/components/AboutFrame";
import { PageCanvas } from "@/app/components/PageCanvas";

export default function AboutPage() {
  return (
    <>
      <PageCanvas pageId="about">
        <AboutFrame />
      </PageCanvas>
      <AboutCompactFrame />
      <AboutCharacter />
    </>
  );
}

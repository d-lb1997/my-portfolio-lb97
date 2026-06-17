"use client";

import { AboutCharacter } from "@/app/components/AboutCharacter";
import { AboutFrame } from "@/app/components/AboutFrame";
import { PageCanvas } from "@/app/components/PageCanvas";

export default function AboutPage() {
  return (
    <>
      <PageCanvas pageId="about">
        <AboutFrame />
      </PageCanvas>
      <AboutCharacter />
    </>
  );
}

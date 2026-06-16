"use client";

import { HomeFrame } from "@/app/components/HomeFrame";
import { PageCanvas } from "@/app/components/PageCanvas";

export default function HomePage() {
  return (
    <PageCanvas pageId="home">
      <HomeFrame />
    </PageCanvas>
  );
}

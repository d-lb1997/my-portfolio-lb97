"use client";

import { useCallback, useState } from "react";
import { AboutCharacter } from "@/app/components/AboutCharacter";
import { AboutFrame } from "@/app/components/AboutFrame";
import { AboutStoryFrame } from "@/app/components/AboutStoryFrame";
import { PageCanvas } from "@/app/components/PageCanvas";
import { useCanvas } from "@/lib/canvas-context";
import { ABOUT_STORY_FIT, PAGES } from "@/lib/pages";

export default function AboutPage() {
  const [storyOpen, setStoryOpen] = useState(false);
  const { immerseSwapView, isNavigating } = useCanvas();

  const openStory = useCallback(() => {
    immerseSwapView({
      fit: ABOUT_STORY_FIT,
      onSwap: () => setStoryOpen(true),
    });
  }, [immerseSwapView]);

  const closeStory = useCallback(() => {
    const aboutFit = PAGES.about.fitToViewport;
    if (!aboutFit) return;

    immerseSwapView({
      fit: aboutFit,
      onSwap: () => setStoryOpen(false),
    });
  }, [immerseSwapView]);

  return (
    <>
      <PageCanvas pageId="about">
        {storyOpen ? <AboutStoryFrame /> : <AboutFrame onOpenStory={openStory} />}
      </PageCanvas>
      {!storyOpen && <AboutCharacter />}
      {storyOpen && (
        <button
          type="button"
          onClick={closeStory}
          disabled={isNavigating}
          className="about-story-back fixed top-6 left-6 z-[65] cursor-pointer disabled:cursor-wait"
          data-no-pan
        >
          ← About me
        </button>
      )}
    </>
  );
}

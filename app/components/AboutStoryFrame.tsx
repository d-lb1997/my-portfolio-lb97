"use client";

import {
  ABOUT_STORY_FRAME_HEIGHT,
  ABOUT_STORY_FRAME_WIDTH,
} from "@/lib/pages";
import { AboutStoryEmbed } from "./AboutStoryEmbed";

export function AboutStoryFrame() {
  return (
    <section
      className="relative flex items-center justify-center px-4"
      style={{
        width: ABOUT_STORY_FRAME_WIDTH,
        minHeight: ABOUT_STORY_FRAME_HEIGHT,
      }}
      aria-label="My story"
    >
      <AboutStoryEmbed />
    </section>
  );
}

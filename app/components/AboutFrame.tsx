"use client";

import { useMemo } from "react";
import {
  ABOUT_FRAME_HEIGHT,
  ABOUT_FRAME_WIDTH,
} from "@/lib/pages";
import { useCanvas } from "@/lib/canvas-context";
import { useVisitorCursor } from "@/lib/cursor-context";
import {
  buildCursorChatGradient,
  cursorChatGradientStyle,
} from "@/lib/cursor-gradient";
import { ABOUT_HERO_PHRASES, HeroText } from "./HeroText";

export function AboutFrame() {
  const { color } = useVisitorCursor();
  const { navigateToPage, isNavigating } = useCanvas();
  const gradientStyle = useMemo(
    () => cursorChatGradientStyle(buildCursorChatGradient(color)),
    [color],
  );

  return (
    <section
      className="relative flex flex-col overflow-visible px-4 sm:px-6 xl:pl-0 xl:pr-8"
      style={{ width: ABOUT_FRAME_WIDTH, minHeight: ABOUT_FRAME_HEIGHT }}
      aria-label="About"
    >
      <div className="mx-auto grid w-full max-w-[min(100%,42rem)] -translate-y-48 grid-cols-1 items-start justify-items-center gap-5 pb-[clamp(26rem,60vh,38rem)] pt-0 text-center sm:-translate-y-56 sm:gap-6 xl:mx-0 xl:max-w-[68rem] xl:translate-y-0 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:justify-items-stretch xl:gap-x-20 xl:gap-y-0 xl:pb-[clamp(22rem,54vh,34rem)] xl:pt-14 xl:text-left xl:-ml-12 2xl:-ml-16 2xl:gap-x-24">
        <div className="flex w-full max-w-[min(92vw,30rem)] flex-col items-center self-center overflow-visible sm:max-w-[32rem] xl:max-w-none xl:items-start xl:self-start xl:-ml-[120px]">
          <HeroText
            headline="About me"
            phrases={ABOUT_HERO_PHRASES}
            align="responsive"
          />
        </div>

        <div className="flex w-full max-w-[min(92vw,30rem)] flex-col items-center self-center text-center sm:max-w-[32rem] xl:max-w-[30rem] xl:items-start xl:self-start xl:text-left xl:-ml-10 2xl:-ml-16">
          <p className="text-[clamp(1rem,2.4vw,1.0625rem)] leading-relaxed text-text-secondary">
            Hey there, I am Lukas, an experience designer focused on human-centered
            products. I work across research, visual design, and interaction to
            make interfaces feel natural and useful.
          </p>
          <p className="mt-4 text-[clamp(1rem,2.4vw,1.0625rem)] leading-relaxed text-text-secondary">
            I think in systems, in space, in structure. And I care deeply about the
            people on the other side of the screen.
          </p>

          <button
            type="button"
            className="home-cta-primary cursor-accent-gradient mt-8 xl:mx-0"
            style={gradientStyle}
            onClick={() => navigateToPage("/contact")}
            disabled={isNavigating}
            data-no-pan
          >
            Let me tell you my story
          </button>
        </div>
      </div>
    </section>
  );
}

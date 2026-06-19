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
      className="relative flex flex-col overflow-visible px-4 sm:px-6 lg:pl-0 lg:pr-8"
      style={{ width: ABOUT_FRAME_WIDTH, minHeight: ABOUT_FRAME_HEIGHT }}
      aria-label="About"
    >
      <div className="mx-auto grid w-full max-w-[68rem] grid-cols-1 items-center gap-8 pb-[clamp(20rem,52vh,34rem)] pt-[clamp(1.5rem,5vh,2.5rem)] text-center sm:gap-10 sm:pt-10 lg:mx-0 lg:items-start lg:gap-x-20 lg:gap-y-0 lg:pb-[clamp(22rem,54vh,34rem)] lg:pt-14 lg:text-left lg:-ml-12 xl:-ml-16 xl:gap-x-24">
        <div className="flex w-full max-w-[min(92vw,28rem)] flex-col items-center self-center overflow-visible sm:max-w-[30rem] lg:max-w-none lg:items-start lg:self-start lg:-ml-[120px]">
          <HeroText
            headline="About me"
            phrases={ABOUT_HERO_PHRASES}
            align="responsive"
          />
        </div>

        <div className="mx-auto w-full max-w-[min(92vw,28rem)] self-center text-center sm:max-w-[30rem] lg:mx-0 lg:max-w-[30rem] lg:self-start lg:text-left lg:-ml-10 xl:-ml-16">
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
            className="home-cta-primary cursor-accent-gradient mx-auto mt-8 lg:mx-0"
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

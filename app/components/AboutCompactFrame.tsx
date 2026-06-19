"use client";

import { useMemo } from "react";
import { useCanvas } from "@/lib/canvas-context";
import { useVisitorCursor } from "@/lib/cursor-context";
import {
  buildCursorChatGradient,
  cursorChatGradientStyle,
} from "@/lib/cursor-gradient";
import { ABOUT_HERO_PHRASES, HeroText } from "./HeroText";

export function AboutCopy({
  className = "",
  buttonClassName = "mt-8",
}: {
  className?: string;
  buttonClassName?: string;
}) {
  const { color } = useVisitorCursor();
  const { navigateToPage, isNavigating } = useCanvas();
  const gradientStyle = useMemo(
    () => cursorChatGradientStyle(buildCursorChatGradient(color)),
    [color],
  );

  return (
    <div className={className}>
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
        className={`home-cta-primary cursor-accent-gradient ${buttonClassName}`}
        style={gradientStyle}
        onClick={() => navigateToPage("/contact")}
        disabled={isNavigating}
        data-no-pan
      >
        Let me tell you my story
      </button>
    </div>
  );
}

export function AboutCompactFrame() {
  return (
    <section
      className="pointer-events-none fixed inset-x-0 top-[5rem] bottom-[46vh] z-[35] flex flex-col items-center justify-start gap-5 overflow-y-auto px-4 pt-1 text-center sm:gap-6 sm:px-6 xl:hidden"
      aria-label="About"
    >
      <div className="pointer-events-auto w-full max-w-[min(92vw,30rem)] sm:max-w-[32rem]">
        <HeroText
          headline="About me"
          phrases={ABOUT_HERO_PHRASES}
          align="center"
          subtitleContainerClassName="min-h-[4.75rem] sm:min-h-[5.25rem]"
        />
      </div>

      <div className="pointer-events-auto w-full max-w-[min(92vw,30rem)] sm:max-w-[32rem]">
        <AboutCopy />
      </div>
    </section>
  );
}

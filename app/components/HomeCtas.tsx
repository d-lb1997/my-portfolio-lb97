"use client";

import { useMemo } from "react";
import { useCanvas } from "@/lib/canvas-context";
import { useVisitorCursor } from "@/lib/cursor-context";
import {
  buildCursorChatGradient,
  cursorChatGradientStyle,
} from "@/lib/cursor-gradient";

export function HomeCtas() {
  const { color } = useVisitorCursor();
  const { navigateToPage, isNavigating } = useCanvas();

  const gradientStyle = useMemo(
    () => cursorChatGradientStyle(buildCursorChatGradient(color)),
    [color],
  );

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3 max-lg:w-full max-lg:flex-col max-lg:gap-4"
      data-no-pan
    >
      <button
        type="button"
        className="home-cta-primary cursor-accent-gradient max-lg:w-full max-lg:px-8 max-lg:py-4 max-lg:text-center max-lg:text-[1.0625rem]"
        style={gradientStyle}
        onClick={() => navigateToPage("/work")}
        disabled={isNavigating}
      >
        <span className="font-normal">See </span>
        <span className="font-bold">my work</span>
      </button>

      <div
        className="home-cta-secondary cursor-accent-gradient max-lg:w-full"
        style={gradientStyle}
      >
        <button
          type="button"
          className="home-cta-secondary-inner max-lg:w-full max-lg:px-8 max-lg:py-4 max-lg:text-center max-lg:text-[1.0625rem]"
          onClick={() => navigateToPage("/about")}
          disabled={isNavigating}
        >
          <span className="font-normal">Get to </span>
          <span className="font-bold">know me</span>
        </button>
      </div>
    </div>
  );
}

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
  const { immerseNavigate, isNavigating } = useCanvas();

  const gradientStyle = useMemo(
    () => cursorChatGradientStyle(buildCursorChatGradient(color)),
    [color],
  );

  return (
    <div
      className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12"
      data-no-pan
    >
      <button
        type="button"
        className="home-cta-primary cursor-accent-gradient"
        style={gradientStyle}
        onClick={() => immerseNavigate("/work")}
        disabled={isNavigating}
      >
        See my work
      </button>

      <div className="home-cta-secondary cursor-accent-gradient" style={gradientStyle}>
        <button
          type="button"
          className="home-cta-secondary-inner"
          onClick={() => immerseNavigate("/about")}
          disabled={isNavigating}
        >
          Get to know me
        </button>
      </div>
    </div>
  );
}

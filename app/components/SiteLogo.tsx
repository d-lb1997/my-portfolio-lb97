"use client";

import Image from "next/image";
import { useCanvas } from "@/lib/canvas-context";
import { useTheme } from "@/lib/theme-context";

export function SiteLogo() {
  const { navigateToFrame } = useCanvas();
  const { theme, ready } = useTheme();

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={() => navigateToFrame("home")}
      aria-label="Go to home"
      className="fixed top-6 left-6 z-[60] transition-opacity hover:opacity-70 active:opacity-85 cursor-pointer"
      data-no-pan
    >
      <Image
        src={theme === "dark" ? "/images/logo-dark.png" : "/images/logo.png"}
        alt="lb97"
        width={156}
        height={73}
        priority
        className="h-auto w-[72px] md:w-[88px]"
      />
    </button>
  );
}

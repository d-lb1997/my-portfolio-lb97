"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme-context";
import { pathnameToScenePage } from "@/lib/page-scene";

export function CanvasBackground() {
  const pathname = usePathname();
  const { theme, ready } = useTheme();
  const sceneKey = ready ? `${pathnameToScenePage(pathname)}-${theme}` : "boot";

  return (
    <div className="canvas-scene pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="canvas-scene-base" />
      <div key={sceneKey} className="canvas-scene-spectrum" />
    </div>
  );
}

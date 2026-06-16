"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { useTheme } from "@/lib/theme-context";
import { applyPageScene, pathnameToScenePage } from "@/lib/page-scene";

export function PageSceneProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, ready } = useTheme();

  useLayoutEffect(() => {
    if (!ready) return;
    applyPageScene(pathnameToScenePage(pathname), theme);
  }, [pathname, theme, ready]);

  return children;
}

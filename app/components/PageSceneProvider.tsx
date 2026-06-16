"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pathnameToPageId } from "@/lib/pages";

export function PageSceneProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute("data-page", pathnameToPageId(pathname));
  }, [pathname]);

  return children;
}

"use client";

import { usePathname } from "next/navigation";
import { useVisitorCursor } from "@/lib/cursor-context";
import { useCanvas } from "@/lib/canvas-context";
import { NAV_ITEMS, pathnameToPageId } from "@/lib/pages";

export function Navbar() {
  const pathname = usePathname();
  const activePageId = pathnameToPageId(pathname);
  const { immerseNavigate, isNavigating } = useCanvas();
  const { color, ready } = useVisitorCursor();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-6 md:px-12">
      <ul className="flex items-center gap-6 md:gap-8">
        {NAV_ITEMS.map((item) => {
          const isActive = activePageId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => immerseNavigate(item.href)}
                disabled={isNavigating}
                aria-current={isActive ? "page" : undefined}
                className={`relative border-none bg-transparent text-[14px] font-medium uppercase tracking-[0.08em] text-text-primary cursor-pointer transition-opacity duration-200 disabled:cursor-wait ${
                  isActive ? "opacity-100" : "opacity-30 hover:opacity-100"
                }`}
                style={
                  isActive && ready
                    ? {
                        textDecoration: "underline",
                        textDecorationColor: color,
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "6px",
                      }
                    : undefined
                }
                data-no-pan
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

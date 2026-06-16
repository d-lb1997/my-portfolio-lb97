"use client";

import { useVisitorCursor } from "@/lib/cursor-context";
import { NAV_ITEMS } from "@/lib/frames";
import { useCanvas } from "@/lib/canvas-context";

export function Navbar() {
  const { activeFrame, navigateToFrame } = useCanvas();
  const { color, ready } = useVisitorCursor();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-6 md:px-12">
      <ul className="flex items-center gap-6 md:gap-8">
        {NAV_ITEMS.map((item) => {
          const isActive = activeFrame === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => navigateToFrame(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative border-none bg-transparent text-[14px] font-medium uppercase tracking-[0.08em] text-text-primary cursor-pointer transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
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

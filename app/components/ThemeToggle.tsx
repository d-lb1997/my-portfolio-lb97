"use client";

import { useTheme } from "@/lib/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme, ready } = useTheme();

  if (!ready) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-6 right-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-toggle-bg text-toggle-fg shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      data-no-pan
    >
      {isDark ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M12 2.5V5M12 19V21.5M4.22 4.22L6.04 6.04M17.96 17.96L19.78 19.78M2.5 12H5M19 12H21.5M4.22 19.78L6.04 17.96M17.96 6.04L19.78 4.22"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M21 14.5A7.5 7.5 0 0 1 9.5 3 6 6 0 1 0 21 14.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

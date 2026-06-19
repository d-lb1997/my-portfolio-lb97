"use client";

import { useTheme } from "@/lib/theme-context";

type ThemeToggleButtonProps = {
  className?: string;
  showLabel?: boolean;
  variant?: "default" | "overlay";
};

export function ThemeToggleButton({
  className = "",
  showLabel = false,
  variant = "default",
}: ThemeToggleButtonProps) {
  const { theme, toggleTheme, ready } = useTheme();

  if (!ready) return null;

  const isDark = theme === "dark";
  const isOverlay = variant === "overlay";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer ${
        isOverlay
          ? "border-none bg-transparent text-white shadow-none"
          : "border border-border-subtle bg-toggle-bg text-toggle-fg shadow-md"
      } ${className}`}
      data-no-pan
    >
      <span
        className={`flex shrink-0 items-center justify-center ${
          isOverlay ? "h-5 w-5" : "h-11 w-11"
        }`}
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
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
        )}
      </span>
      {showLabel ? (
        <span
          className={`font-bold uppercase tracking-[0.06em] ${
            isOverlay
              ? "text-[clamp(1rem,4vw,1.125rem)]"
              : "text-[14px] font-medium tracking-[0.08em]"
          }`}
        >
          {isDark ? "Light mode" : "Dark mode"}
        </span>
      ) : null}
    </button>
  );
}

export function ThemeToggle() {
  return (
    <ThemeToggleButton className="fixed top-6 right-6 z-[60] hidden h-11 w-11 justify-center rounded-full lg:flex" />
  );
}

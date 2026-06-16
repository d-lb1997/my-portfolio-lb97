"use client";

import { useTheme } from "@/lib/theme-context";

function darkenHex(hex: string, amount = 0.2): string {
  const normalized = hex.replace("#", "");
  const num = parseInt(normalized, 16);
  const r = Math.max(0, Math.round(((num >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.round(((num >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.round((num & 0xff) * (1 - amount)));
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

const CURSOR_ARROW_PATH_LIGHT =
  "M1.5 1.5L1.5 14.5L5.25 11.75L7 16.5L8.5 15.25L6.75 9.75L12.75 9.75L1.5 1.5Z";

const CURSOR_ARROW_PATH_DARK =
  "M1.5 1.5L1.5 14.5L5.25 11.75L6.75 9.75L12.75 9.75L1.5 1.5Z";

const ARROW_VIEWBOX_LIGHT = "-1 -1 16 20";
const ARROW_VIEWBOX_DARK = "-1 -1 16 17";

type CursorNameLabelProps = {
  color: string;
  name: string;
  className?: string;
};

export function CursorNameLabel({
  color,
  name,
  className = "",
}: CursorNameLabelProps) {
  const borderColor = darkenHex(color);

  return (
    <span
      className={`block whitespace-nowrap px-4 py-2 text-[14px] font-medium leading-none text-white ${className}`}
      style={{
        backgroundColor: color,
        border: `2px solid ${borderColor}`,
        borderRadius: "0 999px 999px 999px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.16)",
      }}
    >
      {name}
    </span>
  );
}

type CursorArrowProps = {
  color: string;
  name: string;
  className?: string;
  showArrow?: boolean;
};

export function CursorArrow({
  color,
  name,
  className = "",
  showArrow = true,
}: CursorArrowProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const arrowPath = isLight ? CURSOR_ARROW_PATH_LIGHT : CURSOR_ARROW_PATH_DARK;
  const arrowViewBox = isLight ? ARROW_VIEWBOX_LIGHT : ARROW_VIEWBOX_DARK;
  const arrowHeight = isLight ? 20 : 18;
  const labelOffset = isLight ? "mt-[20px]" : "mt-[16px]";

  if (!showArrow) {
    return (
      <div className={`inline-block ${className}`}>
        <CursorNameLabel color={color} name={name} />
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        width="18"
        height={arrowHeight}
        viewBox={arrowViewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0"
        aria-hidden="true"
      >
        <path
          d={arrowPath}
          fill={isLight ? "#0A0A0A" : "none"}
          stroke="#FFFFFF"
          strokeWidth={isLight ? 1.75 : 2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <CursorNameLabel
        color={color}
        name={name}
        className={`relative ml-[7px] ${labelOffset}`}
      />
    </div>
  );
}

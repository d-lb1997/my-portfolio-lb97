"use client";

function darkenHex(hex: string, amount = 0.2): string {
  const normalized = hex.replace("#", "");
  const num = parseInt(normalized, 16);
  const r = Math.max(0, Math.round(((num >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.round(((num >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.round((num & 0xff) * (1 - amount)));
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

const CURSOR_ARROW_PATH =
  "M1.5 1.5L1.5 16.5L5 13L7 18.5L8.5 17L6.5 10.5L13 10.5L1.5 1.5Z";

const ARROW_VIEWBOX = "-2 -2 18 24";

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
        width="20"
        height="24"
        viewBox={ARROW_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0 overflow-visible"
        aria-hidden="true"
      >
        <path
          d={CURSOR_ARROW_PATH}
          fill="none"
          stroke="rgba(0, 0, 0, 0.45)"
          strokeWidth="3"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
        />
        <path
          d={CURSOR_ARROW_PATH}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
        />
      </svg>

      <CursorNameLabel
        color={color}
        name={name}
        className="relative ml-[7px] mt-[22px]"
      />
    </div>
  );
}

"use client";

function darkenHex(hex: string, amount = 0.2): string {
  const normalized = hex.replace("#", "");
  const num = parseInt(normalized, 16);
  const r = Math.max(0, Math.round(((num >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.round(((num >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.round((num & 0xff) * (1 - amount)));
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

type CursorArrowProps = {
  color: string;
  name: string;
  className?: string;
};

export function CursorArrow({ color, name, className = "" }: CursorArrowProps) {
  const borderColor = darkenHex(color);

  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        width="20"
        height="24"
        viewBox="0 0 17 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0"
        style={{
          filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.22))",
        }}
        aria-hidden="true"
      >
        <path
          d="M1 1V16.2L5.4 12.4L8.2 18.6L10.6 17.2L7.8 11.4H13.8L1 1Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <span
        className="relative ml-[13px] mt-[15px] block whitespace-nowrap px-4 py-2 text-[14px] font-medium leading-none text-white"
        style={{
          backgroundColor: color,
          border: `2px solid ${borderColor}`,
          borderRadius: "0 999px 999px 999px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.16)",
        }}
      >
        {name}
      </span>
    </div>
  );
}

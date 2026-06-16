"use client";

import { motion } from "framer-motion";

type CursorArrowProps = {
  color: string;
  name: string;
  className?: string;
};

export function CursorArrow({ color, name, className = "" }: CursorArrowProps) {
  return (
    <div className={`flex items-start ${className}`}>
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
        aria-hidden="true"
      >
        <path
          d="M1 1L1 13.5L4.2 10.3L7.5 15.5L9.5 14.5L6.2 9.3L10.5 9.3L1 1Z"
          fill={color}
          stroke="#0A0A0A"
          strokeWidth="0.5"
        />
      </svg>
      <span
        className="ml-1 rounded-md px-2 py-1 text-[13px] font-semibold leading-none text-white shadow-md whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {name}
      </span>
    </div>
  );
}

type AmbientCursorProps = {
  color: string;
  name: string;
  path: { x: number[]; y: number[] };
  duration: number;
  delay?: number;
};

export function AmbientCursor({
  color,
  name,
  path,
  duration,
  delay = 0,
}: AmbientCursorProps) {
  return (
    <motion.div
      className="pointer-events-none absolute z-10"
      initial={{ x: path.x[0], y: path.y[0], opacity: 0 }}
      animate={{
        x: path.x,
        y: path.y,
        opacity: 1,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <CursorArrow color={color} name={name} />
    </motion.div>
  );
}

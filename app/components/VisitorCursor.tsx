"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCanvas } from "@/lib/canvas-context";
import { useVisitorCursor } from "@/lib/cursor-context";

export function VisitorCursor() {
  const { color, name, ready } = useVisitorCursor();
  const { isPanning } = useCanvas();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
    if (touch) return;

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (isTouch || !ready) return null;

  const hidden = !visible || isPanning;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: hidden ? 0 : 1,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        scale: { type: "spring", stiffness: 500, damping: 28 },
        opacity: { duration: 0.15 },
      }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
        className="flex items-start"
      >
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-sm"
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
      </motion.div>
    </motion.div>
  );
}

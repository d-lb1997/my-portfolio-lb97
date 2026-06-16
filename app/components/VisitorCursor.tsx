"use client";

import { useEffect, useState } from "react";
import { useCanvas } from "@/lib/canvas-context";
import { useVisitorCursor } from "@/lib/cursor-context";
import { CursorNameLabel } from "./CursorArrow";

export function VisitorCursor() {
  const { color, name, ready } = useVisitorCursor();
  const { isPanning } = useCanvas();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
    if (touch) return;

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleLeave = () => setPosition(null);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (isTouch || !ready || !position || isPanning) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      aria-hidden="true"
    >
      <CursorNameLabel color={color} name={name} />
    </div>
  );
}

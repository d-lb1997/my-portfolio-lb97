"use client";

import { useEffect, useState } from "react";
import { useAmbientCursors } from "@/lib/cursor-context";
import { AmbientCursor } from "./CursorArrow";

type WanderPath = {
  x: number[];
  y: number[];
  duration: number;
  delay: number;
};

function generateWanderPath(
  viewportW: number,
  viewportH: number,
  index: number,
): WanderPath {
  const marginX = 120;
  const marginY = 100;
  const usableW = Math.max(viewportW - marginX * 2, 200);
  const usableH = Math.max(viewportH - marginY * 2, 200);
  const pointCount = 4;

  const x = Array.from({ length: pointCount }, (_, pointIndex) => {
    const band = (pointIndex + index) % 3;
    const xBase = marginX + (usableW / 3) * band + Math.random() * (usableW / 4);
    return Math.min(viewportW - marginX, Math.max(marginX, xBase));
  });

  const y = Array.from({ length: pointCount }, () => {
    const yBase = marginY + Math.random() * usableH;
    return Math.min(viewportH - marginY, Math.max(marginY, yBase));
  });

  return {
    x,
    y,
    duration: 14 + index * 3 + Math.random() * 6,
    delay: index * 1.2,
  };
}

export function AmbientCursors() {
  const { cursors, ready } = useAmbientCursors();
  const [paths, setPaths] = useState<WanderPath[]>([]);

  useEffect(() => {
    const updatePaths = () => {
      setPaths(
        cursors.map((_, index) =>
          generateWanderPath(window.innerWidth, window.innerHeight, index),
        ),
      );
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);
    return () => window.removeEventListener("resize", updatePaths);
  }, [cursors]);

  if (!ready || paths.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {cursors.map((cursor, index) => (
        <AmbientCursor
          key={cursor.name}
          color={cursor.color}
          name={cursor.name}
          path={paths[index]}
          duration={paths[index].duration}
          delay={paths[index].delay}
        />
      ))}
    </div>
  );
}

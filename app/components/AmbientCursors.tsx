"use client";

import { useEffect, useRef } from "react";
import { useAmbientCursors } from "@/lib/cursor-context";
import { CursorArrow } from "./CursorArrow";

type Side = "left" | "right";

type DrifterConfig = {
  side: Side;
  baseSpeed: number;
  pauseMin: number;
  pauseMax: number;
};

const DRIFTER_CONFIGS: DrifterConfig[] = [
  { side: "left", baseSpeed: 0.014, pauseMin: 900, pauseMax: 2400 },
  { side: "left", baseSpeed: 0.011, pauseMin: 1200, pauseMax: 3200 },
  { side: "right", baseSpeed: 0.013, pauseMin: 1000, pauseMax: 2600 },
  { side: "right", baseSpeed: 0.01, pauseMin: 1400, pauseMax: 3400 },
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function getEdgeBounds(side: Side, viewportW: number) {
  const edgeInset = 28;
  const edgeWidth = Math.min(150, viewportW * 0.13);

  if (side === "left") {
    return { minX: edgeInset, maxX: edgeInset + edgeWidth };
  }

  return {
    minX: viewportW - edgeInset - edgeWidth,
    maxX: viewportW - edgeInset,
  };
}

function pickTarget(
  side: Side,
  viewportW: number,
  viewportH: number,
  currentY: number,
) {
  const { minX, maxX } = getEdgeBounds(side, viewportW);
  const marginY = 90;
  const maxVerticalStep = 260;

  let y = randomBetween(marginY, viewportH - marginY);
  if (Math.abs(y - currentY) > maxVerticalStep) {
    y = currentY + Math.sign(y - currentY) * randomBetween(80, maxVerticalStep);
  }

  return {
    x: randomBetween(minX, maxX),
    y: clamp(y, marginY, viewportH - marginY),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function AmbientCursorDrifter({
  color,
  name,
  config,
  index,
}: {
  color: string;
  name: string;
  config: DrifterConfig;
  index: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const pauseUntilRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const init = () => {
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const { minX, maxX } = getEdgeBounds(config.side, viewportW);
      const startY = (viewportH / 5) * (index + 1) + randomBetween(-50, 50);

      posRef.current = {
        x: randomBetween(minX, maxX),
        y: clamp(startY, 90, viewportH - 90),
      };
      targetRef.current = pickTarget(
        config.side,
        viewportW,
        viewportH,
        posRef.current.y,
      );

      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
    };

    init();

    const tick = (now: number) => {
      if (now < pauseUntilRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const pos = posRef.current;
      const target = targetRef.current;

      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 6) {
        pauseUntilRef.current = now + randomBetween(config.pauseMin, config.pauseMax);
        targetRef.current = pickTarget(
          config.side,
          viewportW,
          viewportH,
          pos.y,
        );
      } else {
        const ease = clamp(distance / 320, 0.35, 1);
        const step = config.baseSpeed * ease;

        posRef.current = {
          x: pos.x + dx * step,
          y: pos.y + dy * step,
        };

        if (rootRef.current) {
          rootRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleResize = () => {
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const { minX, maxX } = getEdgeBounds(config.side, viewportW);

      posRef.current = {
        x: clamp(posRef.current.x, minX, maxX),
        y: clamp(posRef.current.y, 90, viewportH - 90),
      };
      targetRef.current = pickTarget(
        config.side,
        viewportW,
        viewportH,
        posRef.current.y,
      );

      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [config, index]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed left-0 top-0 z-10 will-change-transform"
      aria-hidden="true"
    >
      <CursorArrow color={color} name={name} />
    </div>
  );
}

export function AmbientCursors() {
  const { cursors, ready } = useAmbientCursors();

  if (!ready) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {cursors.map((cursor, index) => (
        <AmbientCursorDrifter
          key={cursor.name}
          color={cursor.color}
          name={cursor.name}
          config={DRIFTER_CONFIGS[index]}
          index={index}
        />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useAmbientCursors } from "@/lib/cursor-context";
import { CursorArrow } from "./CursorArrow";

type Side = "left" | "right";

type DrifterConfig = {
  side: Side;
  laneIndex: number;
  baseSpeed: number;
  pauseMin: number;
  pauseMax: number;
};

const LANES_PER_SIDE = 3;
const CURSOR_BLOCK_HEIGHT = 76;

const DRIFTER_CONFIGS: DrifterConfig[] = [
  { side: "left", laneIndex: 0, baseSpeed: 0.014, pauseMin: 900, pauseMax: 2400 },
  { side: "left", laneIndex: 1, baseSpeed: 0.011, pauseMin: 1200, pauseMax: 3200 },
  { side: "left", laneIndex: 2, baseSpeed: 0.012, pauseMin: 1100, pauseMax: 2800 },
  { side: "right", laneIndex: 0, baseSpeed: 0.013, pauseMin: 1000, pauseMax: 2600 },
  { side: "right", laneIndex: 1, baseSpeed: 0.01, pauseMin: 1400, pauseMax: 3400 },
  { side: "right", laneIndex: 2, baseSpeed: 0.0125, pauseMin: 950, pauseMax: 2700 },
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
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

function getLaneBounds(laneIndex: number, viewportH: number) {
  const marginY = 96;
  const gap = 18;
  const usableH = viewportH - marginY * 2;
  const laneHeight = usableH / LANES_PER_SIDE;
  const minY = marginY + laneIndex * laneHeight + gap;
  const maxY = marginY + (laneIndex + 1) * laneHeight - gap - CURSOR_BLOCK_HEIGHT;

  return {
    minY,
    maxY: Math.max(minY, maxY),
    centerY: minY + (Math.max(minY, maxY) - minY) / 2,
  };
}

function pickTarget(
  side: Side,
  laneIndex: number,
  viewportW: number,
  viewportH: number,
  currentY: number,
) {
  const { minX, maxX } = getEdgeBounds(side, viewportW);
  const lane = getLaneBounds(laneIndex, viewportH);
  const maxVerticalStep = Math.min(120, (lane.maxY - lane.minY) * 0.45);

  let y = randomBetween(lane.minY, lane.maxY);
  if (Math.abs(y - currentY) > maxVerticalStep) {
    y = currentY + Math.sign(y - currentY) * randomBetween(40, maxVerticalStep);
  }

  return {
    x: randomBetween(minX, maxX),
    y: clamp(y, lane.minY, lane.maxY),
  };
}

function AmbientCursorDrifter({
  color,
  name,
  config,
}: {
  color: string;
  name: string;
  config: DrifterConfig;
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
      const lane = getLaneBounds(config.laneIndex, viewportH);

      posRef.current = {
        x: randomBetween(minX, maxX),
        y: clamp(
          lane.centerY + randomBetween(-24, 24),
          lane.minY,
          lane.maxY,
        ),
      };
      targetRef.current = pickTarget(
        config.side,
        config.laneIndex,
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
      const lane = getLaneBounds(config.laneIndex, viewportH);
      const pos = posRef.current;
      const target = targetRef.current;

      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 6) {
        pauseUntilRef.current = now + randomBetween(config.pauseMin, config.pauseMax);
        targetRef.current = pickTarget(
          config.side,
          config.laneIndex,
          viewportW,
          viewportH,
          pos.y,
        );
      } else {
        const ease = clamp(distance / 320, 0.35, 1);
        const step = config.baseSpeed * ease;

        posRef.current = {
          x: pos.x + dx * step,
          y: clamp(pos.y + dy * step, lane.minY, lane.maxY),
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
      const lane = getLaneBounds(config.laneIndex, viewportH);

      posRef.current = {
        x: clamp(posRef.current.x, minX, maxX),
        y: clamp(posRef.current.y, lane.minY, lane.maxY),
      };
      targetRef.current = pickTarget(
        config.side,
        config.laneIndex,
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
  }, [config]);

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
    <div className="pointer-events-none fixed inset-0 z-40 overflow-visible">
      {cursors.map((cursor, index) => (
        <AmbientCursorDrifter
          key={cursor.name}
          color={cursor.color}
          name={cursor.name}
          config={DRIFTER_CONFIGS[index]}
        />
      ))}
    </div>
  );
}

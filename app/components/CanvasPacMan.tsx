"use client";

import { useEffect, useRef, useState } from "react";
import { useCanvas } from "@/lib/canvas-context";
import { DOT_GRID_SIZE } from "@/lib/canvas-dots";
import { useTheme } from "@/lib/theme-context";

type DotBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type CanvasPacManProps = {
  dotBounds: DotBounds;
};

type Direction = 0 | 1 | 2 | 3;

const PACMAN_RADIUS = 10;
const PACMAN_SPEED = 84;
const VISIBILITY_ZOOM = 0.58;
const VISIBILITY_FADE = 0.72;
const START_POSITION = { x: 720, y: 96 };

function snapToGrid(value: number) {
  return Math.round(value / DOT_GRID_SIZE) * DOT_GRID_SIZE;
}

function gridKey(x: number, y: number) {
  return `${x},${y}`;
}

function getVisibility(zoom: number) {
  if (zoom <= VISIBILITY_ZOOM) return 1;
  if (zoom >= VISIBILITY_FADE) return 0;
  return 1 - (zoom - VISIBILITY_ZOOM) / (VISIBILITY_FADE - VISIBILITY_ZOOM);
}

function getCanvasBgColor(theme: "light" | "dark") {
  return theme === "dark" ? "#000000" : "#ffffff";
}

function buildPacManPath(
  cx: number,
  cy: number,
  radius: number,
  mouthSpread: number,
) {
  const x1 = cx + radius * Math.cos(-mouthSpread);
  const y1 = cy + radius * Math.sin(-mouthSpread);
  const x2 = cx + radius * Math.cos(mouthSpread);
  const y2 = cy + radius * Math.sin(mouthSpread);

  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 1 1 ${x2} ${y2} Z`;
}

function PacManFigure({
  mouthSpread,
  rotation,
}: {
  mouthSpread: number;
  rotation: number;
}) {
  const size = PACMAN_RADIUS * 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <g transform={`rotate(${rotation} ${PACMAN_RADIUS} ${PACMAN_RADIUS})`}>
        <path
          d={buildPacManPath(
            PACMAN_RADIUS,
            PACMAN_RADIUS,
            PACMAN_RADIUS - 1,
            mouthSpread,
          )}
          fill="#ffcc00"
        />
        <circle
          cx={PACMAN_RADIUS + 3}
          cy={PACMAN_RADIUS - 4}
          r={1.35}
          fill="#1a1a1a"
        />
      </g>
    </svg>
  );
}

export function CanvasPacMan({ dotBounds }: CanvasPacManProps) {
  const { zoom } = useCanvas();
  const { theme } = useTheme();

  const posRef = useRef(START_POSITION);
  const dirRef = useRef<Direction>(0);
  const eatenRef = useRef(new Set<string>());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pacmanRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotBoundsRef = useRef(dotBounds);
  const zoomRef = useRef(zoom);
  const themeRef = useRef(theme);
  const canvasMetricsRef = useRef({
    width: 0,
    height: 0,
    left: Number.NaN,
    top: Number.NaN,
  });

  const [mouthOpen, setMouthOpen] = useState(true);
  const [facing, setFacing] = useState<Direction>(0);

  dotBoundsRef.current = dotBounds;
  zoomRef.current = zoom;
  themeRef.current = theme;

  const paintEatenDots = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { left, top, width, height } = dotBoundsRef.current;
    const metrics = canvasMetricsRef.current;
    const dpr = window.devicePixelRatio || 1;

    canvas.style.left = `${left}px`;
    canvas.style.top = `${top}px`;

    if (metrics.width !== width || metrics.height !== height) {
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      metrics.width = width;
      metrics.height = height;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = getCanvasBgColor(themeRef.current);

    for (const key of eatenRef.current) {
      const [gx, gy] = key.split(",").map(Number);
      if (gx < left - DOT_GRID_SIZE || gx > left + width + DOT_GRID_SIZE) continue;
      if (gy < top - DOT_GRID_SIZE || gy > top + height + DOT_GRID_SIZE) continue;

      ctx.beginPath();
      ctx.arc(gx - left, gy - top, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    metrics.left = left;
    metrics.top = top;
  };

  useEffect(() => {
    paintEatenDots();
  }, [dotBounds.left, dotBounds.top, dotBounds.width, dotBounds.height, theme]);

  useEffect(() => {
    let raf = 0;
    let lastTime = performance.now();
    let mouthTimer = 0;
    let lastFacing = dirRef.current;

    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const visibility = getVisibility(zoomRef.current);
      if (containerRef.current) {
        containerRef.current.style.opacity = String(visibility);
      }

      if (visibility > 0) {
        mouthTimer += dt;
        if (mouthTimer >= 0.11) {
          mouthTimer = 0;
          setMouthOpen((open) => !open);
        }

        const pos = posRef.current;
        const dir = dirRef.current;
        const dx = dir === 0 ? 1 : dir === 2 ? -1 : 0;
        const dy = dir === 1 ? 1 : dir === 3 ? -1 : 0;

        pos.x += dx * PACMAN_SPEED * dt;
        pos.y += dy * PACMAN_SPEED * dt;

        const snappedX = snapToGrid(pos.x);
        const snappedY = snapToGrid(pos.y);

        if (
          Math.abs(pos.x - snappedX) < 0.75 &&
          Math.abs(pos.y - snappedY) < 0.75
        ) {
          pos.x = snappedX;
          pos.y = snappedY;

          const key = gridKey(snappedX, snappedY);
          if (!eatenRef.current.has(key)) {
            eatenRef.current.add(key);
            paintEatenDots();
          }

          if (eatenRef.current.size > 8000) {
            const keep = new Set<string>();
            for (const eatenKey of eatenRef.current) {
              const [gx, gy] = eatenKey.split(",").map(Number);
              if (
                Math.abs(gx - snappedX) <= 960 &&
                Math.abs(gy - snappedY) <= 960
              ) {
                keep.add(eatenKey);
              }
            }
            eatenRef.current = keep;
            paintEatenDots();
          }

          if (Math.random() < 0.28) {
            const options = ([0, 1, 2, 3] as Direction[]).filter(
              (option) => option !== ((dir + 2) % 4) as Direction,
            );
            dirRef.current =
              options[Math.floor(Math.random() * options.length)] ?? dir;
          }
        }

        if (pacmanRef.current) {
          pacmanRef.current.style.left = `${pos.x - PACMAN_RADIUS}px`;
          pacmanRef.current.style.top = `${pos.y - PACMAN_RADIUS}px`;
        }

        if (dirRef.current !== lastFacing) {
          lastFacing = dirRef.current;
          setFacing(dirRef.current);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const mouthSpread = mouthOpen ? 0.62 : 0.12;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute" />
      <div
        ref={pacmanRef}
        className="absolute"
        style={{
          left: posRef.current.x - PACMAN_RADIUS,
          top: posRef.current.y - PACMAN_RADIUS,
          width: PACMAN_RADIUS * 2,
          height: PACMAN_RADIUS * 2,
        }}
      >
        <PacManFigure mouthSpread={mouthSpread} rotation={facing * 90} />
      </div>
    </div>
  );
}

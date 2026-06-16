"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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

function getCanvasBgColor() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--canvas-bg")
      .trim() || "#ffffff"
  );
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
      className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
    >
      <g transform={`rotate(${rotation} ${PACMAN_RADIUS} ${PACMAN_RADIUS})`}>
        <path
          d={buildPacManPath(PACMAN_RADIUS, PACMAN_RADIUS, PACMAN_RADIUS - 1, mouthSpread)}
          fill="#ffcc00"
        />
        <circle cx={PACMAN_RADIUS + 3} cy={PACMAN_RADIUS - 4} r={1.35} fill="#1a1a1a" />
      </g>
    </svg>
  );
}

export function CanvasPacMan({ dotBounds }: CanvasPacManProps) {
  const { zoom, pan } = useCanvas();
  const { theme } = useTheme();
  const posRef = useRef(START_POSITION);
  const dirRef = useRef<Direction>(0);
  const mouthOpenRef = useRef(true);
  const mouthTimerRef = useRef(0);
  const eatenRef = useRef(new Set<string>());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState(0);

  const visibility =
    zoom <= VISIBILITY_ZOOM
      ? 1
      : zoom >= VISIBILITY_FADE
        ? 0
        : 1 - (zoom - VISIBILITY_ZOOM) / (VISIBILITY_FADE - VISIBILITY_ZOOM);

  const redrawEaten = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const { left, top, width, height } = dotBounds;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = getCanvasBgColor();

    for (const key of eatenRef.current) {
      const [gx, gy] = key.split(",").map(Number);
      if (gx < left - DOT_GRID_SIZE || gx > left + width + DOT_GRID_SIZE) continue;
      if (gy < top - DOT_GRID_SIZE || gy > top + height + DOT_GRID_SIZE) continue;

      ctx.beginPath();
      ctx.arc(gx - left, gy - top, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [dotBounds]);

  useEffect(() => {
    redrawEaten();
  }, [dotBounds, frame, theme]);

  useEffect(() => {
    if (visibility <= 0) return;

    let raf = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      mouthTimerRef.current += dt;
      if (mouthTimerRef.current >= 0.11) {
        mouthTimerRef.current = 0;
        mouthOpenRef.current = !mouthOpenRef.current;
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
        eatenRef.current.add(gridKey(snappedX, snappedY));

        if (eatenRef.current.size > 8000) {
          const keep = new Set<string>();
          for (const key of eatenRef.current) {
            const [gx, gy] = key.split(",").map(Number);
            if (
              Math.abs(gx - snappedX) <= 960 &&
              Math.abs(gy - snappedY) <= 960
            ) {
              keep.add(key);
            }
          }
          eatenRef.current = keep;
        }

        if (Math.random() < 0.28) {
          const options = ([0, 1, 2, 3] as Direction[]).filter(
            (option) => option !== ((dir + 2) % 4) as Direction,
          );
          dirRef.current =
            options[Math.floor(Math.random() * options.length)] ?? dir;
        }
      }

      setFrame((value) => value + 1);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visibility]);

  const handleSteer = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const canvasX = (event.clientX - pan.x) / zoom;
    const canvasY = (event.clientY - pan.y) / zoom;
    const dx = canvasX - posRef.current.x;
    const dy = canvasY - posRef.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      dirRef.current = dx >= 0 ? 0 : 2;
    } else {
      dirRef.current = dy >= 0 ? 1 : 3;
    }
  };

  if (visibility <= 0) return null;

  const mouthSpread = mouthOpenRef.current ? 0.62 : 0.12;
  const rotation = dirRef.current * 90;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute z-[2]"
        style={{
          left: dotBounds.left,
          top: dotBounds.top,
          opacity: visibility,
        }}
        aria-hidden="true"
      />
      <button
        type="button"
        data-no-pan
        className="absolute z-[3] rounded-full border-0 bg-transparent p-0 transition-opacity duration-300"
        style={{
          left: posRef.current.x - PACMAN_RADIUS,
          top: posRef.current.y - PACMAN_RADIUS,
          width: PACMAN_RADIUS * 2,
          height: PACMAN_RADIUS * 2,
          opacity: visibility,
          pointerEvents: visibility > 0.15 ? "auto" : "none",
        }}
        onPointerDown={handleSteer}
        aria-label="Pac-Man — click to steer"
      >
        <PacManFigure mouthSpread={mouthSpread} rotation={rotation} />
      </button>
    </>
  );
}

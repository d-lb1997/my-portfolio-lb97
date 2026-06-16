"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const AboutCharacterScene = dynamic(
  () =>
    import("./AboutCharacterScene").then((module) => module.AboutCharacterScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-text-primary/10" />
      </div>
    ),
  },
);

export function AboutCharacterViewer() {
  const [rotationY, setRotationY] = useState(0);
  const touchStartRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const applyRotationDelta = useCallback((delta: number) => {
    setRotationY((current) => current + delta);
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      applyRotationDelta(event.deltaY * 0.004);
    },
    [applyRotationDelta],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const startX = touchStartRef.current;
    const currentX = event.touches[0]?.clientX;
    if (startX == null || currentX == null) return;

    applyRotationDelta((startX - currentX) * 0.008);
    touchStartRef.current = currentX;
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  return (
    <div className="flex flex-col items-center" data-no-pan>
      <div
        ref={containerRef}
        className="relative h-[min(52vh,440px)] w-full max-w-[20rem] sm:max-w-[22rem]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        aria-label="Interactive 3D portrait. Scroll or drag to rotate."
      >
        <AboutCharacterScene rotationY={rotationY} />
      </div>
      <p className="mt-3 text-center text-[clamp(0.72rem,2.2vw,0.8125rem)] font-medium text-text-secondary">
        scroll to rotate
      </p>
    </div>
  );
}

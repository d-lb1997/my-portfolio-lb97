"use client";

import { useCanvas } from "@/lib/canvas-context";
import { FRAMES } from "@/lib/frames";
import { AboutFrame } from "./AboutFrame";
import { ContactFrame } from "./ContactFrame";
import { HomeFrame } from "./HomeFrame";
import { WorkFrame } from "./WorkFrame";

export function Canvas() {
  const { pan, zoom, isPanning, containerRef, onPanStart } = useCanvas();

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      onMouseDown={onPanStart}
      style={{ cursor: isPanning ? "grabbing" : "grab" }}
    >
      <div
        className="dot-grid absolute left-0 top-0 will-change-transform"
        style={{
          width: 5200,
          height: 2800,
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        <div
          className="absolute"
          style={{ left: FRAMES.home.x, top: FRAMES.home.y }}
        >
          <HomeFrame />
        </div>

        <div
          className="absolute"
          style={{ left: FRAMES.about.x, top: FRAMES.about.y }}
        >
          <AboutFrame />
        </div>

        <div
          className="absolute"
          style={{ left: FRAMES.work.x, top: FRAMES.work.y }}
        >
          <WorkFrame />
        </div>

        <div
          className="absolute"
          style={{ left: FRAMES.contact.x, top: FRAMES.contact.y }}
        >
          <ContactFrame />
        </div>
      </div>
    </div>
  );
}

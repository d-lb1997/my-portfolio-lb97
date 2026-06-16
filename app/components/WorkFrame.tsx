"use client";

import { WORK_FRAME_HEIGHT, WORK_FRAME_WIDTH } from "@/lib/pages";

export function WorkFrame() {
  return (
    <section
      className="relative overflow-visible"
      style={{ width: WORK_FRAME_WIDTH, minHeight: WORK_FRAME_HEIGHT }}
      aria-label="Work"
    />
  );
}

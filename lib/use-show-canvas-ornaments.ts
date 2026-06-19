"use client";

import { useEffect, useState } from "react";
import { useCanvas } from "@/lib/canvas-context";

const ORNAMENT_ZOOM_THRESHOLD = 1.35;

export function useShowCanvasOrnaments() {
  const { zoom } = useCanvas();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated && zoom < ORNAMENT_ZOOM_THRESHOLD;
}

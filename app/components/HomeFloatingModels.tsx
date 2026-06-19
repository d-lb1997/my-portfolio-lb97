"use client";

import { Component, type ReactNode } from "react";
import { useShowCanvasOrnaments } from "@/lib/use-show-canvas-ornaments";
import { HomeFlowersEmbed } from "./HomeFlowersEmbed";

class FloatingModelsErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export function HomeFloatingModels() {
  const show = useShowCanvasOrnaments();

  if (!show) {
    return null;
  }

  return (
    <FloatingModelsErrorBoundary>
      <HomeFlowersEmbed />
    </FloatingModelsErrorBoundary>
  );
}

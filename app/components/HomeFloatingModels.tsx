"use client";

import { Component, type ReactNode } from "react";
import { useShowCanvasOrnaments } from "@/lib/use-show-canvas-ornaments";
import { HomeFlowersEmbed } from "./HomeFlowersEmbed";
import { HomeNewBalanceEmbed } from "./HomeNewBalanceEmbed";

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
      <HomeNewBalanceEmbed />
      <HomeFlowersEmbed />
    </FloatingModelsErrorBoundary>
  );
}

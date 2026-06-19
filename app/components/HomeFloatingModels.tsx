"use client";

import { useShowCanvasOrnaments } from "@/lib/use-show-canvas-ornaments";
import { HomeFlowersEmbed } from "./HomeFlowersEmbed";
import { HomeNewBalanceEmbed } from "./HomeNewBalanceEmbed";

export function HomeFloatingModels() {
  const show = useShowCanvasOrnaments();

  if (!show) {
    return null;
  }

  return (
    <>
      <HomeNewBalanceEmbed />
      <HomeFlowersEmbed />
    </>
  );
}

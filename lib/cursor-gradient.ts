import type { CSSProperties } from "react";

export type CursorChatGradient = {
  accent: string;
  accentLight: string;
  accentVivid: string;
  accentDeep: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseHex(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((channel) => channel + channel)
          .join("")
      : normalized;

  return [
    parseInt(expanded.slice(0, 2), 16),
    parseInt(expanded.slice(2, 4), 16),
    parseInt(expanded.slice(4, 6), 16),
  ];
}

function mixRgb(
  [r1, g1, b1]: [number, number, number],
  [r2, g2, b2]: [number, number, number],
  amount: number,
): [number, number, number] {
  return [
    Math.round(r1 + (r2 - r1) * amount),
    Math.round(g1 + (g2 - g1) * amount),
    Math.round(b1 + (b2 - b1) * amount),
  ];
}

function toHex([r, g, b]: [number, number, number]) {
  return `#${[r, g, b]
    .map((value) => clamp(value, 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function buildCursorChatGradient(baseColor: string): CursorChatGradient {
  const rgb = parseHex(baseColor);
  const white: [number, number, number] = [255, 255, 255];
  const black: [number, number, number] = [0, 0, 0];

  return {
    accent: baseColor,
    accentLight: toHex(mixRgb(rgb, white, 0.38)),
    accentVivid: toHex(mixRgb(rgb, white, 0.22)),
    accentDeep: toHex(mixRgb(rgb, black, 0.2)),
  };
}

export function cursorChatGradientStyle(
  gradient: CursorChatGradient,
): CSSProperties {
  return {
    ["--chat-accent" as string]: gradient.accent,
    ["--chat-accent-light" as string]: gradient.accentLight,
    ["--chat-accent-vivid" as string]: gradient.accentVivid,
    ["--chat-accent-deep" as string]: gradient.accentDeep,
  };
}

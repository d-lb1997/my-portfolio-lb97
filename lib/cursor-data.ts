export const CURSOR_COLORS = [
  { hex: "#FF3CAC", name: "Hot Pink" },
  { hex: "#2DCC70", name: "Emerald Green" },
  { hex: "#3498DB", name: "Bright Blue" },
  { hex: "#F39C12", name: "Amber Orange" },
  { hex: "#00C9E4", name: "Cyan Blue" },
  { hex: "#A855F7", name: "Violet" },
  { hex: "#F43F5E", name: "Rose Red" },
  { hex: "#10B981", name: "Teal" },
] as const;

export const CURSOR_NAMES = [
  "Portfolio Stalker",
  "Silent Fan",
  "Curious Bystander",
  "Secret Admirer",
  "Design Critic",
  "Pixel Peeper",
  "Color Theory Nerd",
  "Grid Obsessed",
  "Infinite Scroller",
  "Canvas Wanderer",
  "Frame Hopper",
  "Artboard Tourist",
  "Design Enthusiast",
  "Vibe Seeker",
  "Aesthetic Pilgrim",
  "Moodboard Collector",
  "Talent Scout (Probably)",
  "Future Collaborator",
  "Uninvited Art Director",
  "Just Here for Inspiration",
  "Ctrl+Z Addict",
  "Dark Mode Evangelist",
  "Sans Serif Supremacist",
  "Helvetica Agnostic",
] as const;

export type CursorColor = (typeof CURSOR_COLORS)[number]["hex"];

export function pickRandomCursor() {
  const color =
    CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)].hex;
  const name = CURSOR_NAMES[Math.floor(Math.random() * CURSOR_NAMES.length)];
  return { color, name };
}

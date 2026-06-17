export const CURSOR_COLORS = [
  "#FF3CAC",
  "#2DCC70",
  "#3498DB",
  "#F39C12",
  "#00C9E4",
  "#A855F7",
  "#F43F5E",
  "#10B981",
] as const;

export const CURSOR_NAMES = [
  "Portfolio Stalker",
  "Kerning Detective",
  "Curious Bystander",
  "Wireframe Ghost",
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
  "Dark Mode Evangelist",
  "Sans Serif Supremacist",
  "Helvetica Agnostic",
] as const;

export type CursorColor = (typeof CURSOR_COLORS)[number];

export type SessionCursor = {
  name: (typeof CURSOR_NAMES)[number];
  color: CursorColor;
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickSessionCursors(): {
  visitor: SessionCursor;
  ambient: SessionCursor[];
} {
  const names = shuffle([...CURSOR_NAMES]);
  const colors = shuffle([...CURSOR_COLORS]);

  return {
    visitor: { name: names[0], color: colors[0] },
    ambient: [
      { name: names[1], color: colors[1] },
      { name: names[2], color: colors[2] },
      { name: names[3], color: colors[3] },
      { name: names[4], color: colors[4] },
      { name: names[5], color: colors[5] },
      { name: names[6], color: colors[6] },
    ],
  };
}

export function pickRandomCursor(): SessionCursor {
  const names = shuffle([...CURSOR_NAMES]);
  const colors = shuffle([...CURSOR_COLORS]);
  return { name: names[0], color: colors[0] };
}

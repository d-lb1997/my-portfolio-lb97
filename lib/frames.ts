export type FrameId = "home" | "about" | "work" | "contact";

export type FrameConfig = {
  id: FrameId;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const FRAMES: Record<FrameId, FrameConfig> = {
  home: {
    id: "home",
    label: "Home",
    x: 0,
    y: 0,
    width: 1200,
    height: 800,
  },
  about: {
    id: "about",
    label: "About",
    x: 2400,
    y: 0,
    width: 1000,
    height: 700,
  },
  work: {
    id: "work",
    label: "Work",
    x: 0,
    y: 1800,
    width: 1100,
    height: 900,
  },
  contact: {
    id: "contact",
    label: "Contact",
    x: 2400,
    y: 1800,
    width: 700,
    height: 600,
  },
};

export const NAV_ITEMS: { id: FrameId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

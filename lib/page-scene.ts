import type { PageId } from "./pages";
import { pathnameToPageId } from "./pages";

export type ScenePalette = {
  bg: string;
  dot: string;
  glowA: string;
  glowB: string;
  glowC: string;
};

export const PAGE_SCENES: Record<PageId, Record<"light" | "dark", ScenePalette>> = {
  home: {
    light: {
      bg: "#f2f2f2",
      dot: "#cccccc",
      glowA: "rgba(124, 108, 240, 0.12)",
      glowB: "rgba(255, 60, 172, 0.08)",
      glowC: "rgba(45, 204, 112, 0.06)",
    },
    dark: {
      bg: "#131318",
      dot: "#2c2c34",
      glowA: "rgba(124, 108, 240, 0.28)",
      glowB: "rgba(255, 60, 172, 0.18)",
      glowC: "rgba(45, 204, 112, 0.12)",
    },
  },
  work: {
    light: {
      bg: "#eef1f6",
      dot: "#c8d0dc",
      glowA: "rgba(56, 189, 198, 0.16)",
      glowB: "rgba(99, 102, 241, 0.12)",
      glowC: "rgba(168, 85, 247, 0.09)",
    },
    dark: {
      bg: "#0f141c",
      dot: "#263040",
      glowA: "rgba(45, 200, 215, 0.32)",
      glowB: "rgba(120, 90, 230, 0.22)",
      glowC: "rgba(255, 60, 172, 0.14)",
    },
  },
  about: {
    light: {
      bg: "#f3f1ef",
      dot: "#d4cfc8",
      glowA: "rgba(255, 140, 90, 0.14)",
      glowB: "rgba(124, 108, 240, 0.1)",
      glowC: "rgba(45, 204, 112, 0.07)",
    },
    dark: {
      bg: "#181310",
      dot: "#342e28",
      glowA: "rgba(255, 140, 90, 0.3)",
      glowB: "rgba(124, 108, 240, 0.2)",
      glowC: "rgba(255, 196, 80, 0.12)",
    },
  },
  contact: {
    light: {
      bg: "#f0f2f4",
      dot: "#c9ced6",
      glowA: "rgba(45, 204, 112, 0.14)",
      glowB: "rgba(124, 108, 240, 0.1)",
      glowC: "rgba(56, 189, 198, 0.08)",
    },
    dark: {
      bg: "#101814",
      dot: "#243028",
      glowA: "rgba(45, 204, 112, 0.3)",
      glowB: "rgba(124, 108, 240, 0.18)",
      glowC: "rgba(56, 189, 198, 0.16)",
    },
  },
};

export function getPageScene(pageId: PageId, theme: "light" | "dark"): ScenePalette {
  return PAGE_SCENES[pageId][theme];
}

export function applyPageScene(pageId: PageId, theme: "light" | "dark") {
  const scene = getPageScene(pageId, theme);
  const root = document.documentElement;

  root.setAttribute("data-page", pageId);
  root.style.setProperty("--canvas-bg", scene.bg);
  root.style.setProperty("--dot-color", scene.dot);
  root.style.setProperty("--scene-glow-a", scene.glowA);
  root.style.setProperty("--scene-glow-b", scene.glowB);
  root.style.setProperty("--scene-glow-c", scene.glowC);
}

export function pathnameToScenePage(pathname: string): PageId {
  return pathnameToPageId(pathname);
}

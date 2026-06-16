import type { PageId } from "./pages";
import { pathnameToPageId } from "./pages";

export type ScenePalette = {
  bg: string;
  dot: string;
  glowA: string;
  glowB: string;
  glowC: string;
};

/** Base tints stay in an accessible luminance band; glows stay subtle overlays. */
export const PAGE_SCENES: Record<PageId, Record<"light" | "dark", ScenePalette>> = {
  home: {
    light: {
      bg: "#eceaee",
      dot: "#c8c4cc",
      glowA: "rgba(124, 108, 240, 0.09)",
      glowB: "rgba(255, 60, 172, 0.06)",
      glowC: "rgba(45, 204, 112, 0.05)",
    },
    dark: {
      bg: "#141418",
      dot: "#2a2a32",
      glowA: "rgba(124, 108, 240, 0.14)",
      glowB: "rgba(255, 60, 172, 0.09)",
      glowC: "rgba(45, 204, 112, 0.07)",
    },
  },
  work: {
    light: {
      bg: "#e5eaf0",
      dot: "#bcc4d0",
      glowA: "rgba(56, 130, 180, 0.08)",
      glowB: "rgba(99, 102, 241, 0.06)",
      glowC: "rgba(45, 180, 200, 0.05)",
    },
    dark: {
      bg: "#12161e",
      dot: "#262d38",
      glowA: "rgba(56, 160, 190, 0.14)",
      glowB: "rgba(100, 120, 200, 0.1)",
      glowC: "rgba(45, 200, 215, 0.08)",
    },
  },
  about: {
    light: {
      bg: "#ece8e3",
      dot: "#cfc8bf",
      glowA: "rgba(200, 120, 80, 0.08)",
      glowB: "rgba(124, 108, 240, 0.06)",
      glowC: "rgba(45, 204, 112, 0.05)",
    },
    dark: {
      bg: "#161412",
      dot: "#302a26",
      glowA: "rgba(220, 130, 80, 0.13)",
      glowB: "rgba(124, 108, 240, 0.09)",
      glowC: "rgba(200, 160, 80, 0.07)",
    },
  },
  contact: {
    light: {
      bg: "#e6ebe8",
      dot: "#bcc8c0",
      glowA: "rgba(45, 160, 110, 0.08)",
      glowB: "rgba(124, 108, 240, 0.06)",
      glowC: "rgba(56, 130, 170, 0.05)",
    },
    dark: {
      bg: "#121816",
      dot: "#242e28",
      glowA: "rgba(45, 180, 120, 0.13)",
      glowB: "rgba(124, 108, 240, 0.09)",
      glowC: "rgba(56, 160, 170, 0.07)",
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

export function getSceneBootstrapScript(): string {
  const scenesJson = JSON.stringify(PAGE_SCENES);

  return `(function(){try{var t=localStorage.getItem("theme");var theme=t==="light"?"light":"dark";document.documentElement.setAttribute("data-theme",theme);var p=location.pathname;var page=p==="/work"?"work":p==="/about"?"about":p==="/contact"?"contact":"home";document.documentElement.setAttribute("data-page",page);var scenes=${scenesJson};var s=scenes[page][theme];var r=document.documentElement.style;r.setProperty("--canvas-bg",s.bg);r.setProperty("--dot-color",s.dot);r.setProperty("--scene-glow-a",s.glowA);r.setProperty("--scene-glow-b",s.glowB);r.setProperty("--scene-glow-c",s.glowC);}catch(e){}})();`;
}

import type { PageId } from "./pages";
import { pathnameToPageId } from "./pages";

export type ScenePalette = {
  bg: string;
  dot: string;
};

/**
 * Solid page backgrounds — no gradient overlays.
 * Light: near-white bases with #0a0a0a text (WCAG AAA).
 * Dark: deep bases with #f2f2f2 text (WCAG AA+).
 */
export const PAGE_SCENES: Record<PageId, Record<"light" | "dark", ScenePalette>> = {
  home: {
    light: { bg: "#ffffff", dot: "#d8d8d8" },
    dark: { bg: "#000000", dot: "#2e2e2e" },
  },
  about: {
    light: { bg: "#f4eef8", dot: "#cfc2d9" },
    dark: { bg: "#180f28", dot: "#2e2042" },
  },
  work: {
    light: { bg: "#eef3fa", dot: "#c2cede" },
    dark: { bg: "#081528", dot: "#1a2840" },
  },
  contact: {
    light: { bg: "#eefaf2", dot: "#c2dcc8" },
    dark: { bg: "#081f18", dot: "#1a342c" },
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
}

export function pathnameToScenePage(pathname: string): PageId {
  return pathnameToPageId(pathname);
}

export function getSceneBootstrapScript(): string {
  const scenesJson = JSON.stringify(PAGE_SCENES);

  return `(function(){try{var t=localStorage.getItem("theme");var theme=t==="light"?"light":"dark";document.documentElement.setAttribute("data-theme",theme);var p=location.pathname;var page=p==="/work"?"work":p==="/about"?"about":p==="/contact"?"contact":"home";document.documentElement.setAttribute("data-page",page);var scenes=${scenesJson};var s=scenes[page][theme];var r=document.documentElement.style;r.setProperty("--canvas-bg",s.bg);r.setProperty("--dot-color",s.dot);}catch(e){}})();`;
}

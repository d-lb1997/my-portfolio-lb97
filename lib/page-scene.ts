import type { PageId } from "./pages";
import { pathnameToPageId } from "./pages";

export type ScenePalette = {
  bg: string;
  dot: string;
};

/** Opaque, saturated page bases — each route reads as a distinct solid color. */
export const PAGE_SCENES: Record<PageId, Record<"light" | "dark", ScenePalette>> = {
  home: {
    light: { bg: "#ffffff", dot: "#cccccc" },
    dark: { bg: "#000000", dot: "#3a3a3a" },
  },
  about: {
    light: { bg: "#ead4ff", dot: "#b892e0" },
    dark: { bg: "#321068", dot: "#5a2898" },
  },
  work: {
    light: { bg: "#c5dcff", dot: "#7ea8e8" },
    dark: { bg: "#082878", dot: "#1a4498" },
  },
  contact: {
    light: { bg: "#b8f5d0", dot: "#5ecf92" },
    dark: { bg: "#0a4828", dot: "#1a7048" },
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

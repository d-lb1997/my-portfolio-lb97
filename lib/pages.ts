export type PageId = "home" | "about" | "work" | "contact";

export type PageConfig = {
  id: PageId;
  href: string;
  label: string;
  canvasWidth: number;
  canvasHeight: number;
  contentX: number;
  contentY: number;
  initialZoom: number;
  focusX: number;
  focusY: number;
  immerseFocusX: number;
  immerseFocusY: number;
};

export const PAGES: Record<PageId, PageConfig> = {
  home: {
    id: "home",
    href: "/",
    label: "Home",
    canvasWidth: 5200,
    canvasHeight: 5200,
    contentX: -520,
    contentY: -380,
    initialZoom: 0.88,
    focusX: 260,
    focusY: 220,
    immerseFocusX: 1100,
    immerseFocusY: 820,
  },
  about: {
    id: "about",
    href: "/about",
    label: "About",
    canvasWidth: 4800,
    canvasHeight: 4800,
    contentX: 1200,
    contentY: 1000,
    initialZoom: 1,
    focusX: 1700,
    focusY: 1350,
    immerseFocusX: 1700,
    immerseFocusY: 1350,
  },
  work: {
    id: "work",
    href: "/work",
    label: "Work",
    canvasWidth: 4800,
    canvasHeight: 4800,
    contentX: 1100,
    contentY: 900,
    initialZoom: 1,
    focusX: 1650,
    focusY: 1350,
    immerseFocusX: 1650,
    immerseFocusY: 1350,
  },
  contact: {
    id: "contact",
    href: "/contact",
    label: "Contact",
    canvasWidth: 4800,
    canvasHeight: 4800,
    contentX: 1300,
    contentY: 1100,
    initialZoom: 1,
    focusX: 1650,
    focusY: 1400,
    immerseFocusX: 1650,
    immerseFocusY: 1400,
  },
};

export const NAV_ITEMS = Object.values(PAGES).map((page) => ({
  id: page.id,
  label: page.label,
  href: page.href,
}));

const PATH_TO_PAGE: Record<string, PageId> = {
  "/": "home",
  "/about": "about",
  "/work": "work",
  "/contact": "contact",
};

export function pathnameToPageId(pathname: string): PageId {
  return PATH_TO_PAGE[pathname] ?? "home";
}

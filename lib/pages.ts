export type PageId = "home" | "about" | "work" | "contact";

export type PageFitConfig = {
  width: number;
  height: number;
  padding?: number;
  mobilePadding?: number;
  mobileBreakpoint?: number;
};

export type PageConfig = {
  id: PageId;
  href: string;
  label: string;
  contentX: number;
  contentY: number;
  initialZoom: number;
  focusX: number;
  focusY: number;
  focusOffsetY?: number;
  fitToViewport?: PageFitConfig;
  immerseFocusX: number;
  immerseFocusY: number;
};

export const HOME_FRAME_WIDTH = 1200;
export const HOME_FRAME_HEIGHT = 480;
export const CONTACT_FRAME_WIDTH = 1200;
export const CONTACT_FRAME_HEIGHT = 580;
export const WORK_FRAME_WIDTH = 1400;
export const WORK_FRAME_HEIGHT = 700;
export const WORK_NAV_WIDTH = 300;
export const WORK_NAV_OFFSET_X = -72;
export const WORK_NAV_OFFSET_Y = 96;

export const PAGES: Record<PageId, PageConfig> = {
  home: {
    id: "home",
    href: "/",
    label: "Home",
    contentX: -HOME_FRAME_WIDTH / 2,
    contentY: -HOME_FRAME_HEIGHT / 2,
    initialZoom: 1,
    focusX: 0,
    focusY: 0,
    fitToViewport: {
      width: HOME_FRAME_WIDTH,
      height: HOME_FRAME_HEIGHT,
      padding: 0.9,
      mobilePadding: 0.94,
      mobileBreakpoint: 1024,
    },
    immerseFocusX: 900,
    immerseFocusY: 650,
  },
  about: {
    id: "about",
    href: "/about",
    label: "About",
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
    contentX: 1100,
    contentY: 900,
    initialZoom: 1,
    focusX: 1100 + WORK_FRAME_WIDTH / 2,
    focusY: 900 + WORK_FRAME_HEIGHT / 2,
    fitToViewport: {
      width: WORK_FRAME_WIDTH,
      height: WORK_FRAME_HEIGHT,
      padding: 0.88,
      mobilePadding: 0.92,
      mobileBreakpoint: 1024,
    },
    immerseFocusX: 1100 + WORK_FRAME_WIDTH / 2,
    immerseFocusY: 900 + WORK_FRAME_HEIGHT / 2,
  },
  contact: {
    id: "contact",
    href: "/contact",
    label: "Contact",
    contentX: 1300,
    contentY: 1100,
    initialZoom: 1,
    focusX: 1300 + CONTACT_FRAME_WIDTH / 2,
    focusY: 1100 + CONTACT_FRAME_HEIGHT / 2,
    fitToViewport: {
      width: CONTACT_FRAME_WIDTH,
      height: CONTACT_FRAME_HEIGHT,
      padding: 0.9,
      mobilePadding: 0.94,
      mobileBreakpoint: 1024,
    },
    immerseFocusX: 1300 + CONTACT_FRAME_WIDTH / 2,
    immerseFocusY: 1100 + CONTACT_FRAME_HEIGHT / 2,
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

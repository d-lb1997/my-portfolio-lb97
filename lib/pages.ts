export type PageId = "home" | "about" | "work" | "contact";

export type PageFitConfig = {
  width: number;
  height: number;
  padding?: number;
  mobilePadding?: number;
  mobileBreakpoint?: number;
  mobileHeight?: number;
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
  mobileFocusOffsetY?: number;
  fitToViewport?: PageFitConfig;
  immerseFocusX: number;
  immerseFocusY: number;
  /** When true, the page uses a fixed layout instead of the infinite canvas. */
  staticPage?: boolean;
};

const MIN_FIT_ZOOM = 0.2;
const MAX_FIT_ZOOM = 5;

export function computeFitZoom(
  containerWidth: number,
  containerHeight: number,
  fit: PageFitConfig,
  initialZoom = 1,
): number {
  if (containerWidth === 0 || containerHeight === 0) {
    return initialZoom;
  }

  const {
    width,
    height,
    padding = 0.85,
    mobilePadding,
    mobileBreakpoint = 1024,
    mobileHeight,
  } = fit;
  const isMobile = containerWidth < mobileBreakpoint;
  const fitHeight = isMobile && mobileHeight ? mobileHeight : height;

  let zoom: number;

  if (isMobile) {
    const fitPadding = mobilePadding ?? padding;
    const contentWidth = Math.min(width, containerWidth * 1.08);

    zoom = Math.min(
      (containerWidth * fitPadding) / contentWidth,
      (containerHeight * fitPadding) / fitHeight,
    );
  } else {
    zoom =
      Math.min(containerWidth / width, containerHeight / height) * padding;
  }

  return Math.min(MAX_FIT_ZOOM, Math.max(MIN_FIT_ZOOM, zoom));
}

export function resolvePageFocusOffset(
  page: PageConfig,
  containerWidth: number,
): number {
  const breakpoint = page.fitToViewport?.mobileBreakpoint ?? 1024;

  if (containerWidth < breakpoint && page.mobileFocusOffsetY !== undefined) {
    return page.mobileFocusOffsetY;
  }

  return page.focusOffsetY ?? 0;
}

export const HOME_FRAME_WIDTH = 1200;
export const HOME_FRAME_HEIGHT = 520;
export const ABOUT_FRAME_WIDTH = 1200;
export const ABOUT_FRAME_HEIGHT = 780;
export const CONTACT_FRAME_WIDTH = 1200;
export const CONTACT_FRAME_HEIGHT = 580;
export const WORK_FRAME_WIDTH = 1400;
export const WORK_FRAME_HEIGHT = 760;
export const WORK_NAV_WIDTH = 300;
export const WORK_NAV_OFFSET_X = -72;
export const WORK_NAV_OFFSET_Y = 76;
export const WORK_UI_TOP = "6.75rem";
export const WORK_UI_BOTTOM = "2rem";
export const ABOUT_HERO_SHIFT_X = 168;
export const WORK_NAV_CONTENT_GAP = "2.75rem";
export const WORK_NAV_VIEWPORT_LEFT = "1.5rem";
export const WORK_CONTENT_VIEWPORT_LEFT = `calc(1.5rem + ${WORK_NAV_WIDTH}px + ${WORK_NAV_CONTENT_GAP})`;
export const WORK_CONTENT_VIEWPORT_RIGHT = `max(1.25rem, calc(50vw - ${ABOUT_FRAME_WIDTH / 2}px))`;

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
    focusX: 1200 + ABOUT_FRAME_WIDTH / 2,
    focusY: 1000 + ABOUT_FRAME_HEIGHT / 2,
    focusOffsetY: -48,
    mobileFocusOffsetY: -520,
    fitToViewport: {
      width: ABOUT_FRAME_WIDTH,
      height: ABOUT_FRAME_HEIGHT,
      mobileHeight: 500,
      padding: 0.88,
      mobilePadding: 0.92,
      mobileBreakpoint: 1280,
    },
    immerseFocusX: 1200 + ABOUT_FRAME_WIDTH / 2,
    immerseFocusY: 1000 + ABOUT_FRAME_HEIGHT / 2,
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

export type WorkLayerType = "frame" | "component" | "text" | "video" | "section";

export type WorkLayer = {
  id: string;
  label: string;
  type: WorkLayerType;
};

export type WorkProjectLogo =
  | { kind: "none" }
  | {
      kind: "brand";
      lightSrc: string;
      darkSrc: string;
      alt: string;
      width: number;
      height: number;
      displayHeight?: number;
    };

export type WorkProject = {
  id: string;
  brand?: string;
  title: string;
  subtitle?: string;
  logo: WorkProjectLogo;
  isOverview?: boolean;
  layers: WorkLayer[];
};

export function getProjectNavTitle(project: WorkProject): string {
  if (project.isOverview || !project.brand) {
    return project.title;
  }

  return `${project.brand} - ${project.title}`;
}

export const WORK_OVERVIEW: WorkProject = {
  id: "overview",
  title: "Overview",
  subtitle: "Selected Work",
  logo: { kind: "none" },
  isOverview: true,
  layers: [
    { id: "intro", label: "Introduction", type: "frame" },
    { id: "approach", label: "Approach", type: "text" },
    { id: "highlights", label: "Project Highlights", type: "section" },
  ],
};

export const WORK_CLIENT_PROJECTS: WorkProject[] = [
  {
    id: "carl-zeiss",
    brand: "Carl ZEISS",
    title: "Design Systems and AI",
    subtitle: "Design Systems · AI",
    logo: {
      kind: "brand",
      lightSrc: "/images/work/zeiss-light.png",
      darkSrc: "/images/work/zeiss-dark.png",
      alt: "Carl ZEISS",
      width: 55,
      height: 55,
    },
    layers: [
      { id: "research", label: "Research", type: "section" },
      { id: "design-system", label: "Design System", type: "component" },
      { id: "ai-patterns", label: "AI Patterns", type: "frame" },
      { id: "prototypes", label: "Prototypes", type: "video" },
    ],
  },
  {
    id: "mercedes-mbux",
    brand: "Mercedes Benz",
    title: "MBUX",
    subtitle: "Automotive UX",
    logo: {
      kind: "brand",
      lightSrc: "/images/work/mercedes-light.png",
      darkSrc: "/images/work/mercedes-dark.png",
      alt: "Mercedes-Benz",
      width: 55,
      height: 55,
    },
    layers: [
      { id: "mbux-concept", label: "MBUX Concept", type: "frame" },
      { id: "ui-patterns", label: "UI Patterns", type: "component" },
      { id: "interaction", label: "Interaction Design", type: "text" },
      { id: "final-ui", label: "Final UI", type: "frame" },
    ],
  },
  {
    id: "gtu-design-system",
    brand: "GTÜ",
    title: "GUI Design System",
    subtitle: "Design System",
    logo: {
      kind: "brand",
      lightSrc: "/images/work/gtu-light.png",
      darkSrc: "/images/work/gtu-dark.png",
      alt: "GTÜ",
      width: 126,
      height: 55,
      displayHeight: 24,
    },
    layers: [
      { id: "brand-audit", label: "Brand Audit", type: "section" },
      { id: "components", label: "Component Library", type: "component" },
      { id: "documentation", label: "Documentation", type: "text" },
      { id: "guidelines", label: "Guidelines", type: "frame" },
    ],
  },
];

export const WORK_PROJECTS: WorkProject[] = [
  WORK_OVERVIEW,
  ...WORK_CLIENT_PROJECTS,
];

export function getClientProjects() {
  return WORK_CLIENT_PROJECTS;
}

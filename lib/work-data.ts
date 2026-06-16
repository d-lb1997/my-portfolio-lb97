export type WorkLayerType = "frame" | "component" | "text" | "video" | "section";

export type WorkLayer = {
  id: string;
  label: string;
  type: WorkLayerType;
};

export type WorkProjectLogo =
  | { kind: "lb97" }
  | { kind: "placeholder"; label: string }
  | { kind: "none" };

export type WorkProject = {
  id: string;
  title: string;
  subtitle?: string;
  logo: WorkProjectLogo;
  isOverview?: boolean;
  layers: WorkLayer[];
};

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
    title: "Carl ZEISS — Design Systems and AI",
    subtitle: "Design Systems · AI",
    logo: { kind: "placeholder", label: "ZEISS" },
    layers: [
      { id: "research", label: "Research", type: "section" },
      { id: "design-system", label: "Design System", type: "component" },
      { id: "ai-patterns", label: "AI Patterns", type: "frame" },
      { id: "prototypes", label: "Prototypes", type: "video" },
    ],
  },
  {
    id: "mercedes-mbux",
    title: "Mercedes Benz and MBUX",
    subtitle: "Automotive UX",
    logo: { kind: "placeholder", label: "MB" },
    layers: [
      { id: "mbux-concept", label: "MBUX Concept", type: "frame" },
      { id: "ui-patterns", label: "UI Patterns", type: "component" },
      { id: "interaction", label: "Interaction Design", type: "text" },
      { id: "final-ui", label: "Final UI", type: "frame" },
    ],
  },
  {
    id: "gtu-design-system",
    title: "GUI GTÜ Design System",
    subtitle: "Design System",
    logo: { kind: "placeholder", label: "GTÜ" },
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

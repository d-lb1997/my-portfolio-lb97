export type WorkLayerType = "frame" | "component" | "text" | "video" | "section";

export type WorkLayer = {
  id: string;
  label: string;
  type: WorkLayerType;
};

export type WorkProject = {
  id: string;
  title: string;
  subtitle?: string;
  archived?: boolean;
  layers: WorkLayer[];
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "advantest-jumbo",
    title: "Advantest · JUMBO",
    subtitle: "Proposals",
    layers: [
      { id: "overview", label: "Overview", type: "frame" },
      { id: "video-concept", label: "Video Concept", type: "video" },
      { id: "stickers", label: "Stickers", type: "component" },
      { id: "problem", label: "The Problem", type: "text" },
      {
        id: "solution",
        label: "The Solution (All Tools come together…)",
        type: "text",
      },
      { id: "final-frames", label: "Final Frames", type: "frame" },
    ],
  },
  {
    id: "copilot-system",
    title: "Copilot System",
    subtitle: "Product Design",
    layers: [
      { id: "discovery", label: "Discovery", type: "section" },
      { id: "system-map", label: "System Map", type: "frame" },
      { id: "ui-components", label: "UI Components", type: "component" },
      { id: "prototype", label: "Interactive Prototype", type: "video" },
      { id: "handoff", label: "Handoff Notes", type: "text" },
    ],
  },
  {
    id: "design-system",
    title: "Design System",
    subtitle: "Components",
    layers: [
      { id: "tokens", label: "Tokens & Variables", type: "section" },
      { id: "typography", label: "Typography", type: "text" },
      { id: "components", label: "Component Library", type: "component" },
      { id: "documentation", label: "Documentation", type: "frame" },
    ],
  },
  {
    id: "archive-infographics",
    title: "Infographics",
    subtitle: "Archive",
    archived: true,
    layers: [
      { id: "data-viz", label: "Data Visualization", type: "frame" },
      { id: "export", label: "Export Assets", type: "component" },
    ],
  },
];

export function getActiveProjects() {
  return WORK_PROJECTS.filter((project) => !project.archived);
}

export function getArchivedProjects() {
  return WORK_PROJECTS.filter((project) => project.archived);
}

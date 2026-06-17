export type WorkLayerType = "frame" | "component" | "text" | "video" | "section";

export type WorkContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "placeholder"; label: string; aspectRatio?: string };

export type WorkLayerContent = {
  heading?: string;
  blocks: WorkContentBlock[];
};

export type WorkLayer = {
  id: string;
  label: string;
  type: WorkLayerType;
  content: WorkLayerContent;
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
  description?: string;
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

export function getLayerContent(
  project: WorkProject,
  layerId: string | null,
): WorkLayerContent | null {
  if (!layerId) return null;
  return project.layers.find((layer) => layer.id === layerId)?.content ?? null;
}

export const WORK_OVERVIEW: WorkProject = {
  id: "overview",
  title: "Overview",
  subtitle: "Selected Work",
  logo: { kind: "none" },
  isOverview: true,
  layers: [
    {
      id: "intro",
      label: "Introduction",
      type: "frame",
      content: {
        heading: "Introduction",
        blocks: [
          {
            type: "paragraph",
            text: "A selection of client and research work across design systems, automotive UX, and AI.",
          },
        ],
      },
    },
    {
      id: "approach",
      label: "Approach",
      type: "text",
      content: {
        heading: "Approach",
        blocks: [
          {
            type: "paragraph",
            text: "I work closely with product teams to translate complex requirements into clear, scalable design language.",
          },
        ],
      },
    },
    {
      id: "highlights",
      label: "Project Highlights",
      type: "section",
      content: {
        heading: "Project Highlights",
        blocks: [
          {
            type: "list",
            items: [
              "Carl ZEISS — Design Systems and Generative AI",
              "Mercedes-Benz — MBUX",
              "GTÜ — GUI Design System",
            ],
          },
        ],
      },
    },
  ],
};

export const WORK_CLIENT_PROJECTS: WorkProject[] = [
  {
    id: "carl-zeiss",
    brand: "Carl ZEISS",
    title: "Design Systems and Generative AI",
    subtitle: "Design Systems · AI",
    description:
      "Opportunities and challenges of integrating generative artificial intelligence in design systems.",
    logo: {
      kind: "brand",
      lightSrc: "/images/work/zeiss-light.png",
      darkSrc: "/images/work/zeiss-dark.png",
      alt: "Carl ZEISS",
      width: 55,
      height: 55,
    },
    layers: [
      {
        id: "overview",
        label: "Overview",
        type: "section",
        content: {
          heading: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "During my two years tenure at Carl ZEISS next to my work as UI Designer, I also had the opportunity to write my thesis on the integration of GenAI technologies into design systems.",
            },
            {
              type: "paragraph",
              text: "My objectives of research were the following:",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Which generative AI technologies are applicable to the internal design system Beyond for Products at Carl ZEISS?",
                "How well do these AI technologies meet the requirements of the design system in the corporate context at Carl ZEISS?",
                "What are the opportunities and challenges of incorporating AI as technology into the design system?",
              ],
            },
          ],
        },
      },
      {
        id: "ai-personas",
        label: "AI Personas",
        type: "frame",
        content: {
          heading: "AI Personas",
          blocks: [
            {
              type: "paragraph",
              text: "A framework that deals with the future application areas in the context of AI and its use in design systems comes from the two founders of Knapsack, Evan Lovely and Chris Strahl.",
            },
            {
              type: "paragraph",
              text: "It is expected that we will see an interplay of four different AI personas, as it is unlikely that there will be a single AI tool or technology that takes over all tasks in a design system.",
            },
          ],
        },
      },
      {
        id: "prompting",
        label: "Prompting",
        type: "text",
        content: {
          heading: "Prompting",
          blocks: [
            {
              type: "paragraph",
              text: "A further noteworthy consideration that emerged from my research is that prompting skills are crucial for achieving accurate and relevant results. This is especially important when prompting for tasks on a design system for UI designers, as the success of the system depends on the quality of the input and the ability of the AI model to interpret and respond appropriately.",
            },
            {
              type: "paragraph",
              text: "In the context of prompting it is important to keep in mind that an AI model needs constraints (docs, designs, colors, components, patterns etc.) for a qualitative output. Effective generative AI is bound by systems.",
            },
            {
              type: "paragraph",
              text: "A design system is also restricted by its constraints and is therefore limited to specific features such as components, specific style guides or the use of UI patterns in certain contexts.",
            },
          ],
        },
      },
      {
        id: "requirements-elicitation",
        label: "Requirements Elicitation",
        type: "component",
        content: {
          heading: "Requirements Elicitation",
          blocks: [
            {
              type: "paragraph",
              text: "As part of my thesis I conducted a requirements elicitation according to the requirements engineering method to determine which functional and non-functional requirements Carl ZEISS has for AI tools to be used on the internal design system Beyond for Products. For this, I conducted interviews with relevant stakeholders of the design system at Carl ZEISS.",
            },
          ],
        },
      },
      {
        id: "ai-future-of-design",
        label: "AI and the Future of Design",
        type: "video",
        content: {
          heading: "AI and the Future of Design",
          blocks: [
            {
              type: "paragraph",
              text: "With regard to my last research question, I had a look at challenges and opportunities of integrating AI as technology into design system practices.",
            },
            {
              type: "paragraph",
              text: "In this regard, there’s a lot of fear in the air. As AI gets better at design, it’s natural for designers to be worried about their jobs. But I think the question — will AI replace designers? — is a waste of time.",
            },
            {
              type: "paragraph",
              text: "Humans have always invented technology to do their work for them and will continue to do so as long as we exist. In fact: AI and automation will make designers more effective (not redundant), as design evolves alongside technology.",
            },
            {
              type: "paragraph",
              text: "AI will not replace thoughtful design. As Noah Levin, Vice President of Design at Figma, explains, there is just going to be a change in how we will work on design systems and designs. This change can be viewed through three lenses: what we design, how we design and who designs.",
            },
            {
              type: "paragraph",
              text: "With regard to how we design, AI will lower the bar for design system contribution and enable collaboration for non-designers as well. Stakeholders will be able to express their visual ideas more easily.",
            },
            {
              type: "paragraph",
              text: "If you are interested in all insights of my thesis, please feel free to reach out to me. (All illustrations were made by myself on the occasion of my thesis.)",
            },
          ],
        },
      },
    ],
  },
  {
    id: "mercedes-mbux",
    brand: "Mercedes Benz",
    title: "MBUX",
    subtitle: "Automotive UX",
    description:
      "In-vehicle infotainment and interaction design for Mercedes-Benz MBUX experiences.",
    logo: {
      kind: "brand",
      lightSrc: "/images/work/mercedes-light.png",
      darkSrc: "/images/work/mercedes-dark.png",
      alt: "Mercedes-Benz",
      width: 55,
      height: 55,
    },
    layers: [
      {
        id: "mbux-concept",
        label: "MBUX Concept",
        type: "frame",
        content: {
          heading: "MBUX Concept",
          blocks: [
            {
              type: "paragraph",
              text: "Exploration of next-generation MBUX concepts focused on clarity, hierarchy, and glanceable information architecture for in-car contexts.",
            },
          ],
        },
      },
      {
        id: "ui-patterns",
        label: "UI Patterns",
        type: "component",
        content: {
          heading: "UI Patterns",
          blocks: [
            {
              type: "paragraph",
              text: "Reusable UI patterns for navigation tiles, media controls, and contextual overlays — designed to scale across vehicle displays and aspect ratios.",
            },
          ],
        },
      },
      {
        id: "interaction",
        label: "Interaction Design",
        type: "text",
        content: {
          heading: "Interaction Design",
          blocks: [
            {
              type: "paragraph",
              text: "Interaction flows for touch, voice, and steering-wheel input — balancing discoverability with reduced cognitive load while driving.",
            },
            {
              type: "list",
              items: [
                "Touch target sizing for automotive contexts",
                "Voice-first fallback patterns",
                "Transition timing for glanceable feedback",
              ],
            },
          ],
        },
      },
      {
        id: "final-ui",
        label: "Final UI",
        type: "frame",
        content: {
          heading: "Final UI",
          blocks: [
            {
              type: "paragraph",
              text: "High-fidelity UI compositions applying the MBUX design language across home, media, and vehicle settings modules.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "gtu-design-system",
    brand: "GTÜ",
    title: "GUI Design System",
    subtitle: "Design System",
    description:
      "A scalable GUI design system for GTÜ digital products — from audit through components to documentation.",
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
      {
        id: "brand-audit",
        label: "Brand Audit",
        type: "section",
        content: {
          heading: "Brand Audit",
          blocks: [
            {
              type: "paragraph",
              text: "Audit of existing GTÜ digital touchpoints to identify inconsistencies in typography, color usage, and component behavior across products.",
            },
          ],
        },
      },
      {
        id: "components",
        label: "Component Library",
        type: "component",
        content: {
          heading: "Component Library",
          blocks: [
            {
              type: "paragraph",
              text: "Foundational component library covering forms, navigation, data display, and feedback patterns — built for consistency and accessibility.",
            },
          ],
        },
      },
      {
        id: "documentation",
        label: "Documentation",
        type: "text",
        content: {
          heading: "Documentation",
          blocks: [
            {
              type: "paragraph",
              text: "Usage guidelines, do/don't examples, and implementation notes to help product teams adopt the system with confidence.",
            },
            {
              type: "list",
              items: [
                "Component anatomy and variants",
                "Accessibility requirements",
                "Content and tone guidance",
              ],
            },
          ],
        },
      },
      {
        id: "guidelines",
        label: "Guidelines",
        type: "frame",
        content: {
          heading: "Guidelines",
          blocks: [
            {
              type: "paragraph",
              text: "Visual and interaction guidelines defining spacing, elevation, motion, and layout principles for GTÜ GUI products.",
            },
          ],
        },
      },
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

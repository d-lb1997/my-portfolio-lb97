"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCanvas } from "@/lib/canvas-context";
import { useVisitorCursor } from "@/lib/cursor-context";
import { useTheme } from "@/lib/theme-context";
import {
  WORK_OVERVIEW,
  WORK_PROJECTS,
  getClientProjects,
  getProjectNavTitle,
  type WorkLayerType,
  type WorkProject,
  type WorkProjectLogo,
} from "@/lib/work-data";

function NavLogo({ logo }: { logo: WorkProjectLogo }) {
  const { theme, ready } = useTheme();

  if (logo.kind === "none") {
    return null;
  }

  if (!ready) {
    const placeholderHeight = logo.displayHeight ?? 34;
    return (
      <div
        className="work-nav-brand-logo shrink-0"
        style={{ height: placeholderHeight }}
      />
    );
  }

  const logoHeight = logo.displayHeight ?? 34;

  return (
    <Image
      src={theme === "dark" ? logo.darkSrc : logo.lightSrc}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className="work-nav-brand-logo shrink-0 object-contain object-left"
      style={{ height: logoHeight }}
    />
  );
}

function LayerIcon({ type }: { type: WorkLayerType }) {
  switch (type) {
    case "video":
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <rect
            x="1.5"
            y="2.5"
            width="9"
            height="7"
            rx="1"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
          />
          <path d="M5.5 4.5L8 6L5.5 7.5V4.5Z" fill="currentColor" />
        </svg>
      );
    case "text":
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M3 3H9M3 6H8M3 9H7"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "component":
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <rect
            x="2"
            y="2"
            width="4.5"
            height="4.5"
            rx="0.5"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
          />
          <rect
            x="5.5"
            y="5.5"
            width="4.5"
            height="4.5"
            rx="0.5"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
          />
        </svg>
      );
    case "section":
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M2 3H10M2 6H10M2 9H7"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M3.5 3.5H8.5M3.5 6H8.5M3.5 8.5H6.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <rect
            x="2"
            y="2"
            width="8"
            height="8"
            rx="1"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
          />
        </svg>
      );
  }
}

function SectionHeader({
  label,
  showActions = false,
  onCollaborateHover,
  onCollaborateLeave,
  onCollaborateClick,
  collaborateDisabled = false,
}: {
  label: string;
  showActions?: boolean;
  onCollaborateHover?: () => void;
  onCollaborateLeave?: () => void;
  onCollaborateClick?: () => void;
  collaborateDisabled?: boolean;
}) {
  return (
    <div className="work-nav-section-header">
      <span>{label}</span>
      {showActions && (
        <div className="flex items-center gap-1">
          <button type="button" className="work-nav-icon-btn" aria-label="Search">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <circle
                cx="5.25"
                cy="5.25"
                r="2.75"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
              />
              <path
                d="M7.5 7.5L10 10"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="work-nav-icon-btn"
            aria-label="Let's collaborate"
            disabled={collaborateDisabled}
            onMouseEnter={onCollaborateHover}
            onMouseLeave={onCollaborateLeave}
            onFocus={onCollaborateHover}
            onBlur={onCollaborateLeave}
            onClick={onCollaborateClick}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M6 2.5V9.5M2.5 6H9.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectButton({
  project,
  isActive,
  onSelect,
}: {
  project: WorkProject;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`work-nav-item ${isActive ? "work-nav-item-active" : ""}`}
    >
      <span className="truncate">{getProjectNavTitle(project)}</span>
    </button>
  );
}

export function WorkNav() {
  const clientProjects = getClientProjects();
  const { setVisitorLabelOverride } = useVisitorCursor();
  const { immerseNavigate, isNavigating } = useCanvas();
  const [selectedProjectId, setSelectedProjectId] = useState(WORK_OVERVIEW.id);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(
    WORK_OVERVIEW.layers[0]?.id ?? null,
  );

  const selectedProject = useMemo(
    () =>
      WORK_PROJECTS.find((project) => project.id === selectedProjectId) ??
      WORK_OVERVIEW,
    [selectedProjectId],
  );

  const handleSelectProject = (project: WorkProject) => {
    setSelectedProjectId(project.id);
    setSelectedLayerId(project.layers[0]?.id ?? null);
  };

  const showCollaborationLabel = () => {
    setVisitorLabelOverride("Let's collaborate");
  };

  const clearCollaborationLabel = () => {
    setVisitorLabelOverride(null);
  };

  const handleCollaborateClick = () => {
    clearCollaborationLabel();
    immerseNavigate("/contact");
  };

  const showNavLogo = selectedProject.logo.kind !== "none";

  return (
    <aside className="work-nav" data-no-pan aria-label="Work navigation">
      <div className="work-nav-topbar">
        <div
          className={`flex min-w-0 flex-1 items-center ${showNavLogo ? "gap-3" : ""}`}
        >
          {showNavLogo && <NavLogo logo={selectedProject.logo} />}
          <div className="min-w-0">
            <p className="work-nav-title truncate text-[14px] font-medium leading-tight">
              {getProjectNavTitle(selectedProject)}
            </p>
            {selectedProject.subtitle && (
              <p className="work-nav-subtitle truncate text-[12px] leading-tight">
                {selectedProject.subtitle}
              </p>
            )}
          </div>
        </div>
        <button type="button" className="work-nav-icon-btn shrink-0" aria-label="Toggle sidebar">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <rect
              x="2"
              y="3"
              width="10"
              height="8"
              rx="1"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
            <path d="M5.5 3V11" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>

      <div className="work-nav-body">
        <div className="work-nav-section">
          <SectionHeader
            label="Projects"
            showActions
            onCollaborateHover={showCollaborationLabel}
            onCollaborateLeave={clearCollaborationLabel}
            onCollaborateClick={handleCollaborateClick}
            collaborateDisabled={isNavigating}
          />
          <div className="work-nav-list">
            <ProjectButton
              project={WORK_OVERVIEW}
              isActive={selectedProjectId === WORK_OVERVIEW.id}
              onSelect={() => handleSelectProject(WORK_OVERVIEW)}
            />
          </div>

          <div className="work-nav-divider" />

          <div className="work-nav-list">
            {clientProjects.map((project) => (
              <ProjectButton
                key={project.id}
                project={project}
                isActive={project.id === selectedProjectId}
                onSelect={() => handleSelectProject(project)}
              />
            ))}
          </div>
        </div>

        <div className="work-nav-section work-nav-section-grow">
          <SectionHeader label="Layers" />
          <div className="work-nav-list work-nav-list-scroll">
            {selectedProject.layers.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setSelectedLayerId(layer.id)}
                className={`work-nav-layer ${
                  selectedLayerId === layer.id ? "work-nav-item-active" : ""
                }`}
              >
                <span className="work-nav-layer-icon">
                  <LayerIcon type={layer.type} />
                </span>
                <span className="truncate">{layer.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

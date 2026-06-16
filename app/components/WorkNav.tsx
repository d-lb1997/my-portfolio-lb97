"use client";

import { useMemo, useState } from "react";
import {
  getActiveProjects,
  getArchivedProjects,
  WORK_PROJECTS,
  type WorkLayerType,
  type WorkProject,
} from "@/lib/work-data";

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
}: {
  label: string;
  showActions?: boolean;
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
          <button type="button" className="work-nav-icon-btn" aria-label="Add project">
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
      <span className="truncate">{project.title}</span>
    </button>
  );
}

export function WorkNav() {
  const activeProjects = getActiveProjects();
  const archivedProjects = getArchivedProjects();
  const [selectedProjectId, setSelectedProjectId] = useState(
    activeProjects[0]?.id ?? WORK_PROJECTS[0].id,
  );
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(
    activeProjects[0]?.layers[0]?.id ?? null,
  );

  const selectedProject = useMemo(
    () =>
      WORK_PROJECTS.find((project) => project.id === selectedProjectId) ??
      WORK_PROJECTS[0],
    [selectedProjectId],
  );

  const handleSelectProject = (project: WorkProject) => {
    setSelectedProjectId(project.id);
    setSelectedLayerId(project.layers[0]?.id ?? null);
  };

  return (
    <aside className="work-nav" data-no-pan aria-label="Work navigation">
      <div className="work-nav-topbar">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="work-nav-logo" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="4" cy="7" r="2.5" fill="currentColor" />
              <circle cx="10" cy="4" r="2" fill="currentColor" opacity="0.85" />
              <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.65" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium leading-tight text-white">
              {selectedProject.title}
            </p>
            {selectedProject.subtitle && (
              <p className="truncate text-[11px] leading-tight text-white/55">
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
          <SectionHeader label="Projects" showActions />
          <div className="work-nav-list">
            {activeProjects.map((project) => (
              <ProjectButton
                key={project.id}
                project={project}
                isActive={project.id === selectedProjectId}
                onSelect={() => handleSelectProject(project)}
              />
            ))}
          </div>

          {archivedProjects.length > 0 && (
            <>
              <div className="work-nav-divider" />
              <div className="work-nav-list">
                {archivedProjects.map((project) => (
                  <ProjectButton
                    key={project.id}
                    project={project}
                    isActive={project.id === selectedProjectId}
                    onSelect={() => handleSelectProject(project)}
                  />
                ))}
              </div>
            </>
          )}
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

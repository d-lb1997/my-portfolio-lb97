"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  WORK_OVERVIEW,
  WORK_PROJECTS,
  getClientProjects,
  type WorkLayerType,
  type WorkProject,
  type WorkProjectLogo,
} from "@/lib/work-data";

function NavLogo({ logo }: { logo: WorkProjectLogo }) {
  if (logo.kind === "lb97") {
    return (
      <Image
        src="/images/logo-dark.png"
        alt="lb97"
        width={156}
        height={73}
        className="work-nav-logo-mark h-auto w-[58px] shrink-0"
      />
    );
  }

  return (
    <div
      className="work-nav-logo-placeholder shrink-0"
      aria-label={`${logo.label} logo placeholder`}
    >
      <span>{logo.label}</span>
    </div>
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
  const clientProjects = getClientProjects();
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

  return (
    <aside className="work-nav" data-no-pan aria-label="Work navigation">
      <div className="work-nav-topbar">
        <div className="flex min-w-0 items-center gap-3">
          <NavLogo logo={selectedProject.logo} />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium leading-tight text-white">
              {selectedProject.title}
            </p>
            {selectedProject.subtitle && (
              <p className="truncate text-[12px] leading-tight text-white/55">
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

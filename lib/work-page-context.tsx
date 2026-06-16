"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { WORK_OVERVIEW, WORK_PROJECTS, type WorkProject } from "./work-data";

type WorkPageContextValue = {
  selectedProjectId: string;
  selectedLayerId: string | null;
  selectedProject: WorkProject;
  selectProject: (project: WorkProject) => void;
  selectLayer: (layerId: string | null) => void;
};

const WorkPageContext = createContext<WorkPageContextValue | null>(null);

export function WorkPageProvider({ children }: { children: ReactNode }) {
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

  const selectProject = (project: WorkProject) => {
    setSelectedProjectId(project.id);
    setSelectedLayerId(project.layers[0]?.id ?? null);
  };

  const value = useMemo(
    () => ({
      selectedProjectId,
      selectedLayerId,
      selectedProject,
      selectProject,
      selectLayer: setSelectedLayerId,
    }),
    [selectedProjectId, selectedLayerId, selectedProject],
  );

  return (
    <WorkPageContext.Provider value={value}>{children}</WorkPageContext.Provider>
  );
}

export function useWorkPage() {
  const context = useContext(WorkPageContext);
  if (!context) {
    throw new Error("useWorkPage must be used within WorkPageProvider");
  }
  return context;
}

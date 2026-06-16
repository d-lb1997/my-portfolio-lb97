"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CURSOR_COLORS,
  CURSOR_NAMES,
  pickSessionCursors,
  type SessionCursor,
} from "./cursor-data";

type CursorContextValue = {
  visitor: SessionCursor;
  ambient: SessionCursor[];
  ready: boolean;
  visitorLabelOverride: string | null;
  setVisitorLabelOverride: (label: string | null) => void;
};

const defaultSession: CursorContextValue = {
  visitor: { name: CURSOR_NAMES[0], color: CURSOR_COLORS[0] },
  ambient: [],
  ready: false,
  visitorLabelOverride: null,
  setVisitorLabelOverride: () => {},
};

const CursorContext = createContext<CursorContextValue>(defaultSession);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Omit<CursorContextValue, "setVisitorLabelOverride">>(
    defaultSession,
  );
  const [visitorLabelOverride, setVisitorLabelOverrideState] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const { visitor, ambient } = pickSessionCursors();
    setSession({ visitor, ambient, ready: true, visitorLabelOverride: null });
  }, []);

  const setVisitorLabelOverride = useCallback((label: string | null) => {
    setVisitorLabelOverrideState(label);
  }, []);

  const value = useMemo(
    () => ({
      ...session,
      visitorLabelOverride,
      setVisitorLabelOverride,
    }),
    [session, visitorLabelOverride, setVisitorLabelOverride],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useVisitorCursor() {
  const context = useContext(CursorContext);
  const displayName = context.visitorLabelOverride ?? context.visitor.name;

  return {
    ...context.visitor,
    displayName,
    ready: context.ready,
    setVisitorLabelOverride: context.setVisitorLabelOverride,
  };
}

export function useAmbientCursors() {
  const context = useContext(CursorContext);
  return { cursors: context.ambient, ready: context.ready };
}

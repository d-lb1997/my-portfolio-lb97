"use client";

import {
  createContext,
  useContext,
  useEffect,
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
};

const defaultSession: CursorContextValue = {
  visitor: { name: CURSOR_NAMES[0], color: CURSOR_COLORS[0] },
  ambient: [],
  ready: false,
};

const CursorContext = createContext<CursorContextValue>(defaultSession);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<CursorContextValue>(defaultSession);

  useEffect(() => {
    const { visitor, ambient } = pickSessionCursors();
    setSession({ visitor, ambient, ready: true });
  }, []);

  return (
    <CursorContext.Provider value={session}>{children}</CursorContext.Provider>
  );
}

export function useVisitorCursor() {
  const context = useContext(CursorContext);
  return { ...context.visitor, ready: context.ready };
}

export function useAmbientCursors() {
  const context = useContext(CursorContext);
  return { cursors: context.ambient, ready: context.ready };
}

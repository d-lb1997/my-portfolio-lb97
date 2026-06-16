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
  pickRandomCursor,
  type CursorColor,
} from "./cursor-data";

type CursorContextValue = {
  color: CursorColor;
  name: string;
  ready: boolean;
};

const defaultColor = CURSOR_COLORS[0].hex;
const defaultName = CURSOR_NAMES[0];

const CursorContext = createContext<CursorContextValue>({
  color: defaultColor,
  name: defaultName,
  ready: false,
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState<CursorContextValue>({
    color: defaultColor,
    name: defaultName,
    ready: false,
  });

  useEffect(() => {
    const { color, name } = pickRandomCursor();
    setCursor({ color, name, ready: true });
  }, []);

  return (
    <CursorContext.Provider value={cursor}>{children}</CursorContext.Provider>
  );
}

export function useVisitorCursor() {
  return useContext(CursorContext);
}

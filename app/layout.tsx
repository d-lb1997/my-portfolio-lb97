import type { Metadata } from "next";
import { CanvasProvider } from "@/lib/canvas-context";
import { CursorProvider } from "@/lib/cursor-context";
import { googleSans } from "@/lib/fonts";
import { AmbientCursors } from "./components/AmbientCursors";
import { Canvas } from "./components/Canvas";
import { Navbar } from "./components/Navbar";
import { VisitorCursor } from "./components/VisitorCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lukas — Experience Designer",
  description:
    "Welcome to my design world — an infinite canvas portfolio experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${googleSans.variable} font-sans antialiased cursor-none`}
      >
        <CursorProvider>
          <CanvasProvider>
            <Navbar />
            <Canvas />
            <AmbientCursors />
            <VisitorCursor />
            {children}
          </CanvasProvider>
        </CursorProvider>
      </body>
    </html>
  );
}

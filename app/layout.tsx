import type { Metadata } from "next";
import { CanvasProvider } from "@/lib/canvas-context";
import { CursorProvider } from "@/lib/cursor-context";
import { googleSans } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme-context";
import { AmbientCursors } from "./components/AmbientCursors";
import { Canvas } from "./components/Canvas";
import { Navbar } from "./components/Navbar";
import { ThemeToggle } from "./components/ThemeToggle";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${googleSans.variable} font-sans antialiased cursor-none`}
      >
        <ThemeProvider>
          <CursorProvider>
            <CanvasProvider>
              <Navbar />
              <ThemeToggle />
              <Canvas />
              <AmbientCursors />
              <VisitorCursor />
              {children}
            </CanvasProvider>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

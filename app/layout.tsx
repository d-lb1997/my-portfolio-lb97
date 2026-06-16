import type { Metadata } from "next";
import { CanvasProvider } from "@/lib/canvas-context";
import { CursorProvider } from "@/lib/cursor-context";
import { googleSans } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme-context";
import { AmbientCursors } from "./components/AmbientCursors";
import { CanvasBackground } from "./components/CanvasBackground";
import { Navbar } from "./components/Navbar";
import { PageSceneProvider } from "./components/PageSceneProvider";
import { SiteLogo } from "./components/SiteLogo";
import { ThemeToggle } from "./components/ThemeToggle";
import { VisitorCursor } from "./components/VisitorCursor";
import { getSceneBootstrapScript } from "@/lib/page-scene";
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
            __html: getSceneBootstrapScript(),
          }}
        />
      </head>
      <body
        className={`${googleSans.variable} font-sans antialiased cursor-none`}
      >
        <ThemeProvider>
          <CursorProvider>
            <PageSceneProvider>
              <CanvasProvider>
                <CanvasBackground />
                <SiteLogo />
              <Navbar />
              <ThemeToggle />
              <AmbientCursors />
              <VisitorCursor />
              {children}
            </CanvasProvider>
          </PageSceneProvider>
        </CursorProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}

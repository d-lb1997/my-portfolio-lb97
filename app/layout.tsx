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
            __html: `(function(){try{var t=localStorage.getItem("theme");var theme=t==="light"?"light":"dark";document.documentElement.setAttribute("data-theme",theme);var p=location.pathname;var page=p==="/work"?"work":p==="/about"?"about":p==="/contact"?"contact":"home";document.documentElement.setAttribute("data-page",page);var scenes={home:{light:{bg:"#f2f2f2",dot:"#cccccc",a:"rgba(124,108,240,0.12)",b:"rgba(255,60,172,0.08)",c:"rgba(45,204,112,0.06)"},dark:{bg:"#131318",dot:"#2c2c34",a:"rgba(124,108,240,0.28)",b:"rgba(255,60,172,0.18)",c:"rgba(45,204,112,0.12)"}},work:{light:{bg:"#eef1f6",dot:"#c8d0dc",a:"rgba(56,189,198,0.16)",b:"rgba(99,102,241,0.12)",c:"rgba(168,85,247,0.09)"},dark:{bg:"#0f141c",dot:"#263040",a:"rgba(45,200,215,0.32)",b:"rgba(120,90,230,0.22)",c:"rgba(255,60,172,0.14)"}},about:{light:{bg:"#f3f1ef",dot:"#d4cfc8",a:"rgba(255,140,90,0.14)",b:"rgba(124,108,240,0.1)",c:"rgba(45,204,112,0.07)"},dark:{bg:"#181310",dot:"#342e28",a:"rgba(255,140,90,0.3)",b:"rgba(124,108,240,0.2)",c:"rgba(255,196,80,0.12)"}},contact:{light:{bg:"#f0f2f4",dot:"#c9ced6",a:"rgba(45,204,112,0.14)",b:"rgba(124,108,240,0.1)",c:"rgba(56,189,198,0.08)"},dark:{bg:"#101814",dot:"#243028",a:"rgba(45,204,112,0.3)",b:"rgba(124,108,240,0.18)",c:"rgba(56,189,198,0.16)"}}};var s=scenes[page][theme];var r=document.documentElement.style;r.setProperty("--canvas-bg",s.bg);r.setProperty("--dot-color",s.dot);r.setProperty("--scene-glow-a",s.a);r.setProperty("--scene-glow-b",s.b);r.setProperty("--scene-glow-c",s.c);}catch(e){}})();`,
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

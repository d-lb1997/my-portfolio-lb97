import type { Metadata } from "next";
import { CanvasProvider } from "@/lib/canvas-context";
import { CursorProvider } from "@/lib/cursor-context";
import { googleSans } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme-context";
import { AmbientCursors } from "./components/AmbientCursors";
import { HomeAudio } from "./components/HomeAudio";
import { Navbar } from "./components/Navbar";
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
            __html: `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark");}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function p(){var a=document.getElementById("portfolio-audio");if(!a)return;window.__portfolioAudioSession=window.__portfolioAudioSession||{started:false,finished:false};if(window.__portfolioAudioSession.finished)return;var v=0.32;function t(){if(window.__portfolioAudioSession.finished||a.ended)return;if(window.__portfolioAudioSession.started&&!a.paused&&!a.muted)return;a.muted=true;a.play().then(function(){a.muted=false;a.volume=v;window.__portfolioAudioSession.started=true;}).catch(function(){a.muted=false;a.volume=v;});}a.volume=v;t();a.addEventListener("canplaythrough",t);a.addEventListener("ended",function(){window.__portfolioAudioSession.finished=true;});}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",p);}else{p();}})();`,
          }}
        />
      </head>
      <body
        className={`${googleSans.variable} font-sans antialiased cursor-none`}
      >
        <audio
          id="portfolio-audio"
          src="/audio/sunflower.mp3"
          preload="auto"
          autoPlay
          muted
          playsInline
          aria-label="Sunflower from Spider-Man: Into the Spider-Verse"
          className="hidden"
          suppressHydrationWarning
        />
        <ThemeProvider>
          <CursorProvider>
            <CanvasProvider>
              <HomeAudio />
              <SiteLogo />
              <Navbar />
              <ThemeToggle />
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

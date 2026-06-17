"use client";

import {
  ABOUT_FRAME_HEIGHT,
  ABOUT_FRAME_WIDTH,
} from "@/lib/pages";
import { ABOUT_HERO_PHRASES, HeroText } from "./HeroText";

export function AboutFrame() {
  return (
    <section
      className="relative flex flex-col overflow-visible px-4 sm:px-8"
      style={{ width: ABOUT_FRAME_WIDTH, minHeight: ABOUT_FRAME_HEIGHT }}
      aria-label="About"
    >
      <div className="grid w-full max-w-[58rem] grid-cols-1 items-start gap-10 pb-[clamp(14rem,32vh,20rem)] pt-10 sm:pt-12 lg:grid-cols-2 lg:gap-16 lg:pt-14">
        <div className="flex w-full flex-col items-start">
          <HeroText
            headline="About me"
            phrases={ABOUT_HERO_PHRASES}
            align="left"
          />
        </div>

        <div className="max-w-[34rem] text-left lg:pt-1">
          <p className="text-[clamp(1rem,2.4vw,1.0625rem)] leading-relaxed text-text-secondary">
            Hi — I&apos;m Lukas, an experience designer focused on human-centered
            products. I work across research, visual design, and interaction to
            make interfaces feel natural and useful.
          </p>
          <p className="mt-4 text-[clamp(1rem,2.4vw,1.0625rem)] leading-relaxed text-text-secondary">
            This isn&apos;t a resumé — it&apos;s me talking to you like a human. I
            think in systems, in space, in structure. And I care deeply about the
            people on the other side of the screen.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-2 text-[clamp(0.9375rem,2.2vw,0.9375rem)] text-text-primary sm:grid-cols-2">
            <li>Product & UX design</li>
            <li>Prototyping & testing</li>
            <li>Design systems</li>
            <li>Interaction & motion</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

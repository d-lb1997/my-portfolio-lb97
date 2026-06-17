"use client";

import {
  ABOUT_FRAME_HEIGHT,
  ABOUT_FRAME_WIDTH,
} from "@/lib/pages";
import { ABOUT_HERO_PHRASES, HeroText } from "./HeroText";

export function AboutFrame() {
  return (
    <section
      className="relative flex flex-col overflow-visible px-4 sm:px-6 lg:px-4"
      style={{ width: ABOUT_FRAME_WIDTH, minHeight: ABOUT_FRAME_HEIGHT }}
      aria-label="About"
    >
      <div className="grid w-full max-w-[68rem] grid-cols-1 items-start gap-10 pb-[clamp(20rem,50vh,32rem)] pt-10 sm:pt-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-24 lg:gap-y-0 lg:pt-14 xl:gap-x-32">
        <div className="flex w-full max-w-[26rem] flex-col items-start self-start lg:-ml-2 xl:-ml-6">
          <HeroText
            headline="About me"
            phrases={ABOUT_HERO_PHRASES}
            align="left"
            wrapSubtitle
          />
        </div>

        <div className="max-w-[32rem] self-start text-left lg:ml-auto lg:pl-4 xl:pl-10">
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

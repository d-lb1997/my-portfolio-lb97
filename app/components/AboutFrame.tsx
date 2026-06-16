"use client";

import {
  ABOUT_FRAME_HEIGHT,
  ABOUT_FRAME_WIDTH,
} from "@/lib/pages";
import { ABOUT_HERO_PHRASES, HeroText } from "./HeroText";

const BADGES = [
  {
    label: "Based in Munich",
    color: "#FF3CAC",
    className: "left-0 top-[12%] sm:left-[4%]",
  },
  {
    label: "5 years in the field",
    color: "#2DCC70",
    className: "bottom-[12%] right-0 sm:right-[6%]",
  },
];

export function AboutFrame() {
  return (
    <section
      className="relative flex flex-col overflow-visible px-4 sm:px-8"
      style={{ width: ABOUT_FRAME_WIDTH, minHeight: ABOUT_FRAME_HEIGHT }}
      aria-label="About"
    >
      <div className="grid w-full max-w-[58rem] grid-cols-1 items-start gap-10 pt-10 sm:pt-12 lg:grid-cols-[minmax(16rem,20rem)_1fr] lg:gap-14 lg:pt-16">
        <div className="relative mx-auto w-full max-w-[22rem] lg:mx-0">
          {BADGES.map((badge) => (
            <div key={badge.label} className={`absolute z-10 ${badge.className}`}>
              <span
                className="inline-block rounded-md px-3 py-1.5 text-[13px] font-semibold text-white shadow-md"
                style={{ backgroundColor: badge.color }}
              >
                {badge.label}
              </span>
            </div>
          ))}

          <div
            className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-surface-white/70 shadow-sm"
            aria-label="Portrait placeholder"
          >
            <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-text-secondary">
              Portrait
            </span>
          </div>
        </div>

        <div className="flex w-full max-w-[34rem] flex-col items-start text-left">
          <HeroText
            headline="About me"
            phrases={ABOUT_HERO_PHRASES}
            align="left"
          />

          <div className="mt-10 w-full lg:mt-14">
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
      </div>
    </section>
  );
}

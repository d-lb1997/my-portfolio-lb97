"use client";

import {
  ABOUT_FRAME_HEIGHT,
  ABOUT_FRAME_WIDTH,
} from "@/lib/pages";
import { ABOUT_HERO_PHRASES, HeroText } from "./HeroText";
import { AboutCharacterViewer } from "./about/AboutCharacterViewer";

const BADGES = [
  {
    label: "Based in Munich",
    color: "#FF3CAC",
    className: "left-0 top-[18%] sm:left-[4%]",
  },
  {
    label: "5 years in the field",
    color: "#2DCC70",
    className: "bottom-[18%] right-0 sm:right-[6%]",
  },
];

export function AboutFrame() {
  return (
    <section
      className="relative flex flex-col items-center overflow-visible px-4 sm:px-8"
      style={{ width: ABOUT_FRAME_WIDTH, minHeight: ABOUT_FRAME_HEIGHT }}
      aria-label="About"
    >
      <HeroText headline="About me" phrases={ABOUT_HERO_PHRASES} />

      <div className="relative mt-6 grid w-full max-w-[58rem] grid-cols-1 items-center gap-10 lg:mt-8 lg:grid-cols-[minmax(16rem,20rem)_1fr] lg:gap-14">
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

          <AboutCharacterViewer />
        </div>

        <div className="max-w-[34rem] text-left lg:pt-4">
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

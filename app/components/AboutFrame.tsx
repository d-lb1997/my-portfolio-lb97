"use client";

import {
  ABOUT_FRAME_HEIGHT,
  ABOUT_FRAME_WIDTH,
} from "@/lib/pages";
import { ABOUT_HERO_PHRASES, HeroText } from "./HeroText";
import { AboutCopy } from "./AboutCompactFrame";

export function AboutFrame() {
  return (
    <>
      <section
        className="relative hidden flex-col overflow-visible px-4 sm:px-6 xl:flex xl:pl-0 xl:pr-8"
        style={{ width: ABOUT_FRAME_WIDTH, minHeight: ABOUT_FRAME_HEIGHT }}
        aria-label="About"
      >
        <div className="mx-auto grid w-full max-w-[68rem] grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] items-start gap-x-20 pb-[clamp(22rem,54vh,34rem)] pt-14 text-left xl:-ml-12 2xl:-ml-16 2xl:gap-x-24">
          <div className="flex w-full flex-col items-start self-start overflow-visible xl:-ml-[120px]">
            <HeroText
              headline="About me"
              phrases={ABOUT_HERO_PHRASES}
              align="left"
              wrapSubtitle
            />
          </div>

          <div className="max-w-[30rem] self-start text-left xl:-ml-10 2xl:-ml-16">
            <AboutCopy buttonClassName="mt-8 xl:mx-0" />
          </div>
        </div>
      </section>

      <div
        className="xl:hidden"
        style={{ width: ABOUT_FRAME_WIDTH, minHeight: ABOUT_FRAME_HEIGHT }}
        aria-hidden="true"
      />
    </>
  );
}

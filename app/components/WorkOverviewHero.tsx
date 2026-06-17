"use client";

import { WORK_OVERVIEW } from "@/lib/work-data";
import { useTheme } from "@/lib/theme-context";

const HERO_TEXT_CLASS =
  "text-[clamp(2rem,8.5vw,4rem)] leading-[1.08] tracking-[-0.05em] sm:text-[clamp(2.25rem,7.5vw,3.75rem)] lg:text-[clamp(2.5rem,5.5vw,4rem)]";

const MARQUEE_LOGO_WIDTH = 768;
const MARQUEE_LOGO_HEIGHT = 90;

export function WorkOverviewHero() {
  const { theme, ready } = useTheme();
  const logoSrc =
    theme === "dark"
      ? "/images/work/clients-light.svg"
      : "/images/work/clients-dark.svg";

  return (
    <div className="flex w-full max-w-[52rem] flex-col items-start overflow-visible text-left">
      <span className={`${HERO_TEXT_CLASS} font-black text-text-primary`}>
        Crafted for
      </span>

      <p
        className={`hero-gradient-text mt-0 ${HERO_TEXT_CLASS} font-light italic`}
      >
        {WORK_OVERVIEW.subtitle}
      </p>

      <div className="work-logo-marquee mt-10 w-full sm:mt-12" aria-hidden={!ready}>
        <div className="work-logo-marquee-track">
          <img
            src={logoSrc}
            alt=""
            width={MARQUEE_LOGO_WIDTH}
            height={MARQUEE_LOGO_HEIGHT}
            decoding="async"
            className="work-logo-marquee-image"
          />
          <img
            src={logoSrc}
            alt=""
            width={MARQUEE_LOGO_WIDTH}
            height={MARQUEE_LOGO_HEIGHT}
            decoding="async"
            className="work-logo-marquee-image"
          />
        </div>
      </div>
      <p className="sr-only">
        Client brands including ZEISS, GTÜ, Mercedes-Benz, Bosch, Siemens, SAP,
        Aston Martin, Puma, and SWM.
      </p>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const HOME_HERO_PHRASES = [
  "my design world.",
  "a pixel-perfect obsession.",
  "the good stuff.",
  "an artboard with no boundaries.",
  "something worth stealing.",
  "a cursor's paradise.",
  "the work. and the chaos behind it.",
  "a designer's train of thought.",
  "grids, gaps & glory.",
  "my 3am thoughts.",
  "a Figma file you can walk through.",
  "the vibe. and the system behind it.",
  "deliberate design.",
  "the portfolio. not the PDF.",
];

export const CONTACT_HERO_PHRASES = [
  "stay in touch",
  "collaborate",
  "connect",
  "build something",
  "create together",
  "stay connected",
  "work together",
  "share ideas",
  "design together",
  "make something",
  "stay curious",
  "keep talking",
];

export const ABOUT_HERO_PHRASES = [
  "the human behind the pixels.",
  "the face behind the Figma file.",
  "curious by default.",
];

const CYCLE_MS = 2800;
const TRANSITION = { duration: 0.4, ease: "easeInOut" as const };

const HERO_TEXT_CLASS =
  "text-[clamp(2rem,8.5vw,4rem)] leading-[1.08] tracking-[-0.05em] sm:text-[clamp(2.25rem,7.5vw,3.75rem)] lg:text-[clamp(2.5rem,5.5vw,4rem)]";

const HERO_SUBTITLE_CLASS = `${HERO_TEXT_CLASS} leading-[1.2]`;

type HeroTextProps = {
  headline?: string;
  phrases?: string[];
  align?: "center" | "left";
  wrapSubtitle?: boolean;
};

export function HeroText({
  headline = "Welcome to",
  phrases = HOME_HERO_PHRASES,
  align = "center",
  wrapSubtitle = false,
}: HeroTextProps) {
  const [index, setIndex] = useState(0);
  const isLeft = align === "left";

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, CYCLE_MS);

    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <div
      className={`flex w-full flex-col overflow-visible ${
        isLeft ? "items-start text-left" : "items-center text-center"
      }`}
    >
      <span className={`${HERO_TEXT_CLASS} font-black text-text-primary`}>
        {headline}
      </span>

      <div className="relative mt-0 min-h-[1.5em] w-full overflow-visible pb-3 sm:pb-4">
        <AnimatePresence mode="sync">
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={TRANSITION}
            className={`hero-gradient-text absolute top-0 ${HERO_SUBTITLE_CLASS} font-light italic whitespace-normal ${
              isLeft
                ? wrapSubtitle
                  ? "left-0 max-w-[min(100%,22rem)] text-left sm:max-w-[24rem] lg:max-w-[26rem]"
                  : "left-0 text-left sm:max-w-[92vw] sm:whitespace-nowrap lg:max-w-none"
                : "left-1/2 max-w-[92vw] -translate-x-1/2 px-2 text-center sm:max-w-none sm:px-0"
            }`}
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

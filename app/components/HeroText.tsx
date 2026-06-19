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
  "the human behind\nthe pixels.",
  "the face behind\nthe Figma file.",
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
  align?: "center" | "left" | "responsive";
  wrapSubtitle?: boolean;
  subtitleContainerClassName?: string;
};

export function HeroText({
  headline = "Welcome to",
  phrases = HOME_HERO_PHRASES,
  align = "center",
  wrapSubtitle = false,
  subtitleContainerClassName,
}: HeroTextProps) {
  const [index, setIndex] = useState(0);
  const isResponsive = align === "responsive";
  const isLeft = align === "left";

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, CYCLE_MS);

    return () => clearInterval(timer);
  }, [phrases.length]);

  const rootClassName = isResponsive
    ? "items-center text-center xl:items-start xl:text-left"
    : isLeft
      ? "items-start text-left"
      : "items-center text-center";

  const subtitleContainerClassNameResolved = isResponsive
    ? "min-h-[4.75rem] sm:min-h-[5.25rem] xl:min-h-0 xl:max-w-[20rem] sm:max-w-[22rem] xl:max-w-[21rem]"
    : wrapSubtitle && isLeft
      ? "max-w-[20rem] sm:max-w-[22rem] lg:max-w-[21rem]"
      : subtitleContainerClassName ?? "min-h-[1.5em]";

  const subtitleClassName = isResponsive
    ? "absolute top-0 left-1/2 max-w-[min(92vw,30rem)] -translate-x-1/2 px-2 text-center sm:max-w-[32rem] sm:px-0 xl:relative xl:left-auto xl:block xl:w-full xl:max-w-none xl:translate-x-0 xl:text-left"
    : wrapSubtitle && isLeft
      ? "relative block w-full text-left"
      : `absolute top-0 ${
          isLeft
            ? "left-0 text-left sm:max-w-[92vw] sm:whitespace-nowrap lg:max-w-none"
            : "left-1/2 max-w-[92vw] -translate-x-1/2 px-2 text-center sm:max-w-none sm:px-0"
        }`;

  return (
    <div className={`flex w-full flex-col overflow-visible ${rootClassName}`}>
      <span className={`${HERO_TEXT_CLASS} font-black text-text-primary`}>
        {headline}
      </span>

      <div
        className={`relative mt-0 w-full overflow-visible pb-3 sm:pb-4 ${subtitleContainerClassNameResolved}`}
      >
        <AnimatePresence
          mode={isResponsive || wrapSubtitle ? "wait" : "sync"}
        >
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={TRANSITION}
            className={`hero-gradient-text ${HERO_SUBTITLE_CLASS} font-light italic whitespace-normal ${subtitleClassName}`}
          >
            {phrases[index].split("\n").map((line, lineIndex, lines) => (
              <span key={`${index}-${lineIndex}`}>
                {line}
                {lineIndex < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

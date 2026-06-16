"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const PHRASES = [
  "my design world.",
  "a pixel-perfect obsession.",
  "the good stuff.",
  "an artboard with no boundaries.",
  "something worth stealing.",
  "a cursor's paradise.",
  "the work. and the chaos behind it.",
  "a designer's train of thought.",
  "grids, gaps & glory.",
  "the part they don't teach in school.",
  "my 3am decisions.",
  "a Figma file you can walk through.",
  "the vibe. and the system behind it.",
  "deliberate design.",
  "the portfolio. not the PDF.",
];

const CYCLE_MS = 2800;
const TRANSITION = { duration: 0.4, ease: "easeInOut" as const };

const HERO_TEXT_CLASS =
  "text-[clamp(1.625rem,6.4vw,4rem)] leading-[1.08] tracking-[-0.05em]";

export function HeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, CYCLE_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-full flex-col items-center overflow-visible text-center">
      <span className={`${HERO_TEXT_CLASS} font-black text-text-primary`}>
        Welcome to
      </span>

      <div className="relative mt-0 min-h-[1.2em] w-full overflow-visible pb-2 md:min-h-[1.15em] md:pb-3">
        <AnimatePresence mode="sync">
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={TRANSITION}
            className={`hero-gradient-text absolute left-1/2 top-0 w-max max-w-[92vw] -translate-x-1/2 px-2 text-center ${HERO_TEXT_CLASS} font-medium italic text-transparent whitespace-normal sm:max-w-none sm:whitespace-nowrap`}
          >
            {PHRASES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

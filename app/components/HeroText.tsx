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

export function HeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, CYCLE_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-start overflow-visible">
      <span className="text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] md:text-[64px]">
        Welcome to
      </span>

      <div className="relative h-[1.2em] overflow-visible">
        <AnimatePresence mode="sync">
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={TRANSITION}
            className="absolute left-0 top-0 whitespace-nowrap text-[36px] font-normal leading-[1.1] tracking-[-0.02em] text-[#3D3D3D] md:text-[64px]"
          >
            {PHRASES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

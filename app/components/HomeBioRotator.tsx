"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const BIO_LINES = [
  "experience designer, based in munich.",
  "i turn messy problems into calm interfaces.",
  "half systems thinker, half pixel nerd.",
  "here for the details you almost miss.",
  "designing like someone will actually use it.",
  "research, visuals, motion — the whole loop.",
  "probably zoomed in on spacing right now.",
  "human-first products. no deck theatre.",
];

const SHOW_DELAY_MS = 4000;
const CYCLE_MS = 3400;
const ENTRANCE = { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };
const ROTATE = { duration: 0.55, ease: "easeInOut" as const };

export function HomeBioRotator() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const cycleTimer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % BIO_LINES.length);
    }, CYCLE_MS);

    return () => window.clearInterval(cycleTimer);
  }, [visible]);

  return (
    <motion.div
      className="relative w-full max-w-[30rem] overflow-hidden"
      initial={false}
      animate={
        visible
          ? { opacity: 1, height: "auto", marginTop: "1.5rem" }
          : { opacity: 0, height: 0, marginTop: 0 }
      }
      transition={ENTRANCE}
      aria-live="polite"
    >
      <div className="relative min-h-[1.45em] w-full pb-1">
        <AnimatePresence mode="sync">
          {visible ? (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={ROTATE}
              className="absolute left-1/2 top-0 w-full -translate-x-1/2 px-2 text-center text-[clamp(0.875rem,2.6vw,1rem)] font-medium leading-relaxed tracking-[-0.01em] text-text-secondary sm:px-0"
            >
              {BIO_LINES[index]}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

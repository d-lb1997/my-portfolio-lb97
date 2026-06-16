"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SHOW_DELAY_MS = 4500;
const ENTRANCE = { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };

export function HomeBioRotator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(showTimer);
  }, []);

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
    >
      <motion.p
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={
          visible
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 10, filter: "blur(6px)" }
        }
        transition={ENTRANCE}
        className="px-2 text-center text-[clamp(0.9375rem,2.6vw,1.0625rem)] font-medium leading-relaxed tracking-[-0.01em] text-text-secondary sm:px-0"
      >
        Hi there, I&apos;m Lukas — experience designer based in Munich.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={
          visible
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 10, filter: "blur(6px)" }
        }
        transition={{ ...ENTRANCE, delay: 0.12 }}
        className="mt-2 px-2 text-center text-[clamp(0.9375rem,2.6vw,1.0625rem)] font-medium leading-relaxed tracking-[-0.01em] text-text-secondary sm:px-0"
      >
        Feel free to look around while you&apos;re here.
      </motion.p>
    </motion.div>
  );
}

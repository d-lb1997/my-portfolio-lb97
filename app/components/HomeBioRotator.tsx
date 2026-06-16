"use client";

import { motion } from "framer-motion";

export function HomeBioRotator() {
  return (
    <div className="mt-8 flex w-full max-w-[30rem] items-center justify-center sm:mt-10">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[28rem] px-2 text-center text-[clamp(0.9375rem,2.6vw,1.0625rem)] font-medium leading-relaxed tracking-[-0.01em] text-text-secondary sm:px-0"
      >
        Hi there, I&apos;m Lukas — experience designer based in Munich.
      </motion.p>
    </div>
  );
}

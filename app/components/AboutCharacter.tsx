"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const ENTRANCE = {
  duration: 0.9,
  delay: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function AboutCharacter() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[40] flex justify-center"
      aria-hidden="true"
    >
      <motion.div
        initial={reduceMotion ? { y: 0, opacity: 1 } : { y: "115%" }}
        animate={{ y: 0, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : ENTRANCE}
      >
        <Image
          src="/images/about/lukas-character.png"
          alt=""
          width={872}
          height={1024}
          priority
          className="h-[clamp(320px,52vh,720px)] w-auto max-w-[min(98vw,820px)] select-none object-contain object-bottom"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

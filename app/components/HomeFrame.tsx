"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HOME_FRAME_HEIGHT,
  HOME_FRAME_WIDTH,
} from "@/lib/pages";
import { HeroText } from "./HeroText";
import { HomeAudio } from "./HomeAudio";
import { HomeCtas } from "./HomeCtas";

export function HomeFrame() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex items-center justify-center overflow-visible"
      style={{ width: HOME_FRAME_WIDTH, minHeight: HOME_FRAME_HEIGHT }}
      aria-label="Home"
    >
      <HomeAudio />
      <div className="flex w-full max-w-[min(92vw,36rem)] flex-col items-center overflow-visible px-4 sm:max-w-none sm:px-10">
        <HeroText />
        <HomeCtas />

        <motion.p
          className="mt-8 max-w-[28rem] text-center text-[clamp(0.75rem,2.8vw,0.875rem)] font-medium leading-relaxed text-text-secondary md:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: showHint ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          drag to navigate · scroll to zoom · use the menu to dive in
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HOME_FRAME_HEIGHT,
  HOME_FRAME_WIDTH,
} from "@/lib/pages";
import { HeroText } from "./HeroText";
import { HomeAudio } from "./HomeAudio";
import { HomeBioRotator } from "./HomeBioRotator";
import { HomeCtas } from "./HomeCtas";

const BIO_SHOW_DELAY_MS = 5000;
const BIO_ENTRANCE = { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };
const HERO_CTA_GAP = "64px";

export function HomeFrame() {
  const [showHint, setShowHint] = useState(true);
  const [bioVisible, setBioVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setBioVisible(true), BIO_SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex items-center justify-center overflow-visible"
      style={{ width: HOME_FRAME_WIDTH, minHeight: HOME_FRAME_HEIGHT }}
      aria-label="Home"
    >
      <HomeAudio />
      <div
        className="flex w-full max-w-[min(92vw,36rem)] flex-col items-center justify-center overflow-visible px-4 sm:max-w-none sm:px-10"
        style={{ minHeight: HOME_FRAME_HEIGHT }}
      >
        <HeroText />
        <HomeBioRotator visible={bioVisible} />
        <motion.div
          className="w-full"
          initial={false}
          animate={{ marginTop: bioVisible ? 0 : HERO_CTA_GAP }}
          transition={BIO_ENTRANCE}
        >
          <HomeCtas />
        </motion.div>
      </div>

      <motion.p
        className="pointer-events-none absolute bottom-8 left-1/2 max-w-[28rem] -translate-x-1/2 px-4 text-center text-[clamp(0.75rem,2.8vw,0.875rem)] font-medium leading-relaxed text-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: showHint ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        drag to navigate · scroll to zoom · use the menu to dive in
      </motion.p>
    </section>
  );
}

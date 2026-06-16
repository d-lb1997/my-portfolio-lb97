"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HOME_FRAME_HEIGHT,
  HOME_FRAME_WIDTH,
} from "@/lib/pages";
import { HeroText } from "./HeroText";

export function HomeFrame() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex items-center justify-center overflow-visible"
      style={{ width: HOME_FRAME_WIDTH, height: HOME_FRAME_HEIGHT }}
      aria-label="Home"
    >
      <div className="flex w-full max-w-[92vw] flex-col items-center overflow-visible px-6 sm:max-w-none sm:px-10">
        <HeroText />

        <motion.p
          className="mt-10 max-w-[28rem] text-center text-[clamp(0.75rem,2.8vw,0.875rem)] font-medium leading-relaxed text-text-secondary md:mt-14"
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

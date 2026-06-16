"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeroText } from "./HeroText";

export function HomeFrame() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex h-[800px] w-[1200px] items-center justify-center overflow-visible"
      aria-label="Home"
    >
      <div className="flex flex-col items-center overflow-visible px-8">
        <HeroText />

        <motion.p
          className="mt-14 text-center text-sm font-medium text-text-secondary md:mt-[3.75rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showHint ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          drag to navigate · scroll to zoom
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HomeFrame() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex h-[800px] w-[1200px] items-center justify-center"
      aria-label="Home"
    >
      <div className="px-8 text-center md:text-left">
        <h1 className="text-[64px] leading-[1.05] tracking-[-0.02em] text-text-primary md:text-[72px]">
          <span className="font-bold">Hey</span>{" "}
          <span className="font-light">there</span>
        </h1>
        <p className="mt-4 text-[22px] leading-snug text-text-primary md:text-[26px]">
          <span className="font-normal">welcome to </span>
          <span className="font-bold">my design world</span>
        </p>

        <motion.p
          className="mt-10 text-sm text-text-secondary"
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

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AmbientCursor } from "./CursorArrow";

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
      <div className="grid w-full max-w-[1000px] grid-cols-1 items-center gap-12 px-8 md:grid-cols-2">
        <div className="text-center md:text-left">
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

        <div className="relative hidden h-[400px] md:block">
          <AmbientCursor
            color="#FF3CAC"
            name="Portfolio Stalker"
            path={{ x: [40, 120, 80, 40], y: [60, 100, 180, 60] }}
            duration={12}
          />
          <AmbientCursor
            color="#2DCC70"
            name="Design Enthusiast"
            path={{ x: [180, 240, 160, 180], y: [220, 280, 320, 220] }}
            duration={14}
            delay={1}
          />
          <AmbientCursor
            color="#3498DB"
            name="Canvas Wanderer"
            path={{ x: [100, 200, 260, 100], y: [140, 80, 200, 140] }}
            duration={16}
            delay={2}
          />
        </div>
      </div>
    </section>
  );
}

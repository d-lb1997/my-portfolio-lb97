"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  CONTACT_FRAME_HEIGHT,
  CONTACT_FRAME_WIDTH,
} from "@/lib/pages";
import { CONTACT_HERO_PHRASES, HeroText } from "./HeroText";
import { ContactChatField } from "./ContactChatField";

const FOCUS_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

export function ContactFrame() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section
      className="relative flex items-center justify-center overflow-visible"
      style={{ width: CONTACT_FRAME_WIDTH, minHeight: CONTACT_FRAME_HEIGHT }}
      aria-label="Contact"
    >
      <motion.div
        layout
        transition={FOCUS_TRANSITION}
        className={`flex w-full max-w-[min(92vw,36rem)] flex-col items-center overflow-visible px-4 sm:max-w-none sm:px-10 ${
          isFocused ? "justify-center" : "justify-start"
        }`}
        style={{ minHeight: isFocused ? CONTACT_FRAME_HEIGHT : undefined }}
      >
        <AnimatePresence initial={false}>
          {!isFocused ? (
            <motion.div
              key="contact-hero"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24, height: 0, marginBottom: 0 }}
              transition={FOCUS_TRANSITION}
              className="w-full overflow-hidden"
            >
              <HeroText headline="Let's" phrases={CONTACT_HERO_PHRASES} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <ContactChatField
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
        />
      </motion.div>
    </section>
  );
}

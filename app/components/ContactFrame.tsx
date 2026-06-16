"use client";

import {
  CONTACT_FRAME_HEIGHT,
  CONTACT_FRAME_WIDTH,
} from "@/lib/pages";
import { CONTACT_HERO_PHRASES, HeroText } from "./HeroText";
import { ContactChatField } from "./ContactChatField";

export function ContactFrame() {
  return (
    <section
      className="relative flex items-center justify-center overflow-visible"
      style={{ width: CONTACT_FRAME_WIDTH, minHeight: CONTACT_FRAME_HEIGHT }}
      aria-label="Contact"
    >
      <div className="flex w-full max-w-[min(92vw,36rem)] flex-col items-center overflow-visible px-4 sm:max-w-none sm:px-10">
        <HeroText headline="Let's" phrases={CONTACT_HERO_PHRASES} />
        <ContactChatField />
      </div>
    </section>
  );
}

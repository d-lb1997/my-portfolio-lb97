"use client";

import { useState } from "react";
import { pickRandomCursor } from "@/lib/cursor-data";
import { CursorArrow } from "./CursorArrow";

const SOCIAL_LINKS = [
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];

export function ContactFrame() {
  const [guestName, setGuestName] = useState("");
  const [droppedCursor, setDroppedCursor] = useState<{
    name: string;
    color: string;
  } | null>(null);

  const handleDropCursor = (event: React.FormEvent) => {
    event.preventDefault();
    const name = guestName.trim() || pickRandomCursor().name;
    const { color } = pickRandomCursor();
    setDroppedCursor({ name, color });
    setGuestName("");
  };

  return (
    <section
      className="relative flex h-[600px] w-[700px] flex-col justify-center rounded-sm bg-surface-white px-12 py-10 shadow-sm"
      aria-label="Contact"
    >
      <h2 className="text-[36px] font-semibold tracking-[-0.02em] text-text-primary">
        Contact
      </h2>

      <p className="mt-6 text-[28px] font-semibold text-text-primary">
        Let&apos;s make something.
      </p>

      <div className="mt-8 space-y-2 text-[17px] text-text-secondary">
        <p>
          <span className="font-medium text-text-primary">Lukas</span>
        </p>
        <p>
          <a
            href="mailto:hello@lukas.design"
            className="text-text-primary underline underline-offset-4 hover:opacity-70"
            data-no-pan
          >
            hello@lukas.design
          </a>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium uppercase tracking-[0.06em] text-text-primary hover:opacity-70"
            data-no-pan
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-10 border-t border-border-subtle pt-8" data-no-pan>
        <p className="text-sm text-text-secondary">
          Drop your cursor here to say hi
        </p>
        <form onSubmit={handleDropCursor} className="mt-3 flex gap-2">
          <input
            type="text"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Your name (optional)"
            className="flex-1 rounded-md border border-border-subtle bg-surface-white px-3 py-2 text-sm text-text-primary outline-none focus:border-text-primary"
          />
          <button
            type="submit"
            className="rounded-md bg-text-primary px-4 py-2 text-sm font-medium text-[var(--button-fg)] cursor-pointer"
          >
            Drop cursor
          </button>
        </form>

        {droppedCursor && (
          <div className="mt-4">
            <CursorArrow
              color={droppedCursor.color}
              name={droppedCursor.name}
            />
          </div>
        )}
      </div>
    </section>
  );
}

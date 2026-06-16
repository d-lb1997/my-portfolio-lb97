"use client";

import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "hello@lukas.design";

export function ContactChatField() {
  const [message, setMessage] = useState("");
  const hasMessage = message.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    const subject = encodeURIComponent("Portfolio message");
    const body = encodeURIComponent(trimmed);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="gemini-chat-field mt-10 w-full max-w-[min(92vw,36rem)] sm:mt-12"
      data-no-pan
    >
      <div className="gemini-chat-inner">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Drop your message here"
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[clamp(0.875rem,2.8vw,1rem)] text-text-primary outline-none placeholder:text-text-secondary/70 sm:px-5 sm:py-4"
          aria-label="Your message"
        />

        <button
          type="submit"
          disabled={!hasMessage}
          className="gemini-chat-submit mr-2 shrink-0 sm:mr-2.5"
          aria-label="Send message"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 19V5M12 5L5 12M12 5L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  buildCursorChatGradient,
  cursorChatGradientStyle,
} from "@/lib/cursor-gradient";
import { useVisitorCursor } from "@/lib/cursor-context";

type SubmitState = "idle" | "sending" | "sent" | "error";

export function ContactChatField() {
  const { color, name } = useVisitorCursor();
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const hasMessage = message.trim().length > 0;

  const gradientStyle = useMemo(
    () => cursorChatGradientStyle(buildCursorChatGradient(color)),
    [color],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || submitState === "sending") return;

    setSubmitState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, visitorName: name }),
      });

      if (!response.ok) {
        setSubmitState("error");
        return;
      }

      setMessage("");
      setSubmitState("sent");
      window.setTimeout(() => setSubmitState("idle"), 2400);
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="mt-16 w-full max-w-[min(92vw,36rem)] sm:mt-20 md:mt-24">
      <form
        onSubmit={handleSubmit}
        className="gemini-chat-field w-full"
        style={gradientStyle}
        data-no-pan
      >
        <div className="gemini-chat-inner">
          <input
            type="text"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              if (submitState === "sent" || submitState === "error") {
                setSubmitState("idle");
              }
            }}
            placeholder="Drop your message here"
            className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[clamp(0.875rem,2.8vw,1rem)] text-text-primary outline-none placeholder:text-text-secondary/70 sm:px-5 sm:py-4"
            aria-label="Your message"
            disabled={submitState === "sending"}
          />

          <button
            type="submit"
            disabled={!hasMessage || submitState === "sending"}
            className="gemini-chat-submit mr-2 shrink-0 sm:mr-2.5"
            style={hasMessage ? gradientStyle : undefined}
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

      <p
        className="mt-3 min-h-[1.25rem] text-center text-[0.8125rem] text-text-secondary"
        aria-live="polite"
      >
        {submitState === "sending" && "Sending..."}
        {submitState === "sent" && "Message sent. Talk soon."}
        {submitState === "error" &&
          "Could not send right now. Please try again in a moment."}
      </p>
    </div>
  );
}

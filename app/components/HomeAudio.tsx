"use client";

import { useEffect, useRef } from "react";

const HOME_AUDIO_SRC = "/audio/sunflower.mp3";
const HOME_AUDIO_VOLUME = 0.32;

const INTERACTION_EVENTS = [
  "pointerdown",
  "touchstart",
  "click",
  "keydown",
  "wheel",
  "scroll",
] as const;

export function HomeAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = HOME_AUDIO_VOLUME;

    let removeInteractionListeners = () => {};

    const tryPlay = async () => {
      if (startedRef.current && !audio.paused) return;

      try {
        await audio.play();
        startedRef.current = true;
        removeInteractionListeners();
      } catch {
        /* Autoplay blocked until the visitor interacts with the page. */
      }
    };

    const onInteraction = () => {
      void tryPlay();
    };

    const addInteractionListeners = () => {
      for (const event of INTERACTION_EVENTS) {
        document.addEventListener(event, onInteraction, {
          capture: true,
          passive: true,
        });
      }
    };

    removeInteractionListeners = () => {
      for (const event of INTERACTION_EVENTS) {
        document.removeEventListener(event, onInteraction, { capture: true });
      }
    };

    const onReady = () => {
      void tryPlay();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void tryPlay();
      }
    };

    addInteractionListeners();
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("loadeddata", onReady);
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void tryPlay();
    }

    return () => {
      removeInteractionListeners();
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("loadeddata", onReady);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      audio.pause();
      audio.currentTime = 0;
      startedRef.current = false;
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={HOME_AUDIO_SRC}
      loop
      preload="auto"
      autoPlay
      playsInline
      aria-label="Sunflower from Spider-Man: Into the Spider-Verse"
      className="hidden"
    />
  );
}

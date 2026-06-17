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

const audioSession = {
  started: false,
  finished: false,
};

export function HomeAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audioSession.finished) return;

    audio.volume = HOME_AUDIO_VOLUME;

    if (!audioSession.started) {
      audio.currentTime = 0;
    }

    let removeInteractionListeners = () => {};

    const tryPlay = async () => {
      if (audioSession.finished || audio.ended) return;
      if (audioSession.started && !audio.paused) return;

      try {
        await audio.play();
        audioSession.started = true;
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
      if (document.visibilityState === "visible" && !audio.ended) {
        void tryPlay();
      }
    };

    const onEnded = () => {
      audioSession.finished = true;
      removeInteractionListeners();
    };

    addInteractionListeners();
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("loadeddata", onReady);
    audio.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void tryPlay();
    }

    return () => {
      removeInteractionListeners();
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("loadeddata", onReady);
      audio.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (audioSession.finished) {
    return null;
  }

  return (
    <audio
      ref={audioRef}
      src={HOME_AUDIO_SRC}
      preload="auto"
      autoPlay
      playsInline
      aria-label="Sunflower from Spider-Man: Into the Spider-Verse"
      className="hidden"
    />
  );
}

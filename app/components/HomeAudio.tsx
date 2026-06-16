"use client";

import { useEffect, useRef } from "react";

const HOME_AUDIO_SRC = "/audio/sunflower.mp4";
const HOME_AUDIO_VOLUME = 0.32;

export function HomeAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = HOME_AUDIO_VOLUME;

    const tryPlay = () => {
      audio.play().catch(() => {
        /* Autoplay blocked until the visitor interacts with the page. */
      });
    };

    const resumeOnInteraction = () => {
      if (audio.paused) {
        tryPlay();
      }
    };

    tryPlay();

    window.addEventListener("pointerdown", resumeOnInteraction);
    window.addEventListener("keydown", resumeOnInteraction);

    return () => {
      window.removeEventListener("pointerdown", resumeOnInteraction);
      window.removeEventListener("keydown", resumeOnInteraction);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={HOME_AUDIO_SRC}
      loop
      preload="auto"
      aria-label="Sunflower from Spider-Man: Into the Spider-Verse"
      className="hidden"
    />
  );
}

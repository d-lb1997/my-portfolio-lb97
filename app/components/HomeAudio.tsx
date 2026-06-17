"use client";

import { useEffect } from "react";

const HOME_AUDIO_VOLUME = 0.32;
const AUDIO_ID = "portfolio-audio";

const INTERACTION_EVENTS = [
  "pointerdown",
  "touchstart",
  "click",
  "keydown",
  "wheel",
  "scroll",
] as const;

type AudioSession = {
  started: boolean;
  finished: boolean;
};

declare global {
  interface Window {
    __portfolioAudioSession?: AudioSession;
    __portfolioAudioCleanup?: () => void;
  }
}

function getSession(): AudioSession {
  if (!window.__portfolioAudioSession) {
    window.__portfolioAudioSession = { started: false, finished: false };
  }

  return window.__portfolioAudioSession;
}

function getAudioElement() {
  return document.getElementById(AUDIO_ID) as HTMLAudioElement | null;
}

async function tryPlay(audio: HTMLAudioElement, session: AudioSession) {
  if (session.finished || audio.ended) return;
  if (session.started && !audio.paused && !audio.muted) return;

  try {
    audio.muted = true;
    await audio.play();
    audio.muted = false;
    audio.volume = HOME_AUDIO_VOLUME;
    session.started = true;
  } catch {
    audio.muted = false;
    audio.volume = HOME_AUDIO_VOLUME;
  }
}

export function bootstrapPortfolioAudio() {
  if (typeof window === "undefined") return;

  window.__portfolioAudioCleanup?.();

  const audio = getAudioElement();
  if (!audio) return;

  const session = getSession();
  if (session.finished) return;

  audio.volume = HOME_AUDIO_VOLUME;

  if (!session.started) {
    if (!audio.paused && audio.currentTime > 0) {
      session.started = true;
    } else if (audio.paused && audio.currentTime < 0.05) {
      audio.currentTime = 0;
    }
  }

  const onInteraction = () => {
    audio.muted = false;
    audio.volume = HOME_AUDIO_VOLUME;
    void tryPlay(audio, session);
  };

  const onReady = () => {
    void tryPlay(audio, session);
  };

  const onEnded = () => {
    session.finished = true;
  };

  for (const event of INTERACTION_EVENTS) {
    document.addEventListener(event, onInteraction, {
      capture: true,
      passive: true,
    });
  }

  audio.addEventListener("canplay", onReady);
  audio.addEventListener("canplaythrough", onReady);
  audio.addEventListener("loadeddata", onReady);
  audio.addEventListener("ended", onEnded);

  void tryPlay(audio, session);

  window.__portfolioAudioCleanup = () => {
    for (const event of INTERACTION_EVENTS) {
      document.removeEventListener(event, onInteraction, { capture: true });
    }

    audio.removeEventListener("canplay", onReady);
    audio.removeEventListener("canplaythrough", onReady);
    audio.removeEventListener("loadeddata", onReady);
    audio.removeEventListener("ended", onEnded);
  };
}

export function HomeAudio() {
  useEffect(() => {
    bootstrapPortfolioAudio();

    return () => {
      window.__portfolioAudioCleanup?.();
      window.__portfolioAudioCleanup = undefined;
    };
  }, []);

  return null;
}

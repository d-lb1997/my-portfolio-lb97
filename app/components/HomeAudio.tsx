"use client";

import { useCallback, useEffect, useRef } from "react";

const HOME_AUDIO_SRC = "/audio/sunflower.mp3";
const HOME_AUDIO_VOLUME = 0.32;
const AUTOPLAY_RETRY_MS = 200;
const AUTOPLAY_RETRY_WINDOW_MS = 5000;

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
  const retryTimerRef = useRef<number | null>(null);
  const retryUntilRef = useRef(0);

  const clearRetryTimer = useCallback(() => {
    if (retryTimerRef.current !== null) {
      window.clearInterval(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);

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
        clearRetryTimer();
        removeInteractionListeners();
      } catch {
        /* Retry while loading; interaction fallback handles autoplay policy blocks. */
      }
    };

    const startRetryWindow = () => {
      retryUntilRef.current = performance.now() + AUTOPLAY_RETRY_WINDOW_MS;
      if (retryTimerRef.current !== null) return;

      retryTimerRef.current = window.setInterval(() => {
        if (performance.now() > retryUntilRef.current) {
          clearRetryTimer();
          return;
        }

        void tryPlay();
      }, AUTOPLAY_RETRY_MS);
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
      startRetryWindow();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && !audio.ended) {
        void tryPlay();
      }
    };

    const onEnded = () => {
      audioSession.finished = true;
      clearRetryTimer();
      removeInteractionListeners();
    };

    const onWindowLoad = () => {
      void tryPlay();
      startRetryWindow();
    };

    addInteractionListeners();
    audio.load();
    audio.addEventListener("loadedmetadata", onReady);
    audio.addEventListener("canplay", onReady);
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("loadeddata", onReady);
    audio.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("load", onWindowLoad);

    void tryPlay();
    startRetryWindow();

    if (document.readyState === "complete") {
      onWindowLoad();
    }

    return () => {
      clearRetryTimer();
      removeInteractionListeners();
      audio.removeEventListener("loadedmetadata", onReady);
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("loadeddata", onReady);
      audio.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("load", onWindowLoad);
    };
  }, [clearRetryTimer]);

  const setAudioNode = useCallback((node: HTMLAudioElement | null) => {
    audioRef.current = node;
    if (!node || audioSession.finished) return;

    node.volume = HOME_AUDIO_VOLUME;
    if (!audioSession.started) {
      node.currentTime = 0;
    }

    void node.play()
      .then(() => {
        audioSession.started = true;
      })
      .catch(() => {
        /* Autoplay may still be blocked until the track is ready or allowed. */
      });
  }, []);

  if (audioSession.finished) {
    return null;
  }

  return (
    <audio
      ref={setAudioNode}
      src={HOME_AUDIO_SRC}
      preload="auto"
      autoPlay
      playsInline
      aria-label="Sunflower from Spider-Man: Into the Spider-Verse"
      className="hidden"
    />
  );
}

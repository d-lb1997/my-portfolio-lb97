"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import {
  fetchCurrentWeather,
  getBrowserLocation,
  isGeolocationAccessError,
  weatherCodeToEmoji,
  type CurrentWeather,
} from "@/lib/weather";

type WidgetState =
  | { status: "loading" }
  | { status: "weather"; data: CurrentWeather }
  | { status: "prompt" };

const ENTRANCE = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function HomeWeatherWidget() {
  const [state, setState] = useState<WidgetState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((value) => value + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const coords = await getBrowserLocation();
        const current = await fetchCurrentWeather(
          coords.latitude,
          coords.longitude,
        );

        if (!cancelled) {
          setState({ status: "weather", data: current });
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        if (
          isGeolocationAccessError(error) ||
          (error instanceof Error && error.message === "Geolocation unavailable")
        ) {
          setState({ status: "prompt" });
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  if (state.status === "loading") {
    return null;
  }

  if (state.status === "prompt") {
    return (
      <motion.button
        type="button"
        className="home-weather-card home-weather-card--prompt pointer-events-auto"
        aria-label="Enable location to see your weather. Tap to try again."
        data-no-pan
        onClick={retry}
        {...ENTRANCE}
      >
        <span className="home-weather-emoji" aria-hidden="true">
          📍
        </span>
        <span className="home-weather-prompt">
          Enable location to see your weather
        </span>
      </motion.button>
    );
  }

  const { data: weather } = state;

  return (
    <motion.div
      className="home-weather-card pointer-events-none select-none"
      aria-label={`Current weather ${weather.temperatureC} degrees Celsius`}
      data-no-pan
      {...ENTRANCE}
    >
      <span className="home-weather-emoji" aria-hidden="true">
        {weatherCodeToEmoji(weather.weatherCode)}
      </span>
      <span className="home-weather-temp">{weather.temperatureC}°C</span>
    </motion.div>
  );
}

export type CurrentWeather = {
  temperatureC: number;
  weatherCode: number;
};

type OpenMeteoCurrentResponse = {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
  };
};

export function weatherCodeToEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 85 && code <= 86) return "❄️";
  if (code >= 95) return "⛈️";
  return "☁️";
}

export async function fetchCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<CurrentWeather> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: "temperature_2m,weather_code",
    timezone: "auto",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Weather request failed");
  }

  const data = (await response.json()) as OpenMeteoCurrentResponse;
  const temperature = data.current?.temperature_2m;
  const weatherCode = data.current?.weather_code;

  if (temperature === undefined || weatherCode === undefined) {
    throw new Error("Weather data unavailable");
  }

  return {
    temperatureC: Math.round(temperature),
    weatherCode,
  };
}

export function isGeolocationAccessError(error: unknown): boolean {
  if (typeof GeolocationPositionError !== "undefined") {
    return error instanceof GeolocationPositionError;
  }

  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as GeolocationPositionError).code === "number"
  );
}

export function getBrowserLocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation unavailable"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error),
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  });
}

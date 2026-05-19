// /src/data/weather.ts

export type WeatherCondition = "Clear" | "Rain" | "Storm" | "Fog" | "Snow";

const weatherConditions: WeatherCondition[] = [
  "Clear",
  "Rain",
  "Storm",
  "Fog",
  "Snow",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getAirportWeather() {
  const condition = randomItem(weatherConditions);

  let delayFactor = 0;

  switch (condition) {
    case "Storm":
    case "Snow":
      delayFactor = 0.6;
      break;
    case "Fog":
      delayFactor = 0.4;
      break;
    case "Rain":
      delayFactor = 0.2;
      break;
    default:
      delayFactor = 0;
  }

  return { condition, delayFactor };
}

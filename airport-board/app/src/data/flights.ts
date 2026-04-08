// /src/data/flights.ts

import { getAirportWeather, WeatherCondition } from "./weather";

export type Flight = {
  id: string;
  flight: string;
  destination: string;
  time: string;
  gate: string;
  status: string;
};

export type FlightResponse = {
  airport: string;
  weather: WeatherCondition;
  flights: Flight[];
};

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTime() {
  const hour = Math.floor(Math.random() * 24)
    .toString()
    .padStart(2, "0");
  const min = Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0");

  return `${hour}:${min}`;
}

function randomGate() {
  const letters = ["A", "B", "C"];
  return `${randomItem(letters)}${Math.floor(Math.random() * 20)}`;
}

function randomFlightCode() {
  const airlines = ["SK", "BA", "LH", "AF", "DL"];
  return `${randomItem(airlines)}${Math.floor(Math.random() * 900 + 100)}`;
}

function randomDestination() {
  return randomItem(["London", "Paris", "Berlin", "New York", "Oslo"]);
}

function generateStatus(delayFactor: number): string {
  const rand = Math.random();

  if (rand < delayFactor) return "Delayed";
  if (rand < 0.7) return "On Time";
  if (rand < 0.85) return "Boarding";
  return "Cancelled";
}

export function generateFlights(airportCode: string): FlightResponse {
  const { condition, delayFactor } = getAirportWeather();

  const flights: Flight[] = Array.from({ length: 8 }).map((_, i) => {
    const status = generateStatus(delayFactor);

    return {
      id: `${airportCode}-${i}`,
      flight: randomFlightCode(),
      destination: randomDestination(),
      time: randomTime(),
      gate: randomGate(),
      status:
        status === "Delayed" && condition !== "Clear"
          ? `${status} (${condition})`
          : status,
    };
  });

  return {
    airport: airportCode,
    weather: condition,
    flights,
  };
}

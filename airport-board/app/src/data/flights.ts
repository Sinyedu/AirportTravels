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

export function generateFlights(airportCode: string): FlightResponse {
  const { condition, delayFactor } = getAirportWeather();

  const now = new Date();

  const flights: Flight[] = Array.from({ length: 25 }).map((_, i) => {
    const offsetMinutes = Math.floor(Math.random() * 180) - 60;
    const flightTime = new Date(now.getTime() + offsetMinutes * 60000);

    const hours = flightTime.getHours().toString().padStart(2, "0");
    const minutes = flightTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    const diff = Math.floor((flightTime.getTime() - now.getTime()) / 60000);

    let status = "";
    //TODO: Create a map
    if (diff === -1) status = "Arriving";
    if (diff > 60) status = "Scheduled";
    else if (diff > 30) status = "Check-in";
    else if (diff > 15) status = "Boarding";
    else if (diff > 5) status = "Final Call";
    else if (diff > 0) status = "Gate Closing";
    else status = "Departed";

    if (Math.random() < delayFactor && diff > 0) {
      status = `Delayed (${condition})`;
    }

    return {
      id: `${airportCode}-${i}`,
      flight: randomFlightCode(),
      destination: randomDestination(),
      time: formattedTime,
      gate: randomGate(),
      status,
    };
  });

  return {
    airport: airportCode,
    weather: condition,
    flights,
  };
}

import {
  getAirportWeather,
  type WeatherCondition,
} from "@/entities/weather/weather";
import { airports as airportCountries } from "@/entities/airport/airports";

export type FlightStatus =
  | "Arriving"
  | "Arrived"
  | "Approaching"
  | "Scheduled"
  | "Check-in"
  | "Boarding"
  | "Final Call"
  | "Gate Closing"
  | "Departed"
  | "On Time"
  | "Delayed"
  | `Delayed (${WeatherCondition})`
  | "";

export type FlightDirection = "arrival" | "departure";

export type Flight = {
  id: string;
  flight: string;
  airline: string;
  aircraft: string;
  direction: FlightDirection;
  originCode: string;
  origin: string;
  destinationCode: string;
  destination: string;
  time: string;
  gate: string;
  status: FlightStatus;
};

export type FlightResponse = {
  airport: string;
  weather: WeatherCondition;
  flights: Flight[];
};

export type GenerateFlightsOptions = {
  count?: number;
  directions?: FlightDirection[];
  now?: Date;
  seed?: string;
};

type AirportNode = {
  code: string;
  name: string;
  country: string;
};

type AirlineProfile = {
  code: string;
  name: string;
  weight: number;
  aircraft: string[];
};

const airportNodes: AirportNode[] = airportCountries.flatMap((country) => {
  return country.cities.map((airport) => {
    return {
      code: airport.code,
      name: airport.name,
      country: country.country,
    };
  });
});

const airportRoutes = new Map<string, string[]>([
  [
    "CPH",
    [
      "BLL",
      "AAL",
      "OSL",
      "BGO",
      "TRD",
      "LHR",
      "LGW",
      "MAN",
      "FRA",
      "BER",
      "MUC",
      "HAM",
      "CDG",
      "NCE",
      "JFK",
    ],
  ],
  ["BLL", ["CPH", "AAL", "OSL", "LHR", "LGW", "MAN", "FRA", "MUC", "CDG"]],
  ["AAL", ["CPH", "BLL", "OSL", "BGO", "LHR", "FRA", "BER"]],
  ["LHR", ["CPH", "EDI", "MAN", "FRA", "MUC", "CDG", "JFK", "LAX", "ORD"]],
  ["LGW", ["CPH", "EDI", "MAN", "BER", "NCE", "JFK"]],
  ["MAN", ["CPH", "LHR", "LGW", "EDI", "FRA", "CDG", "JFK"]],
  ["EDI", ["CPH", "LHR", "LGW", "MAN", "OSL", "CDG"]],
  ["FRA", ["CPH", "LHR", "MAN", "BER", "MUC", "HAM", "CDG", "JFK", "ORD"]],
  ["BER", ["CPH", "LHR", "FRA", "MUC", "HAM", "CDG", "NCE"]],
  ["MUC", ["CPH", "LHR", "FRA", "BER", "HAM", "CDG", "JFK"]],
  ["HAM", ["CPH", "FRA", "BER", "MUC", "OSL", "CDG"]],
  ["CDG", ["CPH", "LHR", "MAN", "FRA", "BER", "MUC", "NCE", "LYS", "JFK"]],
  ["NCE", ["CPH", "LHR", "LGW", "CDG", "LYS", "FRA", "MUC"]],
  ["LYS", ["CDG", "NCE", "LHR", "FRA", "MUC", "CPH"]],
  ["JFK", ["CPH", "LHR", "LGW", "MAN", "FRA", "CDG", "LAX", "ORD"]],
  ["LAX", ["LHR", "FRA", "CDG", "JFK", "ORD", "CPH"]],
  ["ORD", ["LHR", "FRA", "CDG", "JFK", "LAX"]],
  ["OSL", ["CPH", "BLL", "AAL", "BGO", "TRD", "LHR", "FRA", "CDG"]],
  ["BGO", ["CPH", "OSL", "TRD", "LHR", "FRA"]],
  ["TRD", ["CPH", "OSL", "BGO", "LHR", "FRA"]],
]);

const countryAirlines = new Map<string, AirlineProfile[]>([
  [
    "Denmark",
    [
      { code: "SK", name: "SAS", weight: 42, aircraft: ["A320neo", "A321neo", "CRJ900"] },
      { code: "D8", name: "Norwegian Air Sweden", weight: 18, aircraft: ["B738", "B38M"] },
      { code: "DY", name: "Norwegian", weight: 12, aircraft: ["B738", "B38M"] },
      { code: "KL", name: "KLM", weight: 7, aircraft: ["E190", "E195"] },
      { code: "LH", name: "Lufthansa", weight: 7, aircraft: ["A320", "A321"] },
      { code: "BA", name: "British Airways", weight: 5, aircraft: ["A320", "A321"] },
      { code: "AF", name: "Air France", weight: 4, aircraft: ["A220", "A320"] },
      { code: "EK", name: "Emirates", weight: 1, aircraft: ["B77W", "A388"] },
    ],
  ],
  [
    "United Kingdom",
    [
      { code: "BA", name: "British Airways", weight: 34, aircraft: ["A320", "A321", "B788"] },
      { code: "U2", name: "easyJet", weight: 18, aircraft: ["A320", "A321neo"] },
      { code: "FR", name: "Ryanair", weight: 14, aircraft: ["B738", "B38M"] },
      { code: "VS", name: "Virgin Atlantic", weight: 8, aircraft: ["A339", "B789"] },
      { code: "SK", name: "SAS", weight: 6, aircraft: ["A320neo", "CRJ900"] },
      { code: "LH", name: "Lufthansa", weight: 6, aircraft: ["A320", "A321"] },
    ],
  ],
  [
    "Germany",
    [
      { code: "LH", name: "Lufthansa", weight: 38, aircraft: ["A320", "A321", "A359"] },
      { code: "EW", name: "Eurowings", weight: 18, aircraft: ["A319", "A320"] },
      { code: "DE", name: "Condor", weight: 9, aircraft: ["A320", "A339"] },
      { code: "SK", name: "SAS", weight: 7, aircraft: ["A320neo", "CRJ900"] },
      { code: "BA", name: "British Airways", weight: 6, aircraft: ["A320", "A321"] },
      { code: "AF", name: "Air France", weight: 6, aircraft: ["A220", "A320"] },
    ],
  ],
  [
    "France",
    [
      { code: "AF", name: "Air France", weight: 38, aircraft: ["A220", "A320", "B789"] },
      { code: "TO", name: "Transavia France", weight: 14, aircraft: ["B738"] },
      { code: "U2", name: "easyJet", weight: 12, aircraft: ["A320", "A321neo"] },
      { code: "SK", name: "SAS", weight: 7, aircraft: ["A320neo", "CRJ900"] },
      { code: "BA", name: "British Airways", weight: 6, aircraft: ["A320", "A321"] },
      { code: "LH", name: "Lufthansa", weight: 6, aircraft: ["A320", "A321"] },
    ],
  ],
  [
    "USA",
    [
      { code: "DL", name: "Delta Air Lines", weight: 26, aircraft: ["A220", "A321", "B763"] },
      { code: "AA", name: "American Airlines", weight: 24, aircraft: ["A321", "B738", "B789"] },
      { code: "UA", name: "United Airlines", weight: 22, aircraft: ["B739", "B789", "B772"] },
      { code: "B6", name: "JetBlue", weight: 8, aircraft: ["A320", "A321"] },
      { code: "BA", name: "British Airways", weight: 5, aircraft: ["B772", "A388"] },
      { code: "SK", name: "SAS", weight: 4, aircraft: ["A359", "A333"] },
    ],
  ],
  [
    "Norway",
    [
      { code: "DY", name: "Norwegian", weight: 34, aircraft: ["B738", "B38M"] },
      { code: "SK", name: "SAS", weight: 30, aircraft: ["A320neo", "A321neo", "CRJ900"] },
      { code: "WF", name: "Wideroe", weight: 18, aircraft: ["DH8D", "E190-E2"] },
      { code: "D8", name: "Norwegian Air Sweden", weight: 6, aircraft: ["B738", "B38M"] },
      { code: "LH", name: "Lufthansa", weight: 5, aircraft: ["A320", "A321"] },
      { code: "BA", name: "British Airways", weight: 4, aircraft: ["A320", "A321"] },
    ],
  ],
]);

const defaultAirlines: AirlineProfile[] = [
  { code: "SK", name: "SAS", weight: 18, aircraft: ["A320neo", "CRJ900"] },
  { code: "LH", name: "Lufthansa", weight: 16, aircraft: ["A320", "A321"] },
  { code: "BA", name: "British Airways", weight: 14, aircraft: ["A320", "A321"] },
  { code: "AF", name: "Air France", weight: 14, aircraft: ["A220", "A320"] },
  { code: "KL", name: "KLM", weight: 12, aircraft: ["E190", "E195"] },
];

function formatAirport(airport: AirportNode) {
  return `${airport.name} (${airport.code})`;
}

function findAirport(code: string) {
  return airportNodes.find((airport) => airport.code === code.toUpperCase());
}

function getRoutesForAirport(airport: AirportNode) {
  const configuredRoutes = airportRoutes.get(airport.code);

  if (configuredRoutes) {
    return configuredRoutes
      .map((code) => findAirport(code))
      .filter((route): route is AirportNode => Boolean(route));
  }

  return airportNodes.filter((route) => route.code !== airport.code).slice(0, 8);
}

function hashString(value: string) {
  return value.split("").reduce((hash, char) => {
    return Math.imul(31, hash) + char.charCodeAt(0) | 0;
  }, 0);
}

function createSeededRandom(seed: string) {
  let state = hashString(seed);

  return () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function randomItem<T>(arr: T[], random: () => number): T {
  return arr[Math.floor(random() * arr.length)];
}

function weightedItem<T extends { weight: number }>(arr: T[], random: () => number): T {
  const totalWeight = arr.reduce((total, item) => total + item.weight, 0);
  let cursor = random() * totalWeight;

  for (const item of arr) {
    cursor -= item.weight;

    if (cursor <= 0) {
      return item;
    }
  }

  return arr[arr.length - 1];
}

function randomGate(random: () => number) {
  const letters = ["A", "B", "C"];
  return `${randomItem(letters, random)}${Math.floor(random() * 20)}`;
}

function randomFlightCode(airlineCode: string, random: () => number) {
  return `${airlineCode}${Math.floor(random() * 900 + 100)}`;
}

function getStatus(direction: FlightDirection, diffMinutes: number): FlightStatus {
  if (direction === "arrival") {
    if (diffMinutes < -10) return "Arrived";
    if (diffMinutes <= 15) return "Arriving";
    if (diffMinutes <= 35) return "Approaching";
    return "Scheduled";
  }

  if (diffMinutes < -10) return "Departed";
  if (diffMinutes <= 0) return "Gate Closing";
  if (diffMinutes <= 10) return "Final Call";
  if (diffMinutes <= 25) return "Boarding";
  if (diffMinutes <= 50) return "Check-in";
  return "Scheduled";
}

export function generateFlights(
  airportCode: string,
  options: GenerateFlightsOptions = {},
): FlightResponse {
  const airport = findAirport(airportCode) ?? {
    code: airportCode.toUpperCase(),
    name: airportCode.toUpperCase(),
    country: "",
  };
  const { condition, delayFactor } = getAirportWeather();
  const now = options.now ?? new Date();
  const routes = getRoutesForAirport(airport);
  const airlines = countryAirlines.get(airport.country) ?? defaultAirlines;
  const directions = options.directions ?? ["arrival", "departure"];
  const seed = options.seed ?? `${airport.code}-${now.toISOString().slice(0, 13)}`;
  const random = createSeededRandom(seed);

  const flights: Flight[] = Array.from({ length: options.count ?? 25 }).map((_, i) => {
    const direction = randomItem(directions, random);
    const connectedAirport = randomItem(routes, random);
    const airline = weightedItem(airlines, random);
    const offsetMinutes = Math.floor(random() * 240) - 70;
    const flightTime = new Date(now.getTime() + offsetMinutes * 60000);

    const hours = flightTime.getHours().toString().padStart(2, "0");
    const minutes = flightTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    const diff = Math.floor((flightTime.getTime() - now.getTime()) / 60000);

    let status = getStatus(direction, diff);

    if (random() < delayFactor && diff > 0) {
      status = `Delayed (${condition})`;
    }

    const origin = direction === "arrival" ? connectedAirport : airport;
    const destination = direction === "arrival" ? airport : connectedAirport;

    return {
      id: `${airport.code}-${i}`,
      flight: randomFlightCode(airline.code, random),
      airline: airline.name,
      aircraft: randomItem(airline.aircraft, random),
      direction,
      originCode: origin.code,
      origin: formatAirport(origin),
      destinationCode: destination.code,
      destination: formatAirport(destination),
      time: formattedTime,
      gate: randomGate(random),
      status,
    };
  });

  return {
    airport: airport.code,
    weather: condition,
    flights,
  };
}

import { airports as airportCountries } from "@/entities/airport/airports";

export type AirportRecord = {
  code: string;
  name: string;
  country: string;
  city: string;
  runways: number;
  terminals: number;
};

const airportDetails = new Map<string, Pick<AirportRecord, "runways" | "terminals">>([
  ["CPH", { runways: 3, terminals: 2 }],
  ["BLL", { runways: 1, terminals: 1 }],
  ["AAL", { runways: 1, terminals: 1 }],
  ["LHR", { runways: 2, terminals: 4 }],
  ["LGW", { runways: 1, terminals: 2 }],
  ["MAN", { runways: 2, terminals: 3 }],
  ["EDI", { runways: 1, terminals: 1 }],
  ["FRA", { runways: 4, terminals: 2 }],
  ["BER", { runways: 2, terminals: 2 }],
  ["MUC", { runways: 2, terminals: 2 }],
  ["HAM", { runways: 2, terminals: 2 }],
  ["CDG", { runways: 4, terminals: 3 }],
  ["NCE", { runways: 2, terminals: 2 }],
  ["LYS", { runways: 2, terminals: 2 }],
  ["JFK", { runways: 4, terminals: 5 }],
  ["LAX", { runways: 4, terminals: 9 }],
  ["ORD", { runways: 8, terminals: 4 }],
  ["OSL", { runways: 2, terminals: 1 }],
  ["BGO", { runways: 1, terminals: 1 }],
  ["TRD", { runways: 1, terminals: 1 }]
]);

export const airports: AirportRecord[] = airportCountries.flatMap((country) => {
  return country.cities.map((airport) => {
    const details = airportDetails.get(airport.code) ?? {
      runways: 1,
      terminals: 1
    };

    return {
      code: airport.code,
      name: airport.name,
      city: airport.name,
      country: country.country,
      ...details
    };
  });
});

export function getAirportByCode(code: string) {
  return airports.find((airport) => airport.code === code.toUpperCase());
}

export function getAirportOptions() {
  return airports;
}

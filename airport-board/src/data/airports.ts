import { airports as airportCountries } from "@/entities/airport/airports";

export type AirportRecord = {
  code: string;
  name: string;
  country: string;
  city: string;
  runways: number;
  terminals: number;
  latitude: number;
  longitude: number;
};

const airportDetails = new Map<
  string,
  Pick<AirportRecord, "runways" | "terminals" | "latitude" | "longitude">
>([
  ["CPH", { runways: 3, terminals: 2, latitude: 55.6181, longitude: 12.6561 }],
  ["BLL", { runways: 1, terminals: 1, latitude: 55.7403, longitude: 9.1518 }],
  ["AAL", { runways: 1, terminals: 1, latitude: 57.0928, longitude: 9.8492 }],
  ["LHR", { runways: 2, terminals: 4, latitude: 51.47, longitude: -0.4543 }],
  ["LGW", { runways: 1, terminals: 2, latitude: 51.1537, longitude: -0.1821 }],
  ["MAN", { runways: 2, terminals: 3, latitude: 53.365, longitude: -2.2728 }],
  ["EDI", { runways: 1, terminals: 1, latitude: 55.95, longitude: -3.3725 }],
  ["FRA", { runways: 4, terminals: 2, latitude: 50.0379, longitude: 8.5622 }],
  ["BER", { runways: 2, terminals: 2, latitude: 52.3667, longitude: 13.5033 }],
  ["MUC", { runways: 2, terminals: 2, latitude: 48.3538, longitude: 11.7861 }],
  ["HAM", { runways: 2, terminals: 2, latitude: 53.6304, longitude: 9.9882 }],
  ["CDG", { runways: 4, terminals: 3, latitude: 49.0097, longitude: 2.5479 }],
  ["NCE", { runways: 2, terminals: 2, latitude: 43.6653, longitude: 7.215 }],
  ["LYS", { runways: 2, terminals: 2, latitude: 45.7256, longitude: 5.0811 }],
  ["JFK", { runways: 4, terminals: 5, latitude: 40.6413, longitude: -73.7781 }],
  ["LAX", { runways: 4, terminals: 9, latitude: 33.9416, longitude: -118.4085 }],
  ["ORD", { runways: 8, terminals: 4, latitude: 41.9742, longitude: -87.9073 }],
  ["AMS", { runways: 6, terminals: 1, latitude: 52.3105, longitude: 4.7683 }],
  ["OSL", { runways: 2, terminals: 1, latitude: 60.1976, longitude: 11.1004 }],
  ["BGO", { runways: 1, terminals: 1, latitude: 60.2934, longitude: 5.2181 }],
  ["TRD", { runways: 1, terminals: 1, latitude: 63.4578, longitude: 10.924 }]
]);

export const airports: AirportRecord[] = airportCountries.flatMap((country) => {
  return country.cities.map((airport) => {
    const details = airportDetails.get(airport.code) ?? {
      runways: 1,
      terminals: 1,
      latitude: 0,
      longitude: 0
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

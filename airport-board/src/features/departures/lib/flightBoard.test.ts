import type { Flight } from "@/entities/flight/flights";
import {
  filterFlights,
  paginateFlights,
  sortFlights,
} from "./flightBoard";

const flights: Flight[] = [
  {
    id: "1",
    flight: "SK123",
    destination: "London",
    time: "12:00",
    gate: "A1",
    status: "On Time",
  },
  {
    id: "2",
    flight: "BA456",
    destination: "Paris",
    time: "10:30",
    gate: "B2",
    status: "Delayed",
  },
  {
    id: "3",
    flight: "LH789",
    destination: "Berlin",
    time: "11:00",
    gate: "C3",
    status: "Final Call",
  },
  {
    id: "4",
    flight: "AF321",
    destination: "Rome",
    time: "09:55",
    gate: "D4",
    status: "Boarding",
  },
];

describe("flight board utilities", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 0, 1, 10, 0, 0));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("paginates flights without mutating the source list", () => {
    expect(paginateFlights(flights, 0, 2).map((flight) => flight.id)).toEqual([
      "1",
      "2",
    ]);
    expect(paginateFlights(flights, 1, 2).map((flight) => flight.id)).toEqual([
      "3",
      "4",
    ]);
    expect(flights.map((flight) => flight.id)).toEqual(["1", "2", "3", "4"]);
  });

  it("filters delayed and boarding states independently", () => {
    const visibleFlights = filterFlights(flights, {
      showDelayed: false,
      showBoarding: false,
    });

    expect(visibleFlights.map((flight) => flight.status)).toEqual(["On Time"]);
  });

  it("sorts flights by a regular field", () => {
    const sortedFlights = sortFlights(flights, "destination", "asc");

    expect(sortedFlights.map((flight) => flight.destination)).toEqual([
      "Berlin",
      "London",
      "Paris",
      "Rome",
    ]);
    expect(flights[0].destination).toBe("London");
  });

  it("sorts flights by countdown with departed flights first", () => {
    const sortedFlights = sortFlights(flights, "countdown", "asc");

    expect(sortedFlights.map((flight) => flight.id)).toEqual([
      "4",
      "2",
      "3",
      "1",
    ]);
  });
});

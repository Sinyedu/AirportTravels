import type { Flight } from "@/entities/flight/flights";
import { getCountdown } from "./countdown";

export type SortField = keyof Flight | "countdown";
export type SortOrder = "asc" | "desc";

export type FlightFilters = {
  showDelayed: boolean;
  showBoarding: boolean;
};

export const flightsPerPage = 5;

export function paginateFlights(
  flights: Flight[],
  page: number,
  pageSize = flightsPerPage,
) {
  return flights.slice(page * pageSize, page * pageSize + pageSize);
}

export function sortFlights(
  flights: Flight[],
  sortField: SortField | null,
  sortOrder: SortOrder,
) {
  if (!sortField) return [...flights];

  return [...flights].sort((a, b) => {
    const valA = getSortValue(a, sortField);
    const valB = getSortValue(b, sortField);

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}

export function filterFlights(flights: Flight[], filters: FlightFilters) {
  return flights.filter((flight) => {
    if (!filters.showDelayed && flight.status.includes("Delayed")) {
      return false;
    }

    if (
      !filters.showBoarding &&
      (flight.status.includes("Boarding") ||
        flight.status.includes("Final Call"))
    ) {
      return false;
    }

    return true;
  });
}

function getSortValue(flight: Flight, sortField: SortField): string | number {
  if (sortField === "countdown") {
    const countdown = getCountdown(flight.time);
    return countdown === "Departed" ? -1 : Number.parseInt(countdown, 10);
  }

  return flight[sortField];
}

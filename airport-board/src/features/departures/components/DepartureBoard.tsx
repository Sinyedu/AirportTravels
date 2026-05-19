"use client";

import { AirportSelector } from "@/features/departures/components/AirportSelector";
import FlightFilters from "@/features/departures/components/FlightFilters";
import { FlightTable } from "@/features/departures/components/FlightTable";
import { SortControls } from "@/features/departures/components/SortControls";
import { useDepartureBoard } from "@/features/departures/hooks/useDepartureBoard";
import { getCountdown } from "@/features/departures/lib/countdown";
import {
  getStatusColor,
  getStatusIcon,
} from "@/features/departures/lib/status";

type DepartureBoardProps = {
  headingLevel?: "h1" | "h2";
};

export function DepartureBoard({ headingLevel = "h1" }: DepartureBoardProps) {
  const board = useDepartureBoard();
  const Heading = headingLevel;

  return (
    <section aria-labelledby="departure-board-title">
      <Heading
        id="departure-board-title"
        className="mb-6 text-2xl font-semibold tracking-normal text-slate-950 md:text-3xl"
      >
        Airport Departure Board
      </Heading>

      <AirportSelector
        selectedCountry={board.selectedCountry}
        onSelectCountry={board.selectCountry}
        selectedCity={board.selectedCity}
        onSelectCity={board.selectCity}
      />

      {board.weather && (
        <div className="mb-5 inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-900">
          Weather: <span className="ml-1 font-semibold">{board.weather}</span>
        </div>
      )}

      {board.selectedCity && board.paginatedFlights.length > 0 && (
        <div className="mb-5 flex flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
          <FlightFilters
            showDelayed={board.showDelayed}
            setShowDelayed={board.setShowDelayed}
            showBoarding={board.showBoarding}
            setShowBoarding={board.setShowBoarding}
          />

          <SortControls
            sortField={board.sortField}
            setSortField={board.setSortField}
            sortOrder={board.sortOrder}
            setSortOrder={board.setSortOrder}
          />
        </div>
      )}

      {board.selectedCity && board.visibleFlights.length > 0 && (
        <>
          <h3 className="mb-4 text-lg font-semibold text-slate-950">
            Departures: {board.selectedCity} ({board.selectedCode})
          </h3>

          <FlightTable
            flights={board.visibleFlights}
            getCountdown={getCountdown}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />

          <div className="mt-5 flex w-full max-w-sm items-center justify-between gap-3">
            <button
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={board.page === 0 || board.totalPages <= 1}
              onClick={() => board.setPage((page) => page - 1)}
            >
              Previous
            </button>

            <span className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Page {board.page + 1} of {board.totalPages}
            </span>

            <button
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={
                board.page + 1 >= board.totalPages || board.totalPages <= 1
              }
              onClick={() => board.setPage((page) => page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {board.selectedCity && board.flights.length === 0 && (
        <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          No flights found for selected city
        </p>
      )}
    </section>
  );
}

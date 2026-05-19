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

export function DepartureBoard() {
  const board = useDepartureBoard();

  return (
    <section aria-labelledby="departure-board-title">
      <h1 id="departure-board-title" className="text-3xl mb-8">
        Airport Departure Board
      </h1>

      <AirportSelector
        selectedCountry={board.selectedCountry}
        onSelectCountry={board.selectCountry}
        selectedCity={board.selectedCity}
        onSelectCity={board.selectCity}
      />

      {board.weather && (
        <div className="mb-4 text-lg">
          Weather: <span className="font-bold">{board.weather}</span>
        </div>
      )}

      {board.selectedCity && board.paginatedFlights.length > 0 && (
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
          <h2 className="text-xl mb-4">
            Departures: {board.selectedCity} ({board.selectedCode})
          </h2>

          <FlightTable
            flights={board.visibleFlights}
            getCountdown={getCountdown}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />

          <div className="flex justify-between mt-4 w-64">
            <button
              className="px-3 py-1 border border-yellow-400 text-yellow-400 disabled:opacity-40"
              disabled={board.page === 0 || board.totalPages <= 1}
              onClick={() => board.setPage((page) => page - 1)}
            >
              Previous
            </button>

            <span className="text-yellow-400 text-xs text-center flex justify-center p-5">
              Page {board.page + 1} of {board.totalPages}
            </span>

            <button
              className="px-3 py-1 border border-yellow-400 text-yellow-400 disabled:opacity-40"
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
        <p className="text-yellow-400 mt-4">
          No flights found for selected city
        </p>
      )}
    </section>
  );
}

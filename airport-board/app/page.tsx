"use client";

import { useState, useEffect, useMemo } from "react";
import { airports } from "../app/src/data/airports";
import { generateFlights, Flight } from "../app/src/data/flights";

import { AirportSelector } from "../app/src/components/ui/AirportSelector";
import Filters from "../app/src/components/ui/Filters";
import { SortControls } from "../app/src/components/ui/SortControls";
import { FlightTable } from "../app/src/components/layout/FlightTable";
import { getCountdown } from "../app/src/utils/countdown";
import { getStatusColor, getStatusIcon } from "../app/src/utils/status";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [weather, setWeather] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const flightsPerPage = 5;

  const [sortField, setSortField] = useState<keyof Flight | "countdown" | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showDelayed, setShowDelayed] = useState(true);
  const [showBoarding, setShowBoarding] = useState(true);

  const countryData = airports.find((c) => c.country === selectedCountry);

  useEffect(() => {
    if (!selectedCode) return;

    const updateFlights = () => {
      const data = generateFlights(selectedCode);
      setFlights(data.flights);
      setWeather(data.weather);
      setPage(0);
    };

    updateFlights();
    const interval = setInterval(updateFlights, 60_000);
    return () => clearInterval(interval);
  }, [selectedCode]);

  const totalPages = Math.ceil(flights.length / flightsPerPage);

  const paginatedFlights = useMemo(
    () =>
      flights.slice(
        page * flightsPerPage,
        page * flightsPerPage + flightsPerPage,
      ),
    [flights, page],
  );

  const sortedFlights = useMemo(() => {
    if (!sortField) return [...paginatedFlights];

    return [...paginatedFlights].sort((a, b) => {
      const valA: string | number =
        sortField === "countdown"
          ? parseInt(getCountdown(a.time))
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (a[sortField] as any);
      const valB: string | number =
        sortField === "countdown"
          ? parseInt(getCountdown(b.time))
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (b[sortField] as any);

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [paginatedFlights, sortField, sortOrder]);

  const filteredFlights = useMemo(() => {
    return sortedFlights.filter((f) => {
      if (!showDelayed && f.status.includes("Delayed")) return false;
      if (
        !showBoarding &&
        (f.status.includes("Boarding") || f.status.includes("Final Call"))
      )
        return false;
      return true;
    });
  }, [sortedFlights, showDelayed, showBoarding]);

  return (
    <main className="min-h-screen bg-black text-yellow-400 font-mono p-10">
      <h1 className="text-3xl mb-8">Airport Departure Board</h1>

      <AirportSelector
        selectedCountry={selectedCountry}
        onSelectCountry={(c) => {
          setSelectedCountry(c);
          setSelectedCity(null);
          setSelectedCode(null);
          setFlights([]);
          setWeather(null);
        }}
        selectedCity={selectedCity}
        onSelectCity={(cityName) => {
          setSelectedCity(cityName);
          const city = countryData?.cities.find((c) => c.name === cityName);
          setSelectedCode(city?.code || null);
        }}
      />

      {weather && (
        <div className="mb-4 text-lg">
          Weather: <span className="font-bold">{weather}</span>
        </div>
      )}

      {selectedCity && paginatedFlights.length > 0 && (
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Filters
            showDelayed={showDelayed}
            setShowDelayed={setShowDelayed}
            showBoarding={showBoarding}
            setShowBoarding={setShowBoarding}
          />

          <SortControls
            sortField={sortField}
            setSortField={setSortField}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
      )}

      {selectedCity && filteredFlights.length > 0 && (
        <>
          <h2 className="text-xl mb-4">
            Departures: {selectedCity} ({selectedCode})
          </h2>

          <FlightTable
            flights={filteredFlights}
            getCountdown={getCountdown}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />

          <div className="flex justify-between mt-4 w-64">
            <button
              className="px-3 py-1 border border-yellow-400 text-yellow-400"
              disabled={page === 0 || totalPages <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>

            <span className="text-yellow-400 text-xs text-center flex justify-center p-5">
              Page {page + 1} of {totalPages}
            </span>

            <button
              className="px-3 py-1 border border-yellow-400 text-yellow-400"
              disabled={page + 1 >= totalPages || totalPages <= 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedCity && flights.length === 0 && (
        <p className="text-yellow-400 mt-4">No flights available.</p>
      )}
    </main>
  );
}

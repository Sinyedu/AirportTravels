"use client";

import { useState, useEffect, useMemo } from "react";
import { airports } from "./src/data/airports";
import { generateFlights, Flight } from "./src/data/flights";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [weather, setWeather] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const flightsPerPage = 5;

  const countryData = airports.find((c) => c.country === selectedCountry);

  useEffect(() => {
    if (!selectedCode) return;

    const data = generateFlights(selectedCode);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlights(data.flights);
    setWeather(data.weather);
    setPage(0);
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

  function getStatusColor(status: string) {
    if (status.includes("Delayed")) return "text-red-400";
    if (status.includes("Boarding") || status.includes("Final Call"))
      return "text-green-400";
    if (status.includes("Cancelled")) return "text-gray-400";
    return "text-yellow-400";
  }

  return (
    <main className="min-h-screen bg-black text-yellow-400 font-mono p-10">
      <h1 className="text-3xl mb-8">Airport Departure Board</h1>

      <div className="mb-6">
        <label htmlFor="country-select" className="block mb-2">
          Select Country
        </label>
        <select
          id="country-select"
          className="bg-black border border-yellow-400 p-2 w-64"
          onChange={(e) => {
            setSelectedCountry(e.target.value || null);
            setSelectedCity(null);
            setSelectedCode(null);
            setFlights([]);
            setWeather(null);
          }}
        >
          <option value="">-- Choose --</option>
          {airports.map((c) => (
            <option key={c.country} value={c.country}>
              {c.country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div className="mb-6">
          <label htmlFor="airport-select" className="block mb-2">
            Select Airport
          </label>
          <select
            id="airport-select"
            className="bg-black border border-yellow-400 p-2 w-64"
            onChange={(e) => {
              const cityName = e.target.value;
              setSelectedCity(cityName || null);

              const city = countryData?.cities.find((c) => c.name === cityName);
              setSelectedCode(city?.code || null);
            }}
          >
            <option value="">-- Choose --</option>
            {countryData?.cities.map((city) => (
              <option key={city.code} value={city.name}>
                {city.name} ({city.code})
              </option>
            ))}
          </select>
        </div>
      )}

      {weather && (
        <div className="mb-4 text-lg">
          Weather: <span className="font-bold">{weather}</span>
        </div>
      )}

      {selectedCity && paginatedFlights.length > 0 && (
        <div>
          <h2 className="text-xl mb-4">
            Departures: {selectedCity} ({selectedCode})
          </h2>

          <table
            className="w-full border border-yellow-400 text-sm"
            data-testid="flights-table"
          >
            <thead>
              <tr className="border-b border-yellow-400 text-left">
                <th className="p-2">Flight</th>
                <th className="p-2">Destination</th>
                <th className="p-2">Time</th>
                <th className="p-2">Gate</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {paginatedFlights.map((f) => (
                <tr
                  key={f.id}
                  className="border-b border-yellow-900 hover:bg-yellow-900/10"
                >
                  <td className="p-2">{f.flight}</td>
                  <td className="p-2">{f.destination}</td>
                  <td className="p-2">{f.time}</td>
                  <td className="p-2">{f.gate}</td>
                  <td className={`p-2 font-bold ${getStatusColor(f.status)}`}>
                    {f.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </div>
      )}

      {selectedCity && flights.length === 0 && (
        <p className="text-yellow-400 mt-4">No flights available.</p>
      )}
    </main>
  );
}

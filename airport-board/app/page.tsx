"use client";

import { useState, useEffect } from "react";
import { airports } from "@/app/src/data/airports";

type Flight = {
  id: string;
  flight: string;
  destination: string;
  time: string;
  gate: string;
  status: string;
};

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [weather, setWeather] = useState<string | null>(null);

  const countryData = airports.find((c) => c.country === selectedCountry);

  useEffect(() => {
    if (!selectedCode) return;

    const fetchFlights = async () => {
      try {
        const res = await fetch(`/api/flights?airport=${selectedCode}`);
        const data = await res.json();

        setFlights(data.flights || []);
        setWeather(data.weather || null);
      } catch (err) {
        console.error("Failed to fetch flights", err);
      }
    };

    fetchFlights();

    const interval = setInterval(fetchFlights, 5000);
    return () => clearInterval(interval);
  }, [selectedCode]);

  return (
    <main className="min-h-screen bg-black text-yellow-400 font-mono p-10">
      <h1 className="text-3xl mb-8">✈ Airport Departure Board</h1>

      <div className="mb-6">
        <label className="block mb-2">Select Country</label>
        <select
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
          <label className="block mb-2">Select Airport</label>
          <select
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

      {selectedCity && flights.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl mb-4">
            Departures: {selectedCity} ({selectedCode})
          </h2>

          <table className="w-full border border-yellow-400 text-sm">
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
              {flights.map((f) => (
                <tr
                  key={f.id}
                  className="border-b border-yellow-900 hover:bg-yellow-900/10"
                >
                  <td className="p-2">{f.flight}</td>
                  <td className="p-2">{f.destination}</td>
                  <td className="p-2">{f.time}</td>
                  <td className="p-2">{f.gate}</td>
                  <td
                    className={`p-2 font-bold ${
                      f.status.includes("Delayed")
                        ? "text-red-400"
                        : f.status.includes("Boarding")
                          ? "text-green-400"
                          : f.status.includes("Cancelled")
                            ? "text-gray-400"
                            : "text-yellow-400"
                    }`}
                  >
                    {f.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

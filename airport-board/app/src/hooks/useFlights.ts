import { useState, useEffect } from "react";
import { Flight, generateFlights } from "../data/flights";

export function useFlights(airportCode: string | null) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    if (!airportCode) return;

    const updateFlights = () => {
      const data = generateFlights(airportCode);
      setFlights(data.flights);
      setWeather(data.weather);
    };

    updateFlights();
    const interval = setInterval(updateFlights, 60_000);
    return () => clearInterval(interval);
  }, [airportCode]);

  return { flights, weather };
}

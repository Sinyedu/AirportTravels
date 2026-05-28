import { useEffect, useState } from "react";
import {
  generateFlights,
  type Flight,
  type FlightResponse,
} from "@/entities/flight/flights";
import type { WeatherCondition } from "@/entities/weather/weather";

export function useFlights(airportCode: string | null) {
  const [state, setState] = useState<{
    airportCode: string | null;
    flights: Flight[];
    weather: WeatherCondition | null;
  }>({
    airportCode: null,
    flights: [],
    weather: null,
  });

  useEffect(() => {
    if (!airportCode) {
      return;
    }

    const updateFlights = () => {
      const data: FlightResponse = generateFlights(airportCode, {
        directions: ["departure"],
      });
      setState({
        airportCode,
        flights: data.flights,
        weather: data.weather,
      });
    };

    const timeout = setTimeout(updateFlights, 0);
    const interval = setInterval(updateFlights, 60_000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [airportCode]);

  if (!airportCode || state.airportCode !== airportCode) {
    return { flights: [], weather: null };
  }

  return { flights: state.flights, weather: state.weather };
}

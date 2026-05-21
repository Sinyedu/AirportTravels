import { getAirportByCode, type AirportRecord } from "@/data/airports";
import { toOperationalFlights, type OperationFlight } from "@/data/flights";
import {
  getGateActivity,
  getOperationalAlerts,
  getRouteActivity,
  type GateActivity,
  type OperationalAlert,
  type RouteActivity
} from "@/data/operations";
import { getWeatherImpact, type WeatherImpact } from "@/data/weather";
import { generateFlights } from "@/entities/flight/flights";

export type AirportOperationalSummary = {
  status: "Nominal" | "Constrained" | "Disrupted";
  activeFlights: number;
  arrivals: number;
  departures: number;
  delayedFlights: number;
  gateUtilization: number;
  averageDelayMinutes: number;
};

export type AirportOperationsSnapshot = {
  airport: AirportRecord;
  flights: OperationFlight[];
  arrivals: OperationFlight[];
  departures: OperationFlight[];
  delayedFlights: OperationFlight[];
  summary: AirportOperationalSummary;
  weather: WeatherImpact;
  gates: GateActivity[];
  alerts: OperationalAlert[];
  routes: RouteActivity[];
};

function getStatus(delayedFlights: number, activeFlights: number) {
  const delayRatio = activeFlights === 0 ? 0 : delayedFlights / activeFlights;

  if (delayRatio >= 0.32) {
    return "Disrupted";
  }

  if (delayRatio >= 0.16) {
    return "Constrained";
  }

  return "Nominal";
}

function getAverageDelayMinutes(delayedFlights: OperationFlight[]) {
  if (delayedFlights.length === 0) {
    return 0;
  }

  const totalDelay = delayedFlights.reduce((total, flight) => {
    return total + flight.delayMinutes;
  }, 0);

  return Math.round(totalDelay / delayedFlights.length);
}

export function getAirportOperationsSnapshot(
  airportCode: string
): AirportOperationsSnapshot | null {
  const airport = getAirportByCode(airportCode);

  if (!airport) {
    return null;
  }

  const flightResponse = generateFlights(airport.code);
  const flights = toOperationalFlights(flightResponse);
  const arrivals = flights.filter((flight) => flight.direction === "arrival");
  const departures = flights.filter((flight) => flight.direction === "departure");
  const delayedFlights = flights.filter((flight) => flight.delayMinutes > 0);
  const gates = getGateActivity(airport.code);

  return {
    airport,
    flights,
    arrivals,
    departures,
    delayedFlights,
    weather: getWeatherImpact(flightResponse.weather),
    gates,
    alerts: getOperationalAlerts(airport.code),
    routes: getRouteActivity(airport.code),
    summary: {
      status: getStatus(delayedFlights.length, flights.length),
      activeFlights: flights.length,
      arrivals: arrivals.length,
      departures: departures.length,
      delayedFlights: delayedFlights.length,
      gateUtilization: Math.round((gates.filter((gate) => gate.status !== "Ready").length / gates.length) * 100),
      averageDelayMinutes: getAverageDelayMinutes(delayedFlights)
    }
  };
}

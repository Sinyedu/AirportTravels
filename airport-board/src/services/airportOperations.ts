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

function touchesAirport(flight: OperationFlight, airportCode: string) {
  return flight.originCode === airportCode || flight.destinationCode === airportCode;
}

function isAirportArrival(flight: OperationFlight, airportCode: string) {
  return flight.direction === "arrival" && flight.destinationCode === airportCode;
}

function isAirportDeparture(flight: OperationFlight, airportCode: string) {
  return flight.direction === "departure" && flight.originCode === airportCode;
}

export function getAirportOperationsSnapshot(
  airportCode: string
): AirportOperationsSnapshot | null {
  const airport = getAirportByCode(airportCode);

  if (!airport) {
    return null;
  }

  const flightResponse = generateFlights(airport.code);
  const flights = toOperationalFlights(flightResponse).filter((flight) => {
    return touchesAirport(flight, airport.code);
  });
  const arrivals = flights.filter((flight) => isAirportArrival(flight, airport.code));
  const departures = flights.filter((flight) => isAirportDeparture(flight, airport.code));
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

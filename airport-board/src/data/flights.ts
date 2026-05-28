import {
  generateFlights,
  type Flight,
  type FlightResponse,
  type FlightStatus
} from "@/entities/flight/flights";

export type OperationFlight = Flight & {
  stand: string;
  delayMinutes: number;
};

function getDelayMinutes(status: FlightStatus, index: number) {
  if (!status.includes("Delayed")) {
    return 0;
  }

  return 12 + ((index * 7) % 48);
}

export function toOperationalFlights(response: FlightResponse): OperationFlight[] {
  return response.flights.map((flight, index) => {
    return {
      ...flight,
      stand: `${flight.gate.replace(/[0-9]/g, "")}${10 + index}`,
      delayMinutes: getDelayMinutes(flight.status, index)
    };
  });
}

export function getOperationalFlights(airportCode: string): OperationFlight[] {
  return toOperationalFlights(generateFlights(airportCode));
}

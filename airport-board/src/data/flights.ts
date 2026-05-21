import {
  generateFlights,
  type Flight,
  type FlightResponse,
  type FlightStatus
} from "@/entities/flight/flights";

export type OperationFlight = Flight & {
  direction: "arrival" | "departure";
  origin: string;
  aircraft: string;
  stand: string;
  delayMinutes: number;
};

const aircraftTypes = ["A320", "A321", "B738", "B789", "E195", "A359"];
const origins = ["Amsterdam", "Stockholm", "Madrid", "Dublin", "Zurich"];

function deterministicIndex(value: string, modulo: number) {
  const total = value.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return total % modulo;
}

function getDelayMinutes(status: FlightStatus, index: number) {
  if (!status.includes("Delayed")) {
    return 0;
  }

  return 12 + ((index * 7) % 48);
}

export function toOperationalFlights(response: FlightResponse): OperationFlight[] {
  return response.flights.map((flight, index) => {
    const direction = index % 3 === 0 ? "arrival" : "departure";

    return {
      ...flight,
      direction,
      origin: origins[deterministicIndex(`${flight.id}-origin`, origins.length)],
      aircraft: aircraftTypes[deterministicIndex(flight.flight, aircraftTypes.length)],
      stand: `${flight.gate.replace(/[0-9]/g, "")}${10 + index}`,
      delayMinutes: getDelayMinutes(flight.status, index)
    };
  });
}

export function getOperationalFlights(airportCode: string): OperationFlight[] {
  return toOperationalFlights(generateFlights(airportCode));
}

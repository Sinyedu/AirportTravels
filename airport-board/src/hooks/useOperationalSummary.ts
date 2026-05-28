import type { AirportOperationsSnapshot } from "@/services/airportOperations";

export function useOperationalSummary(snapshot: AirportOperationsSnapshot) {
  return snapshot.summary;
}

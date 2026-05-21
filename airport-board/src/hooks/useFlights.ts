"use client";

import { useMemo } from "react";
import { getOperationalFlights } from "@/data/flights";

export function useFlights(airportCode: string) {
  return useMemo(() => {
    return getOperationalFlights(airportCode);
  }, [airportCode]);
}

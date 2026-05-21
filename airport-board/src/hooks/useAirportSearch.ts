"use client";

import { useMemo, useState } from "react";
import { getAirportOptions } from "@/data/airports";

export function useAirportSearch() {
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const airports = getAirportOptions();

  const filteredAirports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return airports;
    }

    return airports.filter((airport) => {
      const searchable = `${airport.name} ${airport.code} ${airport.country}`.toLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [airports, query]);

  return {
    query,
    setQuery,
    selectedCode,
    setSelectedCode,
    filteredAirports
  };
}

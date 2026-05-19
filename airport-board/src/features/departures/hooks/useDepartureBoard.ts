"use client";

import { useMemo, useState } from "react";
import { airports } from "@/entities/airport/airports";
import {
  filterFlights,
  flightsPerPage,
  paginateFlights,
  sortFlights,
  type SortField,
  type SortOrder,
} from "@/features/departures/lib/flightBoard";
import { useFlights } from "./useFlights";

export function useDepartureBoard() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showDelayed, setShowDelayed] = useState(true);
  const [showBoarding, setShowBoarding] = useState(true);

  const countryData = airports.find((country) => {
    return country.country === selectedCountry;
  });
  const { flights, weather } = useFlights(selectedCode);

  const totalPages = Math.ceil(flights.length / flightsPerPage);

  const paginatedFlights = useMemo(() => {
    return paginateFlights(flights, page);
  }, [flights, page]);

  const visibleFlights = useMemo(() => {
    const sortedFlights = sortFlights(paginatedFlights, sortField, sortOrder);

    return filterFlights(sortedFlights, {
      showDelayed,
      showBoarding,
    });
  }, [paginatedFlights, showBoarding, showDelayed, sortField, sortOrder]);

  function selectCountry(country: string | null) {
    setSelectedCountry(country);
    setSelectedCity(null);
    setSelectedCode(null);
    setPage(0);
  }

  function selectCity(cityName: string | null) {
    setSelectedCity(cityName);
    setPage(0);

    const city = countryData?.cities.find((airport) => {
      return airport.name === cityName;
    });

    setSelectedCode(city?.code ?? null);
  }

  return {
    selectedCountry,
    selectedCity,
    selectedCode,
    weather,
    flights,
    paginatedFlights,
    visibleFlights,
    page,
    totalPages,
    sortField,
    sortOrder,
    showDelayed,
    showBoarding,
    selectCountry,
    selectCity,
    setPage,
    setSortField,
    setSortOrder,
    setShowDelayed,
    setShowBoarding,
  };
}

"use client";

import { useEffect, useRef } from "react";
import type { AirportRecord } from "@/data/airports";
import { getAirportByCode } from "@/data/airports";
import type { RouteActivity } from "@/data/operations";

type RouteActivityMapProps = {
  airport: AirportRecord;
  routes: RouteActivity[];
};

const trendColors: Record<RouteActivity["delayTrend"], string> = {
  Stable: "#38bdf8",
  Increasing: "#f59e0b",
  Recovering: "#34d399"
};

function getRouteAirportCode(route: string, airportCode: string) {
  const codes = route.split(" - ").map((code) => code.trim().toUpperCase());
  return codes.find((code) => code !== airportCode.toUpperCase()) ?? null;
}

export function RouteActivityMap({ airport, routes }: RouteActivityMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initializeMap() {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const L = await import("leaflet");

      if (cancelled || !containerRef.current) {
        return;
      }

      mapRef.current?.remove();
      mapRef.current = null;

      const origin: import("leaflet").LatLngTuple = [
        airport.latitude,
        airport.longitude
      ];
      const routeTargets = routes
        .map((route) => {
          const airportCode = getRouteAirportCode(route.route, airport.code);
          const target = airportCode ? getAirportByCode(airportCode) : undefined;

          if (!target || target.latitude === 0 || target.longitude === 0) {
            return null;
          }

          return { route, target };
        })
        .filter((item): item is { route: RouteActivity; target: AirportRecord } => {
          return item !== null;
        });

      const leafletMap = L.map(container, {
        attributionControl: true,
        scrollWheelZoom: false,
        zoomControl: true
      });
      mapRef.current = leafletMap;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(leafletMap);

      L.circleMarker(origin, {
        color: "#0f172a",
        fillColor: "#e0f2fe",
        fillOpacity: 1,
        radius: 8,
        weight: 2
      })
        .bindPopup(`${airport.name} (${airport.code})`)
        .addTo(leafletMap);

      routeTargets.forEach(({ route, target }) => {
        const destination: import("leaflet").LatLngTuple = [
          target.latitude,
          target.longitude
        ];
        const color = trendColors[route.delayTrend];

        L.polyline([origin, destination], {
          color,
          opacity: 0.82,
          weight: Math.min(7, 2 + route.movements / 5)
        })
          .bindTooltip(`${route.route}: ${route.movements} movements`)
          .addTo(leafletMap);

        L.circleMarker(destination, {
          color,
          fillColor: color,
          fillOpacity: 0.9,
          radius: 6,
          weight: 2
        })
          .bindPopup(`${target.name} (${target.code})`)
          .addTo(leafletMap);
      });

      const bounds = L.latLngBounds([
        origin,
        ...routeTargets.map(({ target }) => {
          return [target.latitude, target.longitude] as import("leaflet").LatLngTuple;
        })
      ]);

      leafletMap.fitBounds(bounds, { padding: [36, 36], maxZoom: 6 });
      window.setTimeout(() => leafletMap.invalidateSize(), 0);
    }

    initializeMap();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [airport, routes]);

  return (
    <div
      ref={containerRef}
      className="h-[320px] min-h-[320px] overflow-hidden rounded-md border border-slate-800 bg-slate-950 sm:h-[380px] lg:h-full"
      aria-label={`OpenStreetMap route activity map for ${airport.name}`}
    />
  );
}

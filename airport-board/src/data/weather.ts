import type { WeatherCondition } from "@/entities/weather/weather";

export type WeatherImpact = {
  condition: WeatherCondition;
  visibilityKm: number;
  windKts: number;
  runwayMode: string;
  impactLevel: "Low" | "Moderate" | "High";
  summary: string;
};

export function getWeatherImpact(condition: WeatherCondition): WeatherImpact {
  const impacts: Record<WeatherCondition, WeatherImpact> = {
    Clear: {
      condition,
      visibilityKm: 10,
      windKts: 8,
      runwayMode: "Normal mixed-mode operations",
      impactLevel: "Low",
      summary: "No material weather constraints reported."
    },
    Rain: {
      condition,
      visibilityKm: 6,
      windKts: 17,
      runwayMode: "Wet runway spacing in effect",
      impactLevel: "Moderate",
      summary: "Reduced taxi speeds and minor arrival spacing expected."
    },
    Storm: {
      condition,
      visibilityKm: 4,
      windKts: 31,
      runwayMode: "Convective weather flow control",
      impactLevel: "High",
      summary: "Ground handling pauses likely during lightning proximity."
    },
    Fog: {
      condition,
      visibilityKm: 1,
      windKts: 5,
      runwayMode: "Low visibility procedures",
      impactLevel: "High",
      summary: "Arrival rate constrained by low visibility procedures."
    },
    Snow: {
      condition,
      visibilityKm: 3,
      windKts: 14,
      runwayMode: "Runway inspection cycle active",
      impactLevel: "High",
      summary: "De-icing demand and runway inspections affecting throughput."
    }
  };

  return impacts[condition];
}

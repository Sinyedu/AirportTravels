export type OperationalAlert = {
  id: string;
  severity: "Advisory" | "Watch" | "Critical";
  title: string;
  detail: string;
  area: string;
};

export type GateActivity = {
  gate: string;
  flight: string;
  status: "Boarding" | "Turnaround" | "Cleaning" | "Ready" | "Closed";
  nextMilestone: string;
};

export type RouteActivity = {
  route: string;
  movements: number;
  delayTrend: "Stable" | "Increasing" | "Recovering";
};

export function getOperationalAlerts(airportCode: string): OperationalAlert[] {
  return [
    {
      id: `${airportCode}-alert-weather`,
      severity: "Watch",
      title: "Arrival spacing under review",
      detail: "Approach control monitoring inbound sequencing and holding risk.",
      area: "Airside"
    },
    {
      id: `${airportCode}-alert-gates`,
      severity: "Advisory",
      title: "Gate pressure building",
      detail: "Two late turnarounds may require stand swaps in the next bank.",
      area: "Terminal"
    },
    {
      id: `${airportCode}-alert-ground`,
      severity: "Advisory",
      title: "Ground handling demand elevated",
      detail: "Ramp teams prioritizing delayed departures and de-icing queues.",
      area: "Ramp"
    }
  ];
}

export function getGateActivity(airportCode: string): GateActivity[] {
  const prefixes = ["A", "B", "C", "D"];

  return Array.from({ length: 8 }).map((_, index) => {
    const gate = `${prefixes[index % prefixes.length]}${index + 4}`;
    const statuses: GateActivity["status"][] = [
      "Boarding",
      "Turnaround",
      "Cleaning",
      "Ready",
      "Closed"
    ];

    return {
      gate,
      flight: `${airportCode}${210 + index}`,
      status: statuses[index % statuses.length],
      nextMilestone: `${12 + index}:${index % 2 === 0 ? "20" : "45"}`
    };
  });
}

export function getRouteActivity(airportCode: string): RouteActivity[] {
  return [
    { route: `${airportCode} - LHR`, movements: 18, delayTrend: "Stable" },
    { route: `${airportCode} - FRA`, movements: 14, delayTrend: "Recovering" },
    { route: `${airportCode} - AMS`, movements: 12, delayTrend: "Increasing" },
    { route: `${airportCode} - OSL`, movements: 9, delayTrend: "Stable" }
  ];
}

import type { AirportOperationalSummary } from "@/services/airportOperations";
import dashboardContent from "@/content/dashboard.json";

type AirportStatusCardsProps = {
  summary: AirportOperationalSummary;
};

const statusTone: Record<AirportOperationalSummary["status"], string> = {
  Nominal: "border-emerald-500/40 text-emerald-200",
  Constrained: "border-amber-500/40 text-amber-200",
  Disrupted: "border-rose-500/40 text-rose-200"
};

export function AirportStatusCards({ summary }: AirportStatusCardsProps) {
  const cards = [
    {
      label: "Airport status",
      value: summary.status,
      detail: `${summary.gateUtilization}% gate utilization`,
      className: statusTone[summary.status]
    },
    {
      label: dashboardContent.labels.activeFlights,
      value: summary.activeFlights.toString(),
      detail: `${summary.arrivals} arrivals, ${summary.departures} departures`
    },
    {
      label: dashboardContent.labels.delayedFlights,
      value: summary.delayedFlights.toString(),
      detail: `${summary.averageDelayMinutes} min average delay`
    },
    {
      label: dashboardContent.labels.gateActivity,
      value: `${summary.gateUtilization}%`,
      detail: "Occupied or in turnaround"
    }
  ];

  return (
    <section aria-labelledby="status-overview-title" className="space-y-4">
      <h2 id="status-overview-title" className="text-xl font-semibold text-white">
        {dashboardContent.labels.overview}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className={`rounded-lg border border-slate-800 bg-slate-900 p-5 ${card.className ?? ""}`}
          >
            <p className="text-sm uppercase tracking-[0.14em] text-slate-400">
              {card.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
            <p className="mt-2 text-sm text-slate-300">{card.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

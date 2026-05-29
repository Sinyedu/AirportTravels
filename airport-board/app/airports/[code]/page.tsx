import { notFound } from "next/navigation";
import { AirportStatusCards } from "@/components/dashboard/AirportStatusCards";
import { FlightOperationsTable } from "@/components/dashboard/FlightOperationsTable";
import { GateActivityCard } from "@/components/dashboard/GateActivityCard";
import { OperationalAlerts } from "@/components/dashboard/OperationalAlerts";
import { RouteActivityPanel } from "@/components/dashboard/RouteActivityPanel";
import { WeatherImpactCard } from "@/components/dashboard/WeatherImpactCard";
import { PageShell } from "@/components/layout/PageShell";
import dashboardContent from "@/content/dashboard.json";
import { getAirportOperationsSnapshot } from "@/services/airportOperations";

export const dynamic = "force-dynamic";

type AirportDashboardPageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function AirportDashboardPage({
  params
}: AirportDashboardPageProps) {
  const { code } = await params;
  const snapshot = getAirportOperationsSnapshot(code);

  if (!snapshot) {
    notFound();
  }

  return (
    <PageShell>
      <section className="space-y-8" aria-labelledby="airport-dashboard-title">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
              {snapshot.airport.country} operations
            </p>
            <h1
              id="airport-dashboard-title"
              className="mt-2 text-3xl font-semibold text-white md:text-5xl"
            >
              {snapshot.airport.name} ({snapshot.airport.code})
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
              {dashboardContent.descriptions.dashboard}
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
            {snapshot.airport.runways} runways / {snapshot.airport.terminals} terminals
          </div>
        </div>

        <AirportStatusCards summary={snapshot.summary} />

        <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-5">
            <FlightOperationsTable
              title={dashboardContent.labels.activeFlights}
              flights={snapshot.flights}
            />
            <div className="grid gap-5">
              <FlightOperationsTable
                title={dashboardContent.labels.arrivals}
                flights={snapshot.arrivals}
              />
              <FlightOperationsTable
                title={dashboardContent.labels.departures}
                flights={snapshot.departures}
              />
            </div>
            <FlightOperationsTable
              title={dashboardContent.labels.delayedFlights}
              flights={snapshot.delayedFlights}
            />
          </div>

          <div className="space-y-5">
            <WeatherImpactCard weather={snapshot.weather} />
            <GateActivityCard gates={snapshot.gates} />
            <OperationalAlerts alerts={snapshot.alerts} />
          </div>
        </div>

        <div className="grid gap-5">
          <RouteActivityPanel airport={snapshot.airport} routes={snapshot.routes} />
        </div>
      </section>
    </PageShell>
  );
}

import type { AirportRecord } from "@/data/airports";
import type { RouteActivity } from "@/data/operations";
import dashboardContent from "@/content/dashboard.json";
import { RouteActivityMap } from "@/components/dashboard/RouteActivityMap";

type RouteActivityPanelProps = {
  airport: AirportRecord;
  routes: RouteActivity[];
};

export function RouteActivityPanel({ airport, routes }: RouteActivityPanelProps) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <h2 className="text-lg font-semibold text-white">
        {dashboardContent.labels.routeActivity}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        {dashboardContent.descriptions.routeActivity}
      </p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <RouteActivityMap airport={airport} routes={routes} />
        <div className="space-y-3">
          {routes.map((route) => (
            <div
              key={route.route}
              className="flex items-center justify-between gap-4 rounded-md bg-slate-950/70 p-3"
            >
              <div>
                <p className="font-medium text-white">{route.route}</p>
                <p className="mt-1 text-xs text-slate-500">{route.delayTrend}</p>
              </div>
              <p className="text-2xl font-semibold text-white">{route.movements}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

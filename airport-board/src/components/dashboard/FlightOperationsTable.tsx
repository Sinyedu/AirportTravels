import type { OperationFlight } from "@/data/flights";
import dashboardContent from "@/content/dashboard.json";

type FlightOperationsTableProps = {
  title: string;
  flights: OperationFlight[];
};

function getRoute(flight: OperationFlight) {
  if (flight.direction === "arrival") {
    return `${flight.origin} -> ${flight.destination}`;
  }

  return `${flight.origin} -> ${flight.destination}`;
}

function getStatusClass(status: string) {
  if (status.includes("Delayed")) {
    return "text-amber-200";
  }

  if (status.includes("Boarding") || status.includes("Final")) {
    return "text-sky-200";
  }

  if (status.includes("Departed")) {
    return "text-emerald-200";
  }

  return "text-slate-200";
}

export function FlightOperationsTable({ title, flights }: FlightOperationsTableProps) {
  const visibleFlights = flights.slice(0, 8);

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 px-4 py-4 sm:px-5">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>

      <div className="divide-y divide-slate-800 md:hidden">
        {visibleFlights.map((flight) => (
          <article key={flight.id} className="px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-white">{flight.flight}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {flight.airline} / {flight.aircraft}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-medium text-slate-200">{flight.time}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">
                  Gate {flight.gate}
                </p>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  {dashboardContent.table.route}
                </dt>
                <dd className="mt-1 break-words text-slate-300">{getRoute(flight)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  {dashboardContent.table.status}
                </dt>
                <dd className={`mt-1 font-medium ${getStatusClass(flight.status)}`}>
                  {flight.status || "Scheduled"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  {dashboardContent.table.impact}
                </dt>
                <dd className="mt-1 text-slate-300">
                  {flight.delayMinutes > 0 ? `${flight.delayMinutes} min` : "None"}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden md:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.12em] text-slate-400">
            <tr className="border-b border-slate-800">
              <th className="w-[22%] px-4 py-3 xl:px-5">
                {dashboardContent.table.flight}
              </th>
              <th className="w-[26%] px-4 py-3 xl:px-5">
                {dashboardContent.table.route}
              </th>
              <th className="w-[12%] px-4 py-3 xl:px-5">
                {dashboardContent.table.time}
              </th>
              <th className="w-[10%] px-4 py-3 xl:px-5">
                {dashboardContent.table.gate}
              </th>
              <th className="w-[18%] px-4 py-3 xl:px-5">
                {dashboardContent.table.status}
              </th>
              <th className="w-[12%] px-4 py-3 xl:px-5">
                {dashboardContent.table.impact}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleFlights.map((flight) => (
              <tr key={flight.id} className="border-b border-slate-800/80">
                <td className="px-4 py-3 align-top xl:px-5">
                  <div className="font-medium text-white">{flight.flight}</div>
                  <div className="mt-1 text-xs text-slate-400">
                    {flight.airline} / {flight.aircraft}
                  </div>
                </td>
                <td className="break-words px-4 py-3 align-top text-slate-300 xl:px-5">
                  {getRoute(flight)}
                </td>
                <td className="px-4 py-3 align-top text-slate-300 xl:px-5">
                  {flight.time}
                </td>
                <td className="px-4 py-3 align-top text-slate-300 xl:px-5">
                  {flight.gate}
                </td>
                <td
                  className={`px-4 py-3 align-top font-medium xl:px-5 ${getStatusClass(flight.status)}`}
                >
                  {flight.status || "Scheduled"}
                </td>
                <td className="px-4 py-3 align-top text-slate-300 xl:px-5">
                  {flight.delayMinutes > 0 ? `${flight.delayMinutes} min` : "None"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

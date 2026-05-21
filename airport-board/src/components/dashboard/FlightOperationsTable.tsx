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
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.12em] text-slate-400">
            <tr className="border-b border-slate-800">
              <th className="px-5 py-3">{dashboardContent.table.flight}</th>
              <th className="px-5 py-3">{dashboardContent.table.route}</th>
              <th className="px-5 py-3">{dashboardContent.table.time}</th>
              <th className="px-5 py-3">{dashboardContent.table.gate}</th>
              <th className="px-5 py-3">{dashboardContent.table.status}</th>
              <th className="px-5 py-3">{dashboardContent.table.impact}</th>
            </tr>
          </thead>
          <tbody>
            {flights.slice(0, 8).map((flight) => (
              <tr key={flight.id} className="border-b border-slate-800/80">
                <td className="px-5 py-3 font-medium text-white">{flight.flight}</td>
                <td className="px-5 py-3 text-slate-300">{getRoute(flight)}</td>
                <td className="px-5 py-3 text-slate-300">{flight.time}</td>
                <td className="px-5 py-3 text-slate-300">{flight.gate}</td>
                <td className={`px-5 py-3 font-medium ${getStatusClass(flight.status)}`}>
                  {flight.status || "Scheduled"}
                </td>
                <td className="px-5 py-3 text-slate-300">
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

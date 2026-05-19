import { airports } from "@/entities/airport/airports";
import { generateFlights } from "@/entities/flight/flights";
import { PlatformShell } from "@/shared/ui/PlatformShell";
import { PageSection } from "@/shared/ui/PageSection";

export const dynamic = "force-dynamic";

const focusAirports = airports.flatMap((country) => country.cities).slice(0, 6);

export default function AirspacePage() {
  const airspaceRows = focusAirports.map((airport) => {
    const data = generateFlights(airport.code);

    return {
      airport,
      weather: data.weather,
      activeFlights: data.flights.length,
      delayedFlights: data.flights.filter((flight) => {
        return flight.status.includes("Delayed");
      }).length,
    };
  });

  return (
    <PlatformShell>
      <PageSection
        className="pt-0"
        description="A compact view of airport weather, generated traffic volume, and delay signals."
        eyebrow="Live airspace"
        title="Regional operating picture"
      >
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Tracked airports</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              {airspaceRows.length}
            </p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Active flights</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              {airspaceRows.reduce((total, row) => total + row.activeFlights, 0)}
            </p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Delay signals</p>
            <p className="mt-3 text-4xl font-semibold text-amber-600">
              {airspaceRows.reduce((total, row) => total + row.delayedFlights, 0)}
            </p>
          </article>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <th className="p-3">Airport</th>
                <th className="p-3">Weather</th>
                <th className="p-3">Flights</th>
                <th className="p-3">Delays</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {airspaceRows.map((row) => (
                <tr className="hover:bg-slate-50" key={row.airport.code}>
                  <td className="p-3 font-medium text-slate-950">
                    {row.airport.name} ({row.airport.code})
                  </td>
                  <td className="p-3 text-slate-700">{row.weather}</td>
                  <td className="p-3 text-slate-700">{row.activeFlights}</td>
                  <td className="p-3 text-slate-700">{row.delayedFlights}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>
    </PlatformShell>
  );
}

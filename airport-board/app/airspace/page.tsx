import { airports } from "@/entities/airport/airports";
import { generateFlights } from "@/entities/flight/flights";
import { PlatformShell } from "@/shared/ui/PlatformShell";

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
      <section aria-labelledby="airspace-title">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase text-yellow-400/70">
            Live airspace
          </p>
          <h1 id="airspace-title" className="text-3xl">
            Regional operating picture
          </h1>
        </div>

        <div className="overflow-x-auto border border-yellow-400/50">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-yellow-400/50">
                <th className="p-3">Airport</th>
                <th className="p-3">Weather</th>
                <th className="p-3">Flights</th>
                <th className="p-3">Delays</th>
              </tr>
            </thead>
            <tbody>
              {airspaceRows.map((row) => (
                <tr key={row.airport.code} className="border-b border-yellow-900">
                  <td className="p-3">
                    {row.airport.name} ({row.airport.code})
                  </td>
                  <td className="p-3">{row.weather}</td>
                  <td className="p-3">{row.activeFlights}</td>
                  <td className="p-3">{row.delayedFlights}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PlatformShell>
  );
}

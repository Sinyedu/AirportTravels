import type { Flight } from "@/entities/flight/flights";
import FlightRow from "./FlightRow";

interface FlightTableProps {
  flights: Flight[];
  getCountdown: (time: string) => string;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => string;
}
export function FlightTable({
  flights,
  getCountdown,
  getStatusColor,
  getStatusIcon,
}: FlightTableProps) {
  return (
    <>
      <div className="grid gap-3 md:hidden" data-testid="flights-list">
        {flights.map((flight) => (
          <article key={flight.id} className="border border-yellow-400 p-3 text-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold">{flight.flight}</p>
                <p className="mt-1 text-xs text-yellow-400/60">
                  {flight.airline} / {flight.aircraft}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p>{flight.time}</p>
                <p className="mt-1 text-xs text-yellow-400/70">{getCountdown(flight.time)}</p>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-yellow-400/60">
                  Destination
                </dt>
                <dd className="mt-1 break-words">{flight.destination}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-yellow-400/60">
                  Gate
                </dt>
                <dd className="mt-1">{flight.gate}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-[0.12em] text-yellow-400/60">
                  Status
                </dt>
                <dd className={`mt-1 font-bold ${getStatusColor(flight.status)}`}>
                  {getStatusIcon(flight.status)} {flight.status}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <table
        data-testid="flights-table"
        className="hidden w-full table-fixed border border-yellow-400 text-sm md:table"
      >
        <thead>
          <tr className="border-b border-yellow-400 text-left">
            <th className="w-[21%] p-2">Flight</th>
            <th className="w-[22%] p-2">Destination</th>
            <th className="w-[12%] p-2">Time</th>
            <th className="w-[16%] p-2">Countdown</th>
            <th className="w-[9%] p-2">Gate</th>
            <th className="w-[20%] p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <FlightRow
              key={f.id}
              flight={f}
              getCountdown={getCountdown}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

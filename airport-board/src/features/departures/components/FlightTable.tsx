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
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table data-testid="flights-table" className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <th className="p-3">Flight</th>
            <th className="p-3">Destination</th>
            <th className="p-3">Time</th>
            <th className="p-3">Countdown</th>
            <th className="p-3">Gate</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
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
    </div>
  );
}

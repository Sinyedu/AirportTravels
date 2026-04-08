import { Flight } from "../../data/flights";
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
    <table className="w-full border border-yellow-400 text-sm">
      <thead>
        <tr className="border-b border-yellow-400 text-left">
          <th className="p-2">Flight</th>
          <th className="p-2">Destination</th>
          <th className="p-2">Time</th>
          <th className="p-2">Countdown</th>
          <th className="p-2">Gate</th>
          <th className="p-2">Status</th>
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
  );
}

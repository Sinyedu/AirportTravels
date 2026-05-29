import type { Flight } from "@/entities/flight/flights";

interface FlightRowProps {
  flight: Flight;
  getCountdown: (time: string) => string;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => string;
}

export default function FlightRow({
  flight,
  getCountdown,
  getStatusColor,
  getStatusIcon,
}: FlightRowProps) {
  return (
    <tr className="border-b border-yellow-900 hover:bg-yellow-900/10">
      <td className="p-2 align-top">
        <div>{flight.flight}</div>
        <div className="text-xs text-yellow-400/60">
          {flight.airline} / {flight.aircraft}
        </div>
      </td>
      <td className="break-words p-2 align-top">{flight.destination}</td>
      <td className="p-2 align-top">{flight.time}</td>
      <td className="p-2 align-top">{getCountdown(flight.time)}</td>
      <td className="p-2 align-top">{flight.gate}</td>
      <td className={`p-2 align-top font-bold ${getStatusColor(flight.status)}`}>
        {getStatusIcon(flight.status)} {flight.status}
      </td>
    </tr>
  );
}

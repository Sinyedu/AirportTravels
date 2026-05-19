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
    <tr className="hover:bg-slate-50">
      <td className="p-3 font-semibold text-slate-950">{flight.flight}</td>
      <td className="p-3 text-slate-700">{flight.destination}</td>
      <td className="p-3 text-slate-700">{flight.time}</td>
      <td className="p-3 text-slate-700">{getCountdown(flight.time)}</td>
      <td className="p-3 text-slate-700">{flight.gate}</td>
      <td className={`p-3 font-semibold ${getStatusColor(flight.status)}`}>
        {getStatusIcon(flight.status)} {flight.status}
      </td>
    </tr>
  );
}

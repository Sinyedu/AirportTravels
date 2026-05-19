export function getStatusColor(status: string) {
  if (status.includes("Delayed")) return "text-rose-600";
  if (status.includes("Boarding") || status.includes("Final Call"))
    return "text-emerald-600";
  if (status.includes("Gate Closing")) return "text-amber-600";
  if (status.includes("Departed")) return "text-slate-400";
  return "text-sky-700";
}

export function getStatusIcon(status: string) {
  if (status.includes("Delayed")) return "⏰";
  if (status.includes("Boarding")) return "🛫";
  if (status.includes("Final Call")) return "📢";
  if (status.includes("Gate Closing")) return "🚪";
  if (status.includes("Departed")) return "✈️";
  return "🟢";
}

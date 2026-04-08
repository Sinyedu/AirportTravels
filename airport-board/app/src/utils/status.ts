export function getStatusColor(status: string) {
  if (status.includes("Delayed")) return "text-red-400";
  if (status.includes("Boarding") || status.includes("Final Call"))
    return "text-green-400";
  if (status.includes("Gate Closing")) return "text-yellow-400";
  if (status.includes("Departed")) return "text-gray-400";
  return "text-yellow-400";
}

export function getStatusIcon(status: string) {
  if (status.includes("Delayed")) return "⏰";
  if (status.includes("Boarding")) return "🛫";
  if (status.includes("Final Call")) return "📢";
  if (status.includes("Gate Closing")) return "🚪";
  if (status.includes("Departed")) return "✈️";
  return "🟢";
}

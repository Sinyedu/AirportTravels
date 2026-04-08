export function getCountdown(time: string) {
  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  const flightTime = new Date(now);
  flightTime.setHours(hours, minutes, 0, 0);
  const diffMins = Math.floor((flightTime.getTime() - now.getTime()) / 60000);
  return diffMins < 0 ? "Departed" : `${diffMins} min`;
}

import type {
  SortField,
  SortOrder,
} from "@/features/departures/lib/flightBoard";

interface SortControlsProps {
  sortField: SortField | null;
  setSortField: (field: SortField | null) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

export function SortControls({
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}: SortControlsProps) {
  return (
    <div>
      Sort by:
      <select
        className="ml-2 mr-2"
        value={sortField || ""}
        onChange={(e) =>
          setSortField(e.target.value ? (e.target.value as SortField) : null)
        }
      >
        <option value="">-- None --</option>
        <option value="time">Time</option>
        <option value="countdown">Countdown</option>
        <option value="destination">Destination</option>
        <option value="flight">Flight</option>
        <option value="gate">Gate</option>
        <option value="status">Status</option>
      </select>
      <button
        className="px-2 py-1 border border-yellow-400"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        {sortOrder === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}

import { Flight } from "../../data/flights";

interface SortControlsProps {
  sortField: keyof Flight | "countdown" | null;
  setSortField: (field: keyof Flight | "countdown" | null) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
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
          setSortField(e.target.value as keyof Flight | "countdown")
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

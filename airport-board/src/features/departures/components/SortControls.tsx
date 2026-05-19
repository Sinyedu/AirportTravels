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
    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
      <label htmlFor="sort-field">Sort by</label>
      <select
        className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition-colors focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        id="sort-field"
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
        className="grid size-10 place-items-center rounded-full border border-slate-300 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        {sortOrder === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}

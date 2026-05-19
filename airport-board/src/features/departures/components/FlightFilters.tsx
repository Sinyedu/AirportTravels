"use client";

interface FlightFiltersProps {
  showDelayed: boolean;
  setShowDelayed: (value: boolean) => void;
  showBoarding: boolean;
  setShowBoarding: (value: boolean) => void;
}

export default function FlightFilters({
  showDelayed,
  setShowDelayed,
  showBoarding,
  setShowBoarding,
}: FlightFiltersProps) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showDelayed}
          onChange={(e) => setShowDelayed(e.target.checked)}
        />{" "}
        Show Delayed
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          checked={showBoarding}
          onChange={(e) => setShowBoarding(e.target.checked)}
        />{" "}
        Show Boarding/Final Call
      </label>
    </div>
  );
}

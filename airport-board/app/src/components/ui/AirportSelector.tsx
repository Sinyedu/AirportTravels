import { airports } from "../../data/airports";

interface AirportSelectorProps {
  selectedCountry: string | null;
  onSelectCountry: (country: string | null) => void;
  selectedCity: string | null;
  onSelectCity: (city: string | null) => void;
}

export function AirportSelector({
  selectedCountry,
  onSelectCountry,
  selectedCity,
  onSelectCity,
}: AirportSelectorProps) {
  const countryData = airports.find((c) => c.country === selectedCountry);

  return (
    <>
      <div className="mb-6">
        <label htmlFor="country-select" className="block mb-2">
          Select Country
        </label>
        <select
          id="country-select"
          className="bg-black border border-yellow-400 p-2 w-64"
          value={selectedCountry || ""}
          onChange={(e) => {
            onSelectCountry(e.target.value || null);
            onSelectCity(null);
          }}
        >
          <option value="">-- Choose --</option>
          {airports.map((c) => (
            <option key={c.country} value={c.country}>
              {c.country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div className="mb-6">
          <label htmlFor="airport-select" className="block mb-2">
            Select Airport
          </label>
          <select
            id="airport-select"
            className="bg-black border border-yellow-400 p-2 w-64"
            value={selectedCity || ""}
            onChange={(e) => {
              const cityName = e.target.value || null;
              onSelectCity(cityName);
            }}
          >
            <option value="">-- Choose --</option>
            {countryData?.cities.map((city) => (
              <option key={city.code} value={city.name}>
                {city.name} ({city.code})
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

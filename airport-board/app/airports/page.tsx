import { airports } from "@/entities/airport/airports";
import { PlatformShell } from "@/shared/ui/PlatformShell";

export default function AirportsPage() {
  const airportCount = airports.reduce((total, country) => {
    return total + country.cities.length;
  }, 0);

  return (
    <PlatformShell>
      <section aria-labelledby="airports-title">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase text-yellow-400/70">
            Airport overview
          </p>
          <h1 id="airports-title" className="text-3xl">
            {airportCount} airports across {airports.length} countries
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {airports.map((country) => (
            <article
              key={country.country}
              className="border border-yellow-400/50 p-4"
            >
              <h2 className="mb-3 text-xl">{country.country}</h2>
              <ul className="space-y-2 text-sm">
                {country.cities.map((airport) => (
                  <li
                    key={airport.code}
                    className="flex items-center justify-between gap-4 border-t border-yellow-400/20 pt-2"
                  >
                    <span>{airport.name}</span>
                    <span className="font-bold">{airport.code}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </PlatformShell>
  );
}

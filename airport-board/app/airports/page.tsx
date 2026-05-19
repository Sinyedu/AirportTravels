import { airports } from "@/entities/airport/airports";
import { PlatformShell } from "@/shared/ui/PlatformShell";
import { PageSection } from "@/shared/ui/PageSection";

type AirportsPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

export default async function AirportsPage({ searchParams }: AirportsPageProps) {
  const params = await searchParams;
  const queryParam = params?.q;
  const query = (Array.isArray(queryParam) ? queryParam[0] : queryParam ?? "")
    .trim()
    .toLowerCase();

  const filteredCountries = airports
    .map((country) => {
      const cities = country.cities.filter((airport) => {
        const searchable = `${airport.name} ${airport.code} ${country.country}`;

        return searchable.toLowerCase().includes(query);
      });

      return {
        ...country,
        cities,
      };
    })
    .filter((country) => country.cities.length > 0 || query.length === 0);

  const airportCount = airports.reduce((total, country) => {
    return total + country.cities.length;
  }, 0);
  const visibleAirportCount = filteredCountries.reduce((total, country) => {
    return total + country.cities.length;
  }, 0);

  return (
    <PlatformShell>
      <PageSection
        className="pt-0"
        description="Browse the supported airport network by country, city, and IATA code."
        eyebrow="Airport overview"
        title={`${airportCount} airports across ${airports.length} countries`}
      >
        <form action="/airports" className="mb-8 max-w-2xl">
          <label className="sr-only" htmlFor="airport-directory-search">
            Search airports
          </label>
          <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:flex-row">
            <input
              className="min-h-12 flex-1 rounded-md border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              defaultValue={queryParam?.toString() ?? ""}
              id="airport-directory-search"
              name="q"
              placeholder="Filter airports or codes"
              type="search"
            />
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              type="submit"
            >
              Filter
            </button>
          </div>
          {query && (
            <p className="mt-3 text-sm text-slate-500">
              Showing {visibleAirportCount} matches for <span>{query}</span>.
            </p>
          )}
        </form>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCountries.map((country) => (
            <article
              key={country.country}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="mb-4 text-xl font-semibold text-slate-950">
                {country.country}
              </h2>
              <ul className="space-y-2 text-sm">
                {country.cities.map((airport) => (
                  <li
                    key={airport.code}
                    className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 text-slate-700"
                  >
                    <span>{airport.name}</span>
                    <span className="rounded-full bg-sky-50 px-3 py-1 font-bold text-sky-700">
                      {airport.code}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </PageSection>
    </PlatformShell>
  );
}

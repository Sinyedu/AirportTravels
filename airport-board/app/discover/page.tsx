import { airports } from "@/entities/airport/airports";
import { PlatformShell } from "@/shared/ui/PlatformShell";
import { PageSection } from "@/shared/ui/PageSection";

const destinationGroups = [
  {
    title: "Northern Europe",
    destinations: ["Copenhagen", "Oslo Gardermoen", "Bergen", "Edinburgh"],
  },
  {
    title: "Major hubs",
    destinations: [
      "London Heathrow",
      "Frankfurt",
      "Paris Charles de Gaulle",
      "New York JFK",
    ],
  },
  {
    title: "City breaks",
    destinations: ["Berlin Brandenburg", "Nice", "Lyon", "Hamburg"],
  },
];

const airportCodes = new Map(
  airports.flatMap((country) => {
    return country.cities.map((airport) => [airport.name, airport.code]);
  }),
);

export default function DiscoverPage() {
  return (
    <PlatformShell>
      <PageSection
        className="pt-0"
        description="Curated groups for quick route exploration across cities, hubs, and northern European airports."
        eyebrow="Destination discovery"
        title="Explore reachable airport regions"
      >

        <div className="grid gap-4 md:grid-cols-3">
          {destinationGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="mb-5 text-xl font-semibold text-slate-950">
                {group.title}
              </h2>
              <ul className="space-y-3 text-sm">
                {group.destinations.map((destination) => (
                  <li
                    key={destination}
                    className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 text-slate-700"
                  >
                    <span>{destination}</span>
                    <span className="rounded-full bg-sky-50 px-3 py-1 font-bold text-sky-700">
                      {airportCodes.get(destination)}
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

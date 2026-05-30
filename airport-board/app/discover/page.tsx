import Link from "next/link";
import { airports } from "@/entities/airport/airports";
import { PlatformShell } from "@/shared/ui/PlatformShell";

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
  airports.flatMap((country) =>
    country.cities.map((airport) => [airport.name, airport.code]),
  ),
);

export default function DiscoverPage() {
  return (
    <PlatformShell>
      <section aria-labelledby="discover-title">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase text-yellow-400/70">
            Destination discovery
          </p>

          <h1 id="discover-title" className="text-3xl">
            Explore reachable airport regions
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {destinationGroups.map((group) => (
            <article
              key={group.title}
              className="border border-yellow-400/50 p-4"
            >
              <h2 className="mb-4 text-xl">{group.title}</h2>

              <ul className="space-y-3 text-sm">
                {group.destinations.map((destination) => {
                  const airportCode = airportCodes.get(destination);

                  return (
                    <li key={destination}>
                      <Link
                        href={`/airports/${airportCode}`}
                        className="flex items-center justify-between gap-4 border border-transparent p-2 transition hover:border-yellow-400/50 hover:bg-yellow-400/10"
                      >
                        <span>{destination}</span>
                        <span className="font-bold">{airportCode}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </PlatformShell>
  );
}

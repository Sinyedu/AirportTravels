import Link from "next/link";

import { airports } from "@/entities/airport/airports";
import { DepartureBoard } from "@/features/departures/components/DepartureBoard";
import { PageSection } from "@/shared/ui/PageSection";

const allAirports = airports.flatMap((country) => {
  return country.cities.map((airport) => ({
    ...airport,
    country: country.country,
  }));
});

const featuredAirports = [
  {
    code: "CPH",
    name: "Copenhagen",
    country: "Denmark",
    detail: "Scandinavian hub with fast European reach.",
    stat: "18 gates",
  },
  {
    code: "LHR",
    name: "London Heathrow",
    country: "United Kingdom",
    detail: "High-volume global connections and long-haul options.",
    stat: "4 terminals",
  },
  {
    code: "FRA",
    name: "Frankfurt",
    country: "Germany",
    detail: "Central European transfers with dense onward service.",
    stat: "292 routes",
  },
];

const popularDestinations = [
  { city: "Paris", reason: "Weekend culture", code: "CDG" },
  { city: "Oslo", reason: "Northern escapes", code: "OSL" },
  { city: "Berlin", reason: "Fast city breaks", code: "BER" },
  { city: "New York", reason: "Transatlantic launch", code: "JFK" },
];

const quickLinks = [
  {
    href: "/airports",
    title: "Airport directory",
    description: "Browse supported airports by country and airport code.",
    meta: `${allAirports.length} airports`,
  },
  {
    href: "/departures",
    title: "Departure board",
    description: "Select an airport and inspect current flights, gates, and status.",
    meta: "Live filters",
  },
  {
    href: "/airspace",
    title: "Airspace overview",
    description: "Compare operating conditions across active regional hubs.",
    meta: "Delay signals",
  },
  {
    href: "/discover",
    title: "Destination ideas",
    description: "Scan curated regions and airport groups for your next route.",
    meta: "Trip planning",
  },
];

export function HomePage() {
  return (
    <div>
      <HeroSection />

      <PageSection
        description="A tighter view of useful hubs, destination ideas, live airspace signals, and the departure tools already available in the platform."
        eyebrow="Explore the network"
        title="Plan from airport context, not just city names"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {featuredAirports.map((airport) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1"
              key={airport.code}
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {airport.country}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-950">
                    {airport.name}
                  </h3>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-bold text-sky-700">
                  {airport.code}
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-600">{airport.detail}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {airport.stat}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        className="border-y border-slate-200"
        description="Quickly scan routes that make sense for short breaks, northern escapes, and long-haul starts."
        eyebrow="Popular destinations"
        title="Routes worth checking first"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popularDestinations.map((destination) => (
            <Link
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-sky-200 hover:bg-sky-50/50"
              href={`/airports?q=${destination.code}`}
              key={destination.code}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-950">
                    {destination.city}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {destination.reason}
                  </p>
                </div>
                <span className="text-sm font-bold text-slate-400 transition-colors group-hover:text-sky-700">
                  {destination.code}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection
        description="The airspace view gives a compact operating picture for key airports before you choose where to fly."
        eyebrow="Explore live airspace"
        title="See operational signals across the network"
      >
        <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Tracked hubs" value={String(allAirports.length)} />
            <MetricCard label="Countries" value={String(airports.length)} />
            <MetricCard label="Live board rows" value="25+" />
        </div>
      </PageSection>

      <PageSection
        description="Direct paths into the core product areas without forcing a user through a marketing page."
        eyebrow="Quick navigation"
        title="Move straight to the right tool"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {quickLinks.map((item) => (
            <Link
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
              href={item.href}
              key={item.href}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {item.meta}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors group-hover:border-sky-200 group-hover:bg-sky-50 group-hover:text-sky-700">
                  Go
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection
        className="pb-0"
        description="The existing board stays available on the homepage for quick airport checks."
        eyebrow="Departure board"
        title="Check a departure board"
      >
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <DepartureBoard headingLevel="h2" />
        </div>
      </PageSection>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="p-6 md:p-10 lg:p-12">
        <div className="relative z-10 flex min-h-[420px] max-w-4xl flex-col justify-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Airport and route intelligence
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 md:text-6xl lg:text-7xl">
            Find the airport that makes the next trip work.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Search airports, compare live departure context, and jump into route
            ideas with a calmer planning surface built for travelers.
          </p>

          <form
            action="/airports"
            className="mt-8 flex max-w-2xl flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2 shadow-sm sm:flex-row"
          >
            <label className="sr-only" htmlFor="airport-search">
              Search airports
            </label>
            <input
              className="min-h-12 flex-1 rounded-md border border-transparent bg-white px-4 text-base text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              id="airport-search"
              list="airport-options"
              name="q"
              placeholder="Search by city, airport, or code"
              type="search"
            />
            <datalist id="airport-options">
              {allAirports.map((airport) => (
                <option
                  key={airport.code}
                  value={`${airport.name} ${airport.code}`}
                />
              ))}
            </datalist>
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              type="submit"
            >
              Search airports
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
              {allAirports.length} airports
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
              {airports.length} countries
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
              Live departures
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-slate-950">{value}</p>
    </article>
  );
}

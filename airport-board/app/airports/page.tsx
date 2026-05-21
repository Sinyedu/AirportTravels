import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { airports } from "@/data/airports";

export default function AirportsPage() {
  const countries = new Set(airports.map((airport) => airport.country));

  return (
    <PageShell>
      <section aria-labelledby="airports-title">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
            Airport network
          </p>
          <h1 id="airports-title" className="text-3xl font-semibold text-white">
            {airports.length} monitored airports across {countries.size} countries
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {airports.map((airport) => (
            <article key={airport.code} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{airport.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{airport.country}</p>
                </div>
                <span className="rounded-md bg-slate-800 px-3 py-1 text-sm font-semibold text-sky-200">
                  {airport.code}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                {airport.runways} runways / {airport.terminals} terminals
              </p>
              <Link
                href={`/airports/${airport.code.toLowerCase()}`}
                className="mt-5 inline-flex rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-100 transition hover:border-sky-400"
              >
                Open dashboard
              </Link>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

import homepageContent from "@/content/homepage.json";
import { AirportSearch } from "@/components/homepage/AirportSearch";

export function HeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <div className="space-y-7">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
            {homepageContent.hero.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-white md:text-6xl">
            {homepageContent.hero.title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            {homepageContent.hero.description}
          </p>
        </div>

        <div className="max-w-3xl rounded-lg border border-slate-800 bg-slate-900/70 p-5">
          <AirportSearch />
        </div>
      </div>

      <aside className="grid gap-4">
        {homepageContent.metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-lg border border-slate-800 bg-slate-900/70 p-5"
          >
            <p className="text-sm uppercase tracking-[0.14em] text-slate-400">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {metric.description}
            </p>
          </article>
        ))}
      </aside>

      <div className="lg:col-span-2">
        <h2 className="mb-4 text-lg font-semibold text-white">
          {homepageContent.capabilitiesTitle}
        </h2>
        <div className="grid gap-3 md:grid-cols-5">
          {homepageContent.capabilities.map((capability) => (
            <div
              key={capability}
              className="rounded-md border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200"
            >
              {capability}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

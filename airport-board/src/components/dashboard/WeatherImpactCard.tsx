import type { WeatherImpact } from "@/data/weather";
import dashboardContent from "@/content/dashboard.json";

type WeatherImpactCardProps = {
  weather: WeatherImpact;
};

export function WeatherImpactCard({ weather }: WeatherImpactCardProps) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {dashboardContent.labels.weatherImpact}
          </h2>
          <p className="mt-1 text-sm text-slate-400">{weather.runwayMode}</p>
        </div>
        <span className="rounded-md border border-slate-700 px-3 py-1 text-sm text-sky-200">
          {weather.impactLevel}
        </span>
      </div>
      <p className="mt-5 text-3xl font-semibold text-white">{weather.condition}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{weather.summary}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-slate-950/70 p-3">
          <dt className="text-slate-500">Visibility</dt>
          <dd className="mt-1 font-medium text-white">{weather.visibilityKm} km</dd>
        </div>
        <div className="rounded-md bg-slate-950/70 p-3">
          <dt className="text-slate-500">Wind</dt>
          <dd className="mt-1 font-medium text-white">{weather.windKts} kt</dd>
        </div>
      </dl>
    </section>
  );
}

import dashboardContent from "@/content/dashboard.json";

type LiveAirspacePanelProps = {
  activeFlights: number;
};

export function LiveAirspacePanel({ activeFlights }: LiveAirspacePanelProps) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {dashboardContent.labels.liveAirspace}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {dashboardContent.descriptions.liveAirspace}
          </p>
        </div>
        <span className="rounded-md bg-slate-800 px-3 py-1 text-sm text-slate-300">
          {activeFlights} tracked
        </span>
      </div>
      <div className="mt-5 aspect-[16/9] rounded-md border border-dashed border-slate-700 bg-slate-950/80 p-4">
        <div className="grid h-full place-items-center text-center text-sm text-slate-500">
          OpenSky aircraft layer pending
        </div>
      </div>
    </section>
  );
}

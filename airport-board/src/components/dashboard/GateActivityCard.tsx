import type { GateActivity } from "@/data/operations";
import dashboardContent from "@/content/dashboard.json";

type GateActivityCardProps = {
  gates: GateActivity[];
};

export function GateActivityCard({ gates }: GateActivityCardProps) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <h2 className="text-lg font-semibold text-white">
        {dashboardContent.labels.gateActivity}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {gates.map((gate) => (
          <article key={gate.gate} className="rounded-md bg-slate-950/70 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-white">{gate.gate}</p>
              <span className="text-xs uppercase tracking-[0.12em] text-slate-400">
                {gate.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{gate.flight}</p>
            <p className="mt-1 text-xs text-slate-500">Next {gate.nextMilestone}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import type { OperationalAlert } from "@/data/operations";
import dashboardContent from "@/content/dashboard.json";

type OperationalAlertsProps = {
  alerts: OperationalAlert[];
};

const severityClass: Record<OperationalAlert["severity"], string> = {
  Advisory: "border-sky-500/40 text-sky-200",
  Watch: "border-amber-500/40 text-amber-200",
  Critical: "border-rose-500/50 text-rose-200"
};

export function OperationalAlerts({ alerts }: OperationalAlertsProps) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <h2 className="text-lg font-semibold text-white">
        {dashboardContent.labels.operationalAlerts}
      </h2>
      <div className="mt-4 space-y-3">
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className={`rounded-md border bg-slate-950/60 p-4 ${severityClass[alert.severity]}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{alert.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{alert.detail}</p>
              </div>
              <span className="rounded bg-slate-800 px-2 py-1 text-xs">
                {alert.severity}
              </span>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-500">
              {alert.area}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

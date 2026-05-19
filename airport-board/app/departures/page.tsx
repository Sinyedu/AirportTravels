import { DepartureBoard } from "@/features/departures/components/DepartureBoard";
import { PlatformShell } from "@/shared/ui/PlatformShell";

export default function DeparturesPage() {
  return (
    <PlatformShell>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <DepartureBoard />
      </div>
    </PlatformShell>
  );
}

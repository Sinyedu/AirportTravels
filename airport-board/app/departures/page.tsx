import { DepartureBoard } from "@/features/departures/components/DepartureBoard";
import { PlatformShell } from "@/shared/ui/PlatformShell";

export default function DeparturesPage() {
  return (
    <PlatformShell>
      <DepartureBoard />
    </PlatformShell>
  );
}

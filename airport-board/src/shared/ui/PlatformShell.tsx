import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";

type PlatformShellProps = {
  children: ReactNode;
};

export function PlatformShell({ children }: PlatformShellProps) {
  return <PageShell>{children}</PageShell>;
}

import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/shared/ui/Container";
import { Navigation } from "@/shared/ui/Navigation";

type PlatformShellProps = {
  children: ReactNode;
};

export function PlatformShell({ children }: PlatformShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <Container className="flex min-h-20 flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link className="group inline-flex items-center gap-3" href="/">
            <span className="grid size-10 place-items-center rounded-full bg-slate-950 text-sm font-bold text-white shadow-sm transition-transform group-hover:-translate-y-0.5">
              WF
            </span>
            <span>
              <span className="block text-base font-semibold tracking-normal text-slate-950">
                Where to Fly?
              </span>
              <span className="block text-xs font-medium text-slate-500">
                Airport intelligence
              </span>
            </span>
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Navigation />
            <Link
              className="inline-flex h-10 items-center justify-center rounded-full bg-sky-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
              href="/departures"
            >
              Open board
            </Link>
          </div>
        </Container>
      </header>

      <Container className="py-8 md:py-10">{children}</Container>
    </main>
  );
}

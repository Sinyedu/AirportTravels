import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8 md:py-10">
        {children}
      </div>
    </main>
  );
}

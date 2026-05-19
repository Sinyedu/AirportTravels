import Link from "next/link";
import type { ReactNode } from "react";

const navigationItems = [
  { href: "/", label: "Board" },
  { href: "/airports", label: "Airports" },
  { href: "/departures", label: "Departures" },
  { href: "/airspace", label: "Airspace" },
  { href: "/discover", label: "Discover" },
];

type PlatformShellProps = {
  children: ReactNode;
};

export function PlatformShell({ children }: PlatformShellProps) {
  return (
    <main className="min-h-screen bg-black text-yellow-400 font-mono">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 md:px-10 md:py-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-yellow-400/40 pb-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-xl font-bold tracking-normal">
            Where to Fly?
          </Link>

          <nav aria-label="Primary navigation">
            <ul className="flex flex-wrap gap-2 text-sm">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex border border-yellow-400/50 px-3 py-2 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}

import Link from "next/link";

const navigationItems = [
  { href: "/", label: "Operations" },
  { href: "/airports", label: "Airports" },
  { href: "/departures", label: "Departures" }
];

export function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-semibold tracking-normal text-white">
            AirportOps Dashboard
          </span>
          <span className="text-xs uppercase tracking-[0.18em] text-sky-300">
            Operations control
          </span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap gap-2 text-sm">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-md border border-slate-700 px-3 py-2 text-slate-200 transition hover:border-sky-400 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

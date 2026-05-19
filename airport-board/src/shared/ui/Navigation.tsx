"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/cn";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/airports", label: "Airports" },
  { href: "/departures", label: "Departures" },
  { href: "/airspace", label: "Airspace" },
  { href: "/discover", label: "Discover" },
];

export function Navigation() {
  const pathname = usePathname() ?? "/";

  return (
    <nav aria-label="Primary navigation">
      <ul className="flex flex-wrap items-center gap-1.5 text-sm font-medium">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 items-center rounded-full px-4 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950",
                  isActive && "bg-slate-950 text-white hover:bg-slate-900 hover:text-white",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

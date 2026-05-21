"use client";

import { useRouter } from "next/navigation";
import { useAirportSearch } from "@/hooks/useAirportSearch";
import homepageContent from "@/content/homepage.json";

export function AirportSearch() {
  const router = useRouter();
  const { query, setQuery, selectedCode, setSelectedCode, filteredAirports } =
    useAirportSearch();

  function openDashboard() {
    const code = selectedCode || filteredAirports[0]?.code;

    if (!code) {
      return;
    }

    router.push(`/airports/${code.toLowerCase()}`);
  }

  return (
    <form
      className="grid gap-3 md:grid-cols-[1fr_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        openDashboard();
      }}
    >
      <div className="grid gap-2">
        <label htmlFor="airport-search" className="text-sm font-medium text-slate-200">
          {homepageContent.hero.searchLabel}
        </label>
        <input
          id="airport-search"
          list="airport-options"
          value={query}
          onChange={(event) => {
            const nextQuery = event.target.value;
            const exactMatch = filteredAirports.find((airport) => {
              return `${airport.name} (${airport.code})` === nextQuery;
            });

            setQuery(nextQuery);
            setSelectedCode(exactMatch?.code ?? "");
          }}
          placeholder={homepageContent.hero.searchPlaceholder}
          className="min-h-12 rounded-md border border-slate-700 bg-slate-900 px-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
        />
        <datalist id="airport-options">
          {filteredAirports.map((airport) => (
            <option key={airport.code} value={`${airport.name} (${airport.code})`} />
          ))}
        </datalist>
      </div>

      <button
        type="submit"
        className="min-h-12 self-end rounded-md bg-sky-400 px-5 font-semibold text-slate-950 transition hover:bg-sky-300"
      >
        {homepageContent.hero.primaryAction}
      </button>
    </form>
  );
}

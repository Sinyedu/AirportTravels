# Where to Fly? Architecture

## Suggested Folder Structure

```text
app/
  api/flights/route.ts
  airports/page.tsx
  airspace/page.tsx
  departures/page.tsx
  discover/page.tsx
  layout.tsx
  page.tsx
src/
  entities/
    airport/
    flight/
    weather/
  features/
    departures/
      components/
      hooks/
      lib/
      __tests__/
  shared/
    ui/
  test/
    fixtures/
```

`app` owns routing and route-level composition. `src/entities` owns domain data and types. `src/features` owns user-facing workflows. `src/shared` is for reusable, domain-neutral UI and utilities.

## Refactoring Plan

1. Keep route files thin and compose feature components from `src/features`.
2. Move domain data and types out of `app/src` into `src/entities`.
3. Keep generated/mock data behind typed service functions until a real API or database exists.
4. Extract board state, sorting, filtering, and pagination into feature hooks/lib functions.
5. Grow each new product area as its own feature only when behavior becomes meaningful.

## Components, Services, And Hooks To Extract

- `DepartureBoard`: feature-level screen component for the departure board.
- `useDepartureBoard`: client state orchestration for selected airport, filters, sorting, and pagination.
- `useFlights`: polling hook for simulated flight/weather data.
- `flightBoard.ts`: pure sorting, filtering, and pagination helpers.
- `AirportSelector`, `FlightFilters`, `SortControls`, `FlightTable`, `FlightRow`: small feature components.
- `entities/flight/flights.ts`: current generated flight service and flight types.
- `entities/airport/airports.ts`: airport catalog and airport types.
- `entities/weather/weather.ts`: weather simulation and weather types.

## Route Structure Proposal

- `/`: current board entry point.
- `/departures`: dedicated departures board route.
- `/airports`: airport overview and airport catalog.
- `/airspace`: live operating summary from generated flight/weather data.
- `/discover`: destination discovery grouped by travel intent.
- `/api/flights`: typed generated flight response for future client/server consumers.

## Recommended Shared UI And Layout

- `PlatformShell`: app-wide shell with brand and primary navigation.
- Future shared candidates: `PageHeader`, `MetricTile`, `DataTable`, `EmptyState`, `FormField`, and `Select`.
- Keep flight-specific table/status UI inside `features/departures` until another feature truly reuses it.

## Safe Refactors Applied

- Moved source code from `app/src` to root `src` to align with App Router conventions.
- Updated the TypeScript and Jest aliases so `@/` resolves to `src`.
- Extracted the root page into `DepartureBoard` plus `useDepartureBoard`.
- Removed the previous `any` sorting path by using typed sort helpers.
- Added route pages for airport overview, departures, live airspace, and destination discovery.
- Added `data-testid="flights-table"` to match the existing Playwright test.

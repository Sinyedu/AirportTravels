# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: airport-board.spec.ts >> Airport Departure Board >> User can view flights board
- Location: e2e\airport-board.spec.ts:8:7

# Error details

```
Error: expect(locator).toBeDisabled() failed

Locator:  locator('button').filter({ hasText: 'Next' })
Expected: disabled
Received: enabled
Timeout:  5000ms

Call log:
  - Expect "toBeDisabled" with timeout 5000ms
  - waiting for locator('button').filter({ hasText: 'Next' })
    9 × locator resolved to <button class="px-3 py-1 border border-yellow-400 text-yellow-400">Next</button>
      - unexpected value "enabled"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
    - main [ref=e2]:
        - heading "Airport Departure Board" [level=1] [ref=e3]
        - generic [ref=e4]:
            - generic [ref=e5]: Select Country
            - combobox "Select Country" [ref=e6]:
                - option "-- Choose --"
                - option "Denmark" [selected]
                - option "United Kingdom"
                - option "Germany"
                - option "France"
                - option "USA"
        - generic [ref=e7]:
            - generic [ref=e8]: Select Airport
            - combobox "Select Airport" [ref=e9]:
                - option "-- Choose --"
                - option "Copenhagen (CPH)" [selected]
                - option "Billund (BLL)"
                - option "Aalborg (AAL)"
        - generic [ref=e10]: "Weather: Storm"
        - generic [ref=e11]:
            - 'heading "Departures: Copenhagen (CPH)" [level=2] [ref=e12]'
            - table [ref=e13]:
                - rowgroup [ref=e14]:
                    - row "Flight Destination Time Gate Status" [ref=e15]:
                        - columnheader "Flight" [ref=e16]
                        - columnheader "Destination" [ref=e17]
                        - columnheader "Time" [ref=e18]
                        - columnheader "Gate" [ref=e19]
                        - columnheader "Status" [ref=e20]
                - rowgroup [ref=e21]:
                    - row "AF841 London 16:48 C14 Departed" [ref=e22]:
                        - cell "AF841" [ref=e23]
                        - cell "London" [ref=e24]
                        - cell "16:48" [ref=e25]
                        - cell "C14" [ref=e26]
                        - cell "Departed" [ref=e27]
                    - row "BA464 Paris 18:59 C10 Scheduled" [ref=e28]:
                        - cell "BA464" [ref=e29]
                        - cell "Paris" [ref=e30]
                        - cell "18:59" [ref=e31]
                        - cell "C10" [ref=e32]
                        - cell "Scheduled" [ref=e33]
                    - row "BA762 New York 18:11 B9 Boarding" [ref=e34]:
                        - cell "BA762" [ref=e35]
                        - cell "New York" [ref=e36]
                        - cell "18:11" [ref=e37]
                        - cell "B9" [ref=e38]
                        - cell "Boarding" [ref=e39]
                    - row "BA702 Paris 18:13 A13 Delayed (Storm)" [ref=e40]:
                        - cell "BA702" [ref=e41]
                        - cell "Paris" [ref=e42]
                        - cell "18:13" [ref=e43]
                        - cell "A13" [ref=e44]
                        - cell "Delayed (Storm)" [ref=e45]
                    - row "DL959 Berlin 17:04 A16 Departed" [ref=e46]:
                        - cell "DL959" [ref=e47]
                        - cell "Berlin" [ref=e48]
                        - cell "17:04" [ref=e49]
                        - cell "A16" [ref=e50]
                        - cell "Departed" [ref=e51]
            - generic [ref=e52]:
                - button "Previous" [disabled] [ref=e53]
                - generic [ref=e54]: Page 1 of 2
                - button "Next" [ref=e55]
    - button "Open Next.js Dev Tools" [ref=e61] [cursor=pointer]:
        - img [ref=e62]
    - alert [ref=e65]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  |
  3  | test.describe("Airport Departure Board", () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto("https://airport-travels.vercel.app/");
  6  |   });
  7  |
  8  |   test("User can view flights board", async ({ page }) => {
  9  |     const countrySelect = page.locator("#country-select");
  10 |     await expect(countrySelect).toBeVisible();
  11 |     await countrySelect.selectOption("Denmark");
  12 |
  13 |     const airportSelect = page.locator("#airport-select");
  14 |     await expect(airportSelect).toBeVisible();
  15 |     await airportSelect.selectOption("Copenhagen");
  16 |
  17 |     const weather = page.locator("text=Weather:");
  18 |     await expect(weather).toBeVisible();
  19 |
  20 |     const table = page.locator("[data-testid='flights-table']");
  21 |     await expect(table).toBeVisible();
  22 |
  23 |     const rows = table.locator("tbody tr");
  24 |     const rowCount = await rows.count();
  25 |     await expect(rowCount).toBeGreaterThan(0);
  26 |
  27 |     const prevButton = page.locator("button", { hasText: "Previous" });
  28 |     const nextButton = page.locator("button", { hasText: "Next" });
  29 |
  30 |     await expect(prevButton).toBeDisabled();
  31 |
  32 |     const flightsPerPage = 5;
  33 |     const totalPages = Math.ceil(rowCount / flightsPerPage);
  34 |     if (totalPages > 1) {
  35 |       await expect(nextButton).not.toBeDisabled();
  36 |
  37 |       await nextButton.click();
  38 |       const pageLabel = page.locator("text=Page 2 of");
  39 |       await expect(pageLabel).toBeVisible();
  40 |
  41 |       await expect(prevButton).not.toBeDisabled();
  42 |     } else {
> 43 |       await expect(nextButton).toBeDisabled();
     |                                ^ Error: expect(locator).toBeDisabled() failed
  44 |     }
  45 |   });
  46 |
  47 |   test("Displays 'No flights available' for airport with no flights", async ({
  48 |     page,
  49 |   }) => {
  50 |     await page.locator("#country-select").selectOption("France");
  51 |
  52 |     await page.locator("#airport-select").selectOption("Nice");
  53 |
  54 |     // Manually simulate no flights (optional: if generateFlights allows override)
  55 |     // current setup, flights are always generated, so this test may be more relevant
  56 |     const table = page.locator("[data-testid='flights-table']");
  57 |     await expect(table).toBeVisible();
  58 |   });
  59 | });
  60 |
```

# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: airport-board.spec.ts >> Airport Departure Board >> Page does not crash for any airport
- Location: e2e\airport-board.spec.ts:79:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid=\'flights-table\']')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-testid=\'flights-table\']')

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
        - option "Denmark"
        - option "United Kingdom"
        - option "Germany"
        - option "France" [selected]
        - option "USA"
    - generic [ref=e7]:
      - generic [ref=e8]: Select Airport
      - combobox "Select Airport" [ref=e9]:
        - option "-- Choose --"
        - option "Paris Charles de Gaulle (CDG)"
        - option "Nice (NCE)" [selected]
        - option "Lyon (LYS)"
    - generic [ref=e10]: "Weather: Rain"
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e13]:
          - checkbox "Show Delayed" [checked] [ref=e14]
          - text: Show Delayed
        - generic [ref=e15]:
          - checkbox "Show Boarding/Final Call" [checked] [ref=e16]
          - text: Show Boarding/Final Call
      - generic [ref=e17]:
        - text: "Sort by:"
        - combobox [ref=e18]:
          - option "-- None --" [selected]
          - option "Time"
          - option "Countdown"
          - option "Destination"
          - option "Flight"
          - option "Gate"
          - option "Status"
        - button "↑" [ref=e19]
    - 'heading "Departures: Nice (NCE)" [level=2] [ref=e20]'
    - table [ref=e21]:
      - rowgroup [ref=e22]:
        - row "Flight Destination Time Countdown Gate Status" [ref=e23]:
          - columnheader "Flight" [ref=e24]
          - columnheader "Destination" [ref=e25]
          - columnheader "Time" [ref=e26]
          - columnheader "Countdown" [ref=e27]
          - columnheader "Gate" [ref=e28]
          - columnheader "Status" [ref=e29]
      - rowgroup [ref=e30]:
        - row "BA666 New York 20:56 Departed A19 ✈️ Departed" [ref=e31]:
          - cell "BA666" [ref=e32]
          - cell "New York" [ref=e33]
          - cell "20:56" [ref=e34]
          - cell "Departed" [ref=e35]
          - cell "A19" [ref=e36]
          - cell "✈️ Departed" [ref=e37]
        - row "SK946 Berlin 22:00 19 min A17 🛫 Boarding" [ref=e38]:
          - cell "SK946" [ref=e39]
          - cell "Berlin" [ref=e40]
          - cell "22:00" [ref=e41]
          - cell "19 min" [ref=e42]
          - cell "A17" [ref=e43]
          - cell "🛫 Boarding" [ref=e44]
        - row "DL552 Oslo 21:40 Departed C12 ✈️ Departed" [ref=e45]:
          - cell "DL552" [ref=e46]
          - cell "Oslo" [ref=e47]
          - cell "21:40" [ref=e48]
          - cell "Departed" [ref=e49]
          - cell "C12" [ref=e50]
          - cell "✈️ Departed" [ref=e51]
        - row "SK237 Oslo 22:45 64 min C6 🟢 Scheduled" [ref=e52]:
          - cell "SK237" [ref=e53]
          - cell "Oslo" [ref=e54]
          - cell "22:45" [ref=e55]
          - cell "64 min" [ref=e56]
          - cell "C6" [ref=e57]
          - cell "🟢 Scheduled" [ref=e58]
        - row "BA743 Oslo 22:46 65 min C7 🟢 Scheduled" [ref=e59]:
          - cell "BA743" [ref=e60]
          - cell "Oslo" [ref=e61]
          - cell "22:46" [ref=e62]
          - cell "65 min" [ref=e63]
          - cell "C7" [ref=e64]
          - cell "🟢 Scheduled" [ref=e65]
    - generic [ref=e66]:
      - button "Previous" [disabled] [ref=e67]
      - generic [ref=e68]: Page 1 of 5
      - button "Next" [ref=e69]
  - alert [ref=e70]
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
  8  |   test("User can view flights board and weather", async ({ page }) => {
  9  |     // Select country
  10 |     await page.locator("#country-select").selectOption("Denmark");
  11 | 
  12 |     // Select airport
  13 |     await page.locator("#airport-select").selectOption("Copenhagen");
  14 | 
  15 |     // Weather
  16 |     await expect(page.locator("text=Weather:")).toBeVisible();
  17 | 
  18 |     // Flight table
  19 |     const table = page.locator("[data-testid='flights-table']");
  20 |     await expect(table).toBeVisible();
  21 | 
  22 |     // Pagination
  23 |     const prevButton = page.getByRole("button", { name: "Previous" });
  24 |     const nextButton = page.getByRole("button", { name: "Next" });
  25 | 
  26 |     await expect(prevButton).toBeDisabled();
  27 | 
  28 |     // Only test clicking if next is enabled
  29 |     if (await nextButton.isEnabled()) {
  30 |       await nextButton.click();
  31 |       await expect(prevButton).toBeEnabled();
  32 |     }
  33 |   });
  34 | 
  35 |   test("Filters work correctly", async ({ page }) => {
  36 |     await page.locator("#country-select").selectOption("Denmark");
  37 |     await page.locator("#airport-select").selectOption("Copenhagen");
  38 | 
  39 |     const showDelayedCheckbox = page.getByLabel("Show Delayed");
  40 |     const showBoardingCheckbox = page.getByLabel("Show Boarding/Final Call");
  41 | 
  42 |     await showDelayedCheckbox.uncheck();
  43 |     await showBoardingCheckbox.uncheck();
  44 | 
  45 |     const table = page.locator("[data-testid='flights-table']");
  46 |     const rowsAfter = await table.locator("tbody tr").count();
  47 | 
  48 |     // Just verify it doesn't crash + still renders
  49 |     expect(rowsAfter).toBeGreaterThanOrEqual(0);
  50 |   });
  51 | 
  52 |   test("Sorting works correctly", async ({ page }) => {
  53 |     await page.locator("#country-select").selectOption("Denmark");
  54 |     await page.locator("#airport-select").selectOption("Copenhagen");
  55 | 
  56 |     // Target the correct sort dropdown (IMPORTANT)
  57 |     const sortSelect = page.locator("select").nth(2);
  58 | 
  59 |     await sortSelect.selectOption("destination");
  60 | 
  61 |     const firstAfter = await page
  62 |       .locator("tbody tr:first-child td:nth-child(2)")
  63 |       .innerText();
  64 | 
  65 |     // Might not always change due to random data, so softer check:
  66 |     expect(firstAfter).toBeTruthy();
  67 | 
  68 |     // Toggle sort order
  69 |     const sortButton = page.getByRole("button", { name: /↑|↓/ });
  70 |     await sortButton.click();
  71 | 
  72 |     const firstDesc = await page
  73 |       .locator("tbody tr:first-child td:nth-child(2)")
  74 |       .innerText();
  75 | 
  76 |     expect(firstDesc).toBeTruthy();
  77 |   });
  78 | 
  79 |   test("Page does not crash for any airport", async ({ page }) => {
  80 |     await page.locator("#country-select").selectOption("France");
  81 |     await page.locator("#airport-select").selectOption("Nice");
  82 | 
> 83 |     await expect(page.locator("[data-testid='flights-table']")).toBeVisible();
     |                                                                 ^ Error: expect(locator).toBeVisible() failed
  84 |   });
  85 | });
  86 | 
```
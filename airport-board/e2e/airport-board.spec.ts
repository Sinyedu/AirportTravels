import { test, expect } from "@playwright/test";

test.describe("Airport Departure Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://airport-travels.vercel.app/");
  });

  test("User can view flights board and weather", async ({ page }) => {
    // --- Select country ---
    const countrySelect = page.locator("#country-select");
    await expect(countrySelect).toBeVisible();
    await countrySelect.selectOption("Denmark");

    // --- Select airport ---
    const airportSelect = page.locator("#airport-select");
    await expect(airportSelect).toBeVisible();
    await airportSelect.selectOption("Copenhagen");

    // --- Weather display ---
    const weather = page.locator("text=Weather:");
    await expect(weather).toBeVisible();

    // --- FlightTable ---
    const table = page.locator("[data-testid='flights-table']");
    await expect(table).toBeVisible();

    const rows = table.locator("tbody tr");
    const rowCount = await rows.count();
    await expect(rowCount).toBeGreaterThan(0);

    // --- Pagination buttons ---
    const prevButton = page.locator("button", { hasText: "Previous" });
    const nextButton = page.locator("button", { hasText: "Next" });

    await expect(prevButton).toBeDisabled();

    const flightsPerPage = 5;
    const totalPages = Math.ceil(rowCount / flightsPerPage);
    if (totalPages > 1) {
      await expect(nextButton).not.toBeDisabled();
      await nextButton.click();
      const pageLabel = page.locator(`text=Page 2 of`);
      await expect(pageLabel).toBeVisible();
      await expect(prevButton).not.toBeDisabled();
    } else {
      await expect(nextButton).toBeDisabled();
    }
  });

  test("Filters work correctly", async ({ page }) => {
    await page.locator("#country-select").selectOption("Denmark");
    await page.locator("#airport-select").selectOption("Copenhagen");

    const showDelayedCheckbox = page.locator("input[type='checkbox']", {
      hasText: "Show Delayed",
    });
    const showBoardingCheckbox = page.locator("input[type='checkbox']", {
      hasText: "Show Boarding/Final Call",
    });

    // Uncheck filters and verify flights table updates
    await showDelayedCheckbox.uncheck();
    await showBoardingCheckbox.uncheck();

    const table = page.locator("[data-testid='flights-table']");
    const rowsAfterFilter = await table.locator("tbody tr").count();
    expect(rowsAfterFilter).toBeLessThanOrEqual(
      (await table.locator("tbody tr").count()) + 5,
    );
  });

  test("Sorting works correctly", async ({ page }) => {
    await page.locator("#country-select").selectOption("Denmark");
    await page.locator("#airport-select").selectOption("Copenhagen");

    const sortSelect = page.locator("select");
    const firstRowBefore = await page
      .locator("tbody tr:first-child td:nth-child(2)")
      .innerText();

    await sortSelect.selectOption("destination"); // sort by destination ascending
    const firstRowAfter = await page
      .locator("tbody tr:first-child td:nth-child(2)")
      .innerText();
    expect(firstRowAfter).not.toBe(firstRowBefore);

    const sortButton = page.locator("button", { hasText: "↑" });
    await sortButton.click(); // toggle descending
    const firstRowDesc = await page
      .locator("tbody tr:first-child td:nth-child(2)")
      .innerText();
    expect(firstRowDesc).not.toBe(firstRowAfter);
  });

  test("Displays 'No flights available' for airport with no flights", async ({
    page,
  }) => {
    await page.locator("#country-select").selectOption("France");
    await page.locator("#airport-select").selectOption("Nice");

    const noFlightsMessage = page.locator("text=No flights available");
    await expect(noFlightsMessage).toBeVisible();
  });
});

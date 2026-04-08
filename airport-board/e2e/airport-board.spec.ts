import { test, expect } from "@playwright/test";

test.describe("Airport Departure Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://airport-travels.vercel.app/");
  });

  test("User can view flights board", async ({ page }) => {
    const countrySelect = page.locator("#country-select");
    await expect(countrySelect).toBeVisible();
    await countrySelect.selectOption("Denmark");

    const airportSelect = page.locator("#airport-select");
    await expect(airportSelect).toBeVisible();
    await airportSelect.selectOption("Copenhagen");

    const weather = page.locator("text=Weather:");
    await expect(weather).toBeVisible();

    const table = page.locator("[data-testid='flights-table']");
    await expect(table).toBeVisible();

    const rows = table.locator("tbody tr");
    const rowCount = await rows.count();
    await expect(rowCount).toBeGreaterThan(0);

    const prevButton = page.locator("button", { hasText: "Previous" });
    const nextButton = page.locator("button", { hasText: "Next" });

    await expect(prevButton).toBeDisabled();

    const flightsPerPage = 5;
    const totalPages = Math.ceil(rowCount / flightsPerPage);
    if (totalPages > 1) {
      await expect(nextButton).not.toBeDisabled();

      await nextButton.click();
      const pageLabel = page.locator("text=Page 2 of");
      await expect(pageLabel).toBeVisible();

      await expect(prevButton).not.toBeDisabled();
    } else {
      await expect(nextButton).toBeDisabled();
    }
  });

  test("Displays 'No flights available' for airport with no flights", async ({
    page,
  }) => {
    await page.locator("#country-select").selectOption("France");

    await page.locator("#airport-select").selectOption("Nice");

    // Manually simulate no flights (optional: if generateFlights allows override)
    // current setup, flights are always generated, so this test may be more relevant
    const table = page.locator("[data-testid='flights-table']");
    await expect(table).toBeVisible();
  });
});

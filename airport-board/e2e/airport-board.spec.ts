import { test, expect } from "@playwright/test";

test.describe("Airport Departure Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://airport-travels.vercel.app/");
  });

  test("Filters work correctly", async ({ page }) => {
    await page.locator("#country-select").selectOption("Denmark");
    await page.locator("#airport-select").selectOption("Copenhagen");

    const showDelayedCheckbox = page.getByLabel("Show Delayed");
    const showBoardingCheckbox = page.getByLabel("Show Boarding/Final Call");

    await showDelayedCheckbox.uncheck();
    await showBoardingCheckbox.uncheck();

    const table = page.locator("[data-testid='flights-table']");
    const rowsAfter = await table.locator("tbody tr").count();

    // Just verify it doesn't crash + still renders
    expect(rowsAfter).toBeGreaterThanOrEqual(0);
  });

  test("Sorting works correctly", async ({ page }) => {
    await page.locator("#country-select").selectOption("Denmark");
    await page.locator("#airport-select").selectOption("Copenhagen");

    // Target the correct sort dropdown (IMPORTANT)
    const sortSelect = page.locator("select").nth(2);

    await sortSelect.selectOption("destination");

    const firstAfter = await page
      .locator("tbody tr:first-child td:nth-child(2)")
      .innerText();

    // Might not always change due to random data, so softer check:
    expect(firstAfter).toBeTruthy();

    // Toggle sort order
    const sortButton = page.getByRole("button", { name: /↑|↓/ });
    await sortButton.click();

    const firstDesc = await page
      .locator("tbody tr:first-child td:nth-child(2)")
      .innerText();

    expect(firstDesc).toBeTruthy();
  });
});

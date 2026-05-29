import { expect, test } from "@playwright/test";

test.describe("AirportOps dashboard", () => {
  test("shows the homepage navigation and operations modules", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /airport operations monitoring for busy airfields/i,
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /airports/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /departures/i })).toBeVisible();
    await expect(page.getByText("Airport status overview")).toBeVisible();
    await expect(page.getByText("Route activity trends")).toBeVisible();
  });

  test("opens an airport dashboard from search", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Select airport").fill("Copenhagen (CPH)");
    await page.getByRole("button", { name: "Open dashboard" }).click();

    await expect(page).toHaveURL(/\/airports\/cph$/);
    await expect(page.getByRole("heading", { name: /copenhagen \(cph\)/i })).toBeVisible();
    await expect(page.getByText("Airport status overview")).toBeVisible();
  });

  test("opens the first matching airport when search text is partial", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Select airport").fill("Amsterdam");
    await page.getByRole("button", { name: "Open dashboard" }).click();

    await expect(page).toHaveURL(/\/airports\/ams$/);
    await expect(
      page.getByRole("heading", { name: /amsterdam schiphol \(ams\)/i }),
    ).toBeVisible();
  });

  test("opens an airport dashboard from the airport directory", async ({ page }) => {
    await page.goto("/airports");

    await expect(
      page.getByRole("heading", { name: /monitored airports across/i }),
    ).toBeVisible();

    const heathrowCard = page.locator("article").filter({ hasText: "London Heathrow" });
    await expect(heathrowCard).toContainText("LHR");

    await heathrowCard.getByRole("link", { name: "Open dashboard" }).click();

    await expect(page).toHaveURL(/\/airports\/lhr$/);
    await expect(
      page.getByRole("heading", { name: /london heathrow \(lhr\)/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Active flights" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Weather impact" })).toBeVisible();
  });

  test("loads and pages through the departure board", async ({ page }) => {
    await page.goto("/departures");

    await page.getByLabel("Select Country").selectOption("Denmark");
    await page.getByLabel("Select Airport").selectOption("Copenhagen");

    await expect(page.getByText(/^Weather:/)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /departures: copenhagen \(cph\)/i }),
    ).toBeVisible();

    await expect(page.getByTestId("flights-table").locator("tbody tr")).toHaveCount(5);
    await expect(page.getByText("Page 1 of 5")).toBeVisible();

    await page.getByRole("button", { name: "Next" }).click();

    await expect(page.getByText("Page 2 of 5")).toBeVisible();
    await expect(page.getByRole("button", { name: "Previous" })).toBeEnabled();

    await page.getByLabel("Sort by:").selectOption("destination");
    await page.getByRole("button", { name: "↑" }).click();

    await expect(page.getByRole("button", { name: "↓" })).toBeVisible();
  });
});

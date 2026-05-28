import { expect, test } from "@playwright/test";

test.describe("AirportOps dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("opens an airport dashboard from search", async ({ page }) => {
    await page.getByLabel("Select airport").fill("Copenhagen (CPH)");
    await page.getByRole("button", { name: "Open dashboard" }).click();

    await expect(page).toHaveURL(/\/airports\/cph$/);
    await expect(page.getByRole("heading", { name: /copenhagen \(cph\)/i })).toBeVisible();
    await expect(page.getByText("Airport status overview")).toBeVisible();
  });
});

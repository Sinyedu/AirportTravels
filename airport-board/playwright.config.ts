import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "https://airport-travels.vercel.app/",
    headless: true,
  },
});

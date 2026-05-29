import { defineConfig } from "@playwright/test";

const isCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  retries: isCi ? 1 : 0,
  webServer: {
    command: isCi ? "pnpm start" : "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !isCi,
  },
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
});

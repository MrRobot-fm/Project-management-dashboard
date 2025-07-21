import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: "./playwright/global-setup.ts",
  testDir: "./playwright/e2e",
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    testIdAttribute: "data-test-id",

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});

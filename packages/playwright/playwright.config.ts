import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright/e2e",
  fullyParallel: true,
  forbidOnly: true,
  reporter: "html",
  projects: [
    {
      name: "Chrome",
      use: { ...devices["Desktop Chrome"] }
    },

    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] }
    },

    {
      name: "Safari",
      use: { ...devices["Desktop Safari"] }
    }
  ]
});

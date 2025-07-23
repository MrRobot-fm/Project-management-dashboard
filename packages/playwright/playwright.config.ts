import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./playwright/e2e",
  fullyParallel: true,
  forbidOnly: true,
  reporter: isCI ? "null" : "list",
  projects: isCI
    ? [
        {
          name: "Chrome",
          use: { ...devices["Desktop Chrome"] }
        }
      ]
    : [
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

import { defineConfig } from "@playwright/test";
import playwrightBaseConfig from "@workspace/playwright/config";

export default defineConfig({
  ...playwrightBaseConfig,
  globalSetup: "./playwright/global-setup.ts",
  use: {
    baseURL: "http://localhost:3000",
    testIdAttribute: "data-test-id",
    trace: "on-first-retry",
  },
  retries: 2,
  workers: 1,
});

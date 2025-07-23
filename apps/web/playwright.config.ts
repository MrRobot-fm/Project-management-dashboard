import { defineConfig } from "@playwright/test";
import playwrightBaseConfig from "@workspace/playwright/config";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });

export default defineConfig({
  ...playwrightBaseConfig,
  globalSetup: "./playwright/global-setup.ts",
  globalTeardown: "./playwright/global-setup.ts",
  use: {
    baseURL: "http://localhost:3000",
    testIdAttribute: "data-test-id",
    trace: "on-first-retry",
  },
  retries: 1,
  workers: 1,
});

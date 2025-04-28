import vitestBaseConfig from "@workspace/vitest-config/config";
import { config } from "dotenv";
import path from "path";
import { defineConfig } from "vitest/config";
import { mergeConfig } from "vitest/config";

config({ path: path.resolve(process.cwd(), ".env.test") });

export default mergeConfig(
  vitestBaseConfig,
  defineConfig({
    test: {
      globals: true,
      setupFiles: "./src/tests/setup.ts",
      environment: "node",
      testTimeout: 15000,
      env: {
        NODE_ENV: "test",
      },
      sequence: {
        shuffle: false,
      },
      pool: "threads",
      poolOptions: {
        threads: {
          singleThread: true,
        },
      },
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),
);

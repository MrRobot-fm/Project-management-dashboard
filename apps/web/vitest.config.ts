import vitestBaseConfig from "@workspace/vitest-config/config";
import path from "path";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  vitestBaseConfig,
  defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  }),
);

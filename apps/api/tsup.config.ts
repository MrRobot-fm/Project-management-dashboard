import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: {
    index: "src/server.ts",
  },
  outDir: "dist",
  clean: true,
  format: ["cjs"],
  ...options,
}));

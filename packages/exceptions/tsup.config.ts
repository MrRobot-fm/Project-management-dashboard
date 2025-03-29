import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: {
    index: "src/index.ts"
  },
  outDir: "dist",
  clean: true,
  format: ["esm"],
  dts: true,
  ...options
}));

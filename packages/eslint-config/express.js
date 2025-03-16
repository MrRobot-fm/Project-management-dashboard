import pluginSecurity from "eslint-plugin-security";
import { config as baseConfig } from "./base.js"; // <-- NON tocchiamo base.js

/** @type {import("eslint").Linter.config} */
export const expressConfig = [
  ...baseConfig,

  {
    plugins: {
      security: pluginSecurity
    },
    rules: {
      ...pluginSecurity.configs.recommended.rules,

      "no-process-exit": "off",
      "no-console": "off",
      "security/detect-object-injection": "off"
    }
  }
];

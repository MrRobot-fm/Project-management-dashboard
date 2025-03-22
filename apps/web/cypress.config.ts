import { defineConfig } from "cypress";

export const config = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: "http://localhost:3000",
        viewportWidth: 1440,
        viewportHeight: 1024,
      };

      on("task", {
        log: (message) => {
          console.log(message);
          return null;
        },
      });

      return { ...config, ...configOverrides };
    },
  },
});

import { defineConfig } from "cypress";

const config = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1440,
    viewportHeight: 1024,
    setupNodeEvents(on, config) {
      on("task", {
        log: (message) => {
          console.log(message);
          return null;
        },
      });

      return config;
    },
  },
});

export default config;

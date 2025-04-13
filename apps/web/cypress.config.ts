import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config();

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
    env: {
      API_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
  },
});

export default config;

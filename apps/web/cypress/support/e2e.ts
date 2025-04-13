import "./commands";
import { configure } from "@testing-library/cypress";

configure({ testIdAttribute: "data-test-id" });

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("NEXT_REDIRECT")) return false;
});

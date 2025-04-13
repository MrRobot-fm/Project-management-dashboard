import { generateUser } from "../support/utils";

describe("Toggle theme", () => {
  let user: ReturnType<typeof generateUser>;

  beforeEach(() => {
    user = generateUser();

    cy.createUserAndLogin({
      name: user.name,
      email: user.email,
      password: user.password,
    }).then(() => {
      cy.visit("/dashboard");
    });
  });

  afterEach(() => {
    cy.deleteCurrentUser({
      email: user.email,
      password: user.password,
    });
  });

  it("opens the dropdown and selects Dark mode", () => {
    cy.findByTestId("mode-toggle").click();
    cy.findByRole("menuitem", { name: /dark/i }).click();
    cy.get("html").should("have.class", "dark");
  });

  it("opens the dropdown and selects Light mode", () => {
    cy.findByTestId("mode-toggle").click();
    cy.findByRole("menuitem", { name: /light/i }).click();
    cy.get("html").should("not.have.class", "dark");
  });

  it("opens the dropdown and selects System mode", () => {
    cy.findByTestId("mode-toggle").click();
    cy.findByRole("menuitem", { name: /system/i }).click();

    cy.window().then((win) => {
      const isDark = win.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDark) {
        cy.get("html").should("have.class", "dark");
      } else {
        cy.get("html").should("not.have.class", "dark");
      }
    });
  });
});

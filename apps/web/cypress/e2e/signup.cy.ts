import { generateUser } from "../support/utils";

describe("Signup", () => {
  let user: ReturnType<typeof generateUser>;

  beforeEach(() => {
    user = generateUser();
  });

  afterEach(() => {
    cy.deleteCurrentUser({
      email: user.email,
      password: user.password,
    });
  });

  it("should signup with valid credentials", () => {
    cy.visit("/signup");

    cy.findByLabelText(/name/i).type(user.name);
    cy.findByLabelText(/email/i).type(user.email);
    cy.findByLabelText("Password").type(user.password);
    cy.findByLabelText(/repeat password/i).type(user.password);
    cy.findByRole("button", { name: /create your account/i }).click({
      force: true,
    });

    cy.location("pathname", { timeout: 10000 }).should("eq", "/");
    cy.contains(/welcome back/i).should("exist");

    cy.logout();
    cy.location("pathname").should("eq", "/login");
  });

  it("should not allow signup with an already used email", () => {
    cy.createUser(user).then(() => {
      cy.visit("/signup");
      cy.findByLabelText(/name/i).type(user.name);
      cy.findByLabelText(/email/i).type(user.email);
      cy.findByLabelText("Password").type(user.password);
      cy.findByLabelText(/repeat password/i).type(user.password);
      cy.findByRole("button", { name: /create your account/i }).click({
        force: true,
      });

      cy.contains(/user email already exist/i).should("exist");
    });
  });

  it("should disable login button when there are empty fields", () => {
    cy.createUser(user).then(() => {
      cy.visit("/signup");

      cy.findByRole("button", { name: /create your account/i }).should(
        "be.disabled",
      );
    });
  });

  it("should show error if passwords do not match", () => {
    cy.createUser(user).then(() => {
      cy.visit("/signup");

      cy.findByLabelText(/name/i).type(user.name);
      cy.findByLabelText(/email/i).type(user.email);
      cy.findByLabelText("Password").type(user.password);
      cy.findByLabelText(/repeat password/i).type("DifferentPassword123!");

      cy.findByRole("button", { name: /create your account/i }).click({
        force: true,
      });

      cy.contains(/passwords do not match/i).should("exist");
    });
  });
});

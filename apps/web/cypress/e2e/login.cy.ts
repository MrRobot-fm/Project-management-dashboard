import { generateUser } from "../support/utils";

describe("Login", () => {
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

  it("should login with valid credentials", () => {
    cy.createUserAndLogin(user).then(() => {
      cy.contains(/welcome back/i);
      cy.logout();
    });
  });

  it("should not login with incorrect email", () => {
    const wrongEmail = "wrong-" + user.email;

    cy.createUser(user).then(() => {
      cy.visit("/login");
      cy.findByLabelText(/email/i).type(wrongEmail);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();

      cy.contains(/user not found/i).should("exist");
    });
  });

  it("should not login with incorrect password", () => {
    const wrongPassword = "WrongPassword123!";

    cy.createUser(user).then(() => {
      cy.visit("/login");
      cy.findByLabelText(/email/i).type(user.email);
      cy.findByLabelText(/password/i).type(wrongPassword);
      cy.findByRole("button", { name: /login/i }).click();

      cy.contains(/invalid password/i).should("exist");
    });
  });

  it("should disable login button when there are empty fields", () => {
    cy.createUser(user).then(() => {
      cy.visit("/login");

      cy.findByRole("button", { name: /login/i }).should("be.disabled");
    });
  });

  it("should redirect to home after successful login", () => {
    cy.createUserAndLogin(user).then(() => {
      cy.location("pathname").should("eq", "/");
    });
  });
});

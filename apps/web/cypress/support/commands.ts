/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

const API_URL = Cypress.env("API_URL");
const jsonHeaders = { "Content-Type": "application/json" };

const loginAndGetCookie = (email: string, password: string) => {
  return cy
    .request({
      method: "POST",
      url: `${API_URL}/auth/login`,
      body: { email, password },
      headers: jsonHeaders,
    })
    .then((res) => {
      const cookies = res.headers["set-cookie"] as string[] | undefined;
      const jwtCookie = cookies?.find((cookie) =>
        cookie.startsWith("jwt_token="),
      );

      const email = res.body.user.email;
      const password = res.body.user.password;
      const id = res.body.user.id;

      console.log({ res });

      return {
        user: {
          email,
          password,
          id,
          cookie: jwtCookie || "",
        },
      };
    });
};

Cypress.Commands.add("createUser", (user) => {
  return cy.request({
    method: "POST",
    url: `${API_URL}/users`,
    body: user,
    headers: jsonHeaders,
  });
});

Cypress.Commands.add("createUserAndLogin", (user) => {
  return cy.createUser(user).then((res) => {
    const createdUser = res.body;

    cy.visit("/login");
    cy.findByLabelText(/email/i).type(user.email);
    cy.findByLabelText(/password/i).type(user.password);
    cy.findByRole("button", { name: /login/i }).click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/");

    return cy.wrap(createdUser);
  });
});

Cypress.Commands.add("logout", () => {
  cy.findByTestId("nav-user").click();
  cy.findByRole("menuitem", { name: /logout/i }).click();
  cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
});

Cypress.Commands.add("deleteCurrentUser", (user) => {
  return loginAndGetCookie(user.email, user.password).then((userRes) => {
    return cy.request({
      method: "DELETE",
      url: `${API_URL}/users/${userRes.user.id}`,
      headers: {
        ...jsonHeaders,
        Cookie: userRes.user.cookie,
      },
    });
  });
});

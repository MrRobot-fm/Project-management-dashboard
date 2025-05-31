/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";
import "cypress-file-upload";

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
      const jwtCookie = cookies?.find((cookie) => cookie.startsWith("jwt_token="));

      const email = res.body.user.email;
      const password = res.body.user.password;
      const id = res.body.user.id;

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

Cypress.Commands.add("createWorkspace", (name: string) => {
  cy.findByTestId("workspaces-select").click();
  cy.findByRole("button", { name: /create workspace/i }).click();
  cy.findByRole("textbox", { name: /name/i }).type(name);

  cy.get('input[type="file"]').attachFile("super_mario.jpeg", { force: true });
  cy.get("img")
    .should("have.attr", "src")
    .and("match", /^blob:/);

  cy.findByRole("button", { name: /create/i }).click();
});

Cypress.Commands.add("editWorkspace", (name: string) => {
  cy.findByTestId("workspaces-select").click();
  cy.findByRole("button", { name: /edit workspace/i }).click();
  cy.findByRole("textbox", { name: /name/i }).type(name);

  cy.findByRole("button", { name: /remove logo/i }).click();
  cy.get('input[type="file"]').attachFile("super_mario.jpeg", { force: true });
  cy.get("img").should("have.attr", "src").and("include", "/workspace-logo/");

  cy.findByRole("button", { name: /save changes/i }).click();
});

Cypress.Commands.add("deleteCurrentWorkspace", () => {
  cy.findByTestId("workspaces-select").click();
  cy.findByRole("button", { name: /delete workspace/i }).click();
  cy.findByRole("button", { name: /delete/i }).click();
});

Cypress.Commands.add("createProject", (name: string, description: string) => {
  cy.findByRole("button", { name: /projects/i, timeout: 10000 }).click();
  cy.findByRole("textbox", { name: /name/i }).type(name);
  cy.findByRole("textbox", { name: /description/i }).type(description);

  cy.get('input[type="file"]').attachFile("super_mario.jpeg", { force: true });

  cy.findByRole("button", { name: /create project/i }).click();
});

Cypress.Commands.add("editProject", (name: string, description: string, existingName) => {
  cy.findByTestId("project-item", { timeout: 10000 }).should("have.text", existingName);

  cy.findByRole("button", { name: /more/i }).click();
  cy.findByRole("menuitem", { name: /edit/i }).click();
  cy.findByRole("textbox", { name: /name/i }).type(name);
  cy.findByRole("textbox", { name: /description/i }).type(description);

  cy.get('input[type="file"]').attachFile("super_mario.jpeg", { force: true });

  cy.findByRole("button", { name: /save changes/i }).click();
});

Cypress.Commands.add("deleteProject", (name: string) => {
  cy.findByTestId("project-item").should("have.text", name);

  cy.findByRole("button", { name: /more/i }).click();
  cy.findByRole("menuitem", { name: /delete/i }).click();
});

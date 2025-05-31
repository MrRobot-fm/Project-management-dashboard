import { generateUser } from "../support/utils";

describe("Workspaces", () => {
  let user: ReturnType<typeof generateUser>;
  const workspaceName = `Test Workspace ${Date.now()}`;
  const newWorkspaceName = `Test Workspace ${Date.now()}`;

  beforeEach(() => {
    user = generateUser();
    cy.createUserAndLogin(user).then(() => cy.visit("/dashboard"));
  });

  afterEach(() => {
    cy.deleteCurrentWorkspace();
    cy.get("[data-slot='select-value']", { timeout: 10000 }).should(
      "contain.text",
      "No workspaces. Create one!",
    );
  });

  it("should create a workspace successfully", () => {
    cy.createWorkspace(workspaceName).then(() => {
      cy.get("[data-slot='select-value']", { timeout: 10000 }).should(
        "contain.text",
        workspaceName,
      );
    });
  });

  it("should edit a workspace successfully", () => {
    cy.createWorkspace(workspaceName).then(() => {
      cy.get("[data-slot='select-value']", { timeout: 10000 }).should(
        "contain.text",
        workspaceName,
      );

      cy.editWorkspace(newWorkspaceName).then(() => {
        cy.get("[data-slot='select-value']").should("contain.text", newWorkspaceName);
      });
    });
  });
});

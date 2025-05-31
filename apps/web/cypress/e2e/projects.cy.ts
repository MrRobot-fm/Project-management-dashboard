import { generateUser } from "../support/utils";

describe("Projects", () => {
  let user: ReturnType<typeof generateUser>;
  const workspaceName = `Test Workspace ${Date.now()}`;

  const projectName = `Test Project ${Date.now()}`;
  const projectDescription = `Project description ${Date.now()}`;
  const newProjectName = `Test Project ${Date.now()}`;
  const newProjectDescription = `Project description ${Date.now()}`;

  beforeEach(() => {
    user = generateUser();
    cy.createUserAndLogin(user).then(() => cy.visit("/"));
  });

  afterEach(() => {
    cy.deleteCurrentWorkspace();
    cy.get("[data-slot='select-value']").should("contain.text", "No workspaces. Create one!");
  });

  it("should create project successfully", () => {
    cy.createWorkspace(workspaceName);

    cy.createProject(projectName, projectDescription);

    cy.findByTestId("project-item").should("have.text", projectName);
  });

  it("should edit project successfully", () => {
    cy.createWorkspace(workspaceName);

    cy.createProject(projectName, projectDescription);

    cy.editProject(newProjectName, newProjectDescription, projectName);

    cy.findByTestId("project-item", { timeout: 10000 }).should("have.text", newProjectName);
  });

  it("should delete project successfully", () => {
    cy.createWorkspace(workspaceName);

    cy.createProject(projectName, projectDescription);

    cy.deleteProject(projectName);

    cy.findByTestId("project-empty-state", { timeout: 10000 }).should(
      "have.text",
      "No projects. Create one, now!",
    );
  });
});

import { generateUser } from "../support/utils";

describe("Project members", () => {
  let user: ReturnType<typeof generateUser>;
  let invitedUser: ReturnType<typeof generateUser>;

  const timestamp = Date.now();
  const workspaceName = `Test Workspace ${timestamp}`;
  const projectName = `Test Project ${timestamp}`;
  const projectDescription = `Project description ${timestamp}`;

  beforeEach(() => {
    user = generateUser();
    invitedUser = generateUser();

    cy.createUser(invitedUser);
    cy.createUserAndLogin(user).then(() => cy.visit("/"));

    cy.get('[data-slot="sidebar-trigger"]').click();
    cy.createWorkspace(workspaceName);

    cy.intercept("POST", "**").as("createProject");
    cy.createProject(projectName, projectDescription);
    cy.wait("@createProject").its("response.statusCode").should("eq", 200);

    cy.findByTestId("project-item").should("have.text", projectName);
  });

  afterEach(() => {
    cy.intercept("POST", "**").as("deleteWorkspace");
    cy.deleteCurrentWorkspace();
    cy.wait("@deleteWorkspace");

    cy.get("[data-slot='select-value']", { timeout: 15000 }).should(
      "contain.text",
      "No workspaces. Create one!",
    );

    cy.deleteCurrentUser({ email: user.email, password: user.password });
    cy.deleteCurrentUser({ email: invitedUser.email, password: invitedUser.password });
  });

  const openProject = () => {
    cy.findByTestId("project-item").click();
    cy.wait(10000);
  };

  const addMemberToProject = (name: string) => {
    cy.findByTestId("add-team-member-btn").click();
    cy.findByRole("combobox").type(name);
    cy.findByTestId("search-user-item", { timeout: 10000 }).should("contain.text", name).click();
    cy.findByRole("button", { name: /add members/i }).click();
    cy.get("[data-slot='dialog-close']").click();
    cy.get('[data-test-id="member-card"]').should("contain.text", invitedUser.name);
  };

  it("should add a member to the project", () => {
    openProject();
    addMemberToProject(invitedUser.name);

    cy.findAllByTestId("member-card").should("contain.text", invitedUser.name);
  });

  it("should remove a member from the project", () => {
    openProject();
    addMemberToProject(invitedUser.name);

    cy.get('[data-test-id="member-card"]').should("contain.text", invitedUser.name);

    cy.get("[data-slot='dropdown-menu-item']").click();

    cy.intercept("POST", "/projects/*").as("removeMember");
    cy.findByRole("button", { name: /remove/i }).click();
    cy.wait("@removeMember", { timeout: 10000 });

    cy.get('[data-test-id="member-card"]').should("not.contain.text", invitedUser.name);
  });
});

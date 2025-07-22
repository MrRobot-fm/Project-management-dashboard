import { PlaywrightCommands } from "../support/commands";
import { generateUser } from "../support/utils";
import { test, expect } from "@playwright/test";

test.describe("Projects", () => {
  let user: ReturnType<typeof generateUser>;
  let commands: PlaywrightCommands;
  const workspaceName = `Test Workspace ${Date.now()}`;

  const projectName = `Test Project ${Date.now()}`;
  const projectDescription = `Project description ${Date.now()}`;
  const newProjectName = `Test Project ${Date.now()}`;
  const newProjectDescription = `Project description ${Date.now()}`;

  test.beforeEach(async ({ page }) => {
    user = generateUser();
    commands = new PlaywrightCommands(page);

    await commands.createUserAndLogin(user);

    await page.locator('[data-slot="sidebar-trigger"]').click();
  });

  test.afterEach(async ({ page }) => {
    await commands.deleteCurrentWorkspace();

    await expect(page.locator("[data-slot='select-value']")).toContainText(
      "No workspaces. Create one!",
      { timeout: 15000 },
    );
  });

  test("should create project successfully", async ({ page }) => {
    await commands.createWorkspace(workspaceName);

    await commands.createProject(projectName, projectDescription);

    await expect(page.getByTestId("project-item")).toHaveText(projectName, { timeout: 15000 });

    await commands.deleteProject(projectName);

    await expect(page.getByTestId("project-empty-state")).toHaveText(
      "No projects. Create one, now!",
      { timeout: 10000 },
    );
  });

  test("should edit project successfully", async ({ page }) => {
    await commands.createWorkspace(workspaceName);

    await commands.createProject(projectName, projectDescription);

    await commands.editProject(newProjectName, newProjectDescription, projectName);

    await expect(page.getByTestId("project-item")).toHaveText(newProjectName, { timeout: 10000 });

    await commands.deleteProject(projectName);

    await expect(page.getByTestId("project-empty-state")).toHaveText(
      "No projects. Create one, now!",
      { timeout: 10000 },
    );
  });

  test("should delete project successfully", async ({ page }) => {
    await commands.createWorkspace(workspaceName);

    await commands.createProject(projectName, projectDescription);

    await commands.deleteProject(projectName);

    await expect(page.getByTestId("project-empty-state")).toHaveText(
      "No projects. Create one, now!",
      { timeout: 10000 },
    );
  });
});

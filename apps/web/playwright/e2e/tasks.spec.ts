import { PlaywrightCommands } from "../support/commands";
import { generateUser } from "../support/utils";
import { expect, test } from "@playwright/test";

test.describe("Tasks", () => {
  let commands: PlaywrightCommands;
  let user: ReturnType<typeof generateUser>;
  let invitedUser: ReturnType<typeof generateUser>;

  const timestamp = Date.now();
  const workspaceName = `Test Workspace ${timestamp}`;
  const projectName = `Test Project ${timestamp}`;
  const projectDescription = `Project description ${timestamp}`;

  test.beforeEach(async ({ page }) => {
    commands = new PlaywrightCommands(page);
    user = generateUser();
    invitedUser = generateUser();

    await commands.createUser(invitedUser);
    await commands.createUserAndLogin(user);

    await page.locator('[data-slot="sidebar-trigger"]').click();
    await commands.createWorkspace(workspaceName);
    await commands.createProject(projectName, projectDescription);

    await expect(page.getByTestId("project-item")).toHaveText(projectName);
  });

  test("should add a task", async () => {
    await commands.openProject();
    await commands.createTask(user.name);
  });

  test("should delete a task", async () => {
    await commands.openProject();
    await commands.createTask(user.name);
    await commands.deleteTask();
  });
});

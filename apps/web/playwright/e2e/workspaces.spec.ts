import { PlaywrightCommands } from "../support/playwright-commands";
import { generateUser } from "../support/utils";
import { test, expect } from "@playwright/test";

test.describe("Workspaces", () => {
  let user: ReturnType<typeof generateUser>;
  let commands: PlaywrightCommands;
  let workspaceName: string;
  let newWorkspaceName: string;

  test.beforeEach(async ({ page }) => {
    user = generateUser();
    commands = new PlaywrightCommands(page);
    workspaceName = `Test Workspace ${Date.now()}`;
    newWorkspaceName = `Test Workspace ${Date.now()}`;

    await commands.createUserAndLogin(user);

    await page.locator('[data-slot="sidebar-trigger"]').click();
  });

  test.afterEach(async ({ page }) => {
    await commands.deleteCurrentWorkspace();

    await expect(page.locator("[data-slot='select-value']")).toContainText(
      "No workspaces. Create one!",
      { timeout: 15000 },
    );

    await commands.deleteCurrentUser(user);
  });

  test("should create a workspace successfully", async ({ page }) => {
    await commands.createWorkspace(workspaceName);

    await expect(page.locator("[data-slot='select-value']")).toContainText(workspaceName, {
      timeout: 10000,
    });
  });

  test("should edit a workspace successfully", async ({ page }) => {
    await commands.createWorkspace(workspaceName);

    await expect(page.locator("[data-slot='select-value']")).toContainText(workspaceName, {
      timeout: 10000,
    });

    await commands.editWorkspace(newWorkspaceName);

    await expect(page.locator("[data-slot='select-value']")).toContainText(newWorkspaceName, {
      timeout: 10000,
    });
  });
});

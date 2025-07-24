import { PlaywrightCommands } from "../support/commands";
import { generateUser } from "../support/utils";
import { test, expect, type Page } from "@playwright/test";

test.describe("Project members", () => {
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

    await expect(page.getByTestId("project-item")).toHaveText(projectName, {
      timeout: 10000,
    });
  });

  test.afterEach(async ({ page }) => {
    await commands.deleteProject(projectName);

    await expect(page.getByTestId("project-empty-state")).toHaveText(
      "No projects. Create one, now!",
      { timeout: 10000 },
    );

    await commands.deleteCurrentWorkspace();

    await expect(page.getByTestId("workspaces-select")).toContainText(
      "No workspaces. Create one!",
      { timeout: 15000 },
    );

    await commands.deleteCurrentUser(user);
    await commands.deleteCurrentUser(invitedUser);
  });

  const openProject = async (page: Page) => {
    await page.getByTestId("project-item").click();
  };

  const waitForMembersCount = async (page: Page, expectedCount: number) => {
    const membersCard = page.getByTestId("member-card");
    await expect
      .poll(
        async () => {
          return await membersCard.count();
        },
        {
          timeout: 15000,
          message: "Waiting for members render",
        },
      )
      .toBe(expectedCount);
  };

  const addMemberToProject = async (page: Page, name: string) => {
    await page.getByTestId("add-team-member-btn").click();

    const searchDialog = page.getByRole("dialog");
    await expect(searchDialog).toBeVisible({ timeout: 10000 });

    await page.getByTestId("search-members-input").fill(name);

    const searchItem = page.getByTestId("search-user-item");
    await expect(searchItem).toContainText(name, { timeout: 10000 });
    await searchItem.click();

    await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/projects/") &&
          res.request().method() === "POST" &&
          res.status() === 200,
      ),
      page.getByRole("button", { name: /add members/i }).click(),
    ]);

    await page.locator('[data-slot="dialog-close"]').click();

    await expect(searchDialog).toBeHidden({ timeout: 10000 });

    await waitForMembersCount(page, 2);
  };

  test("should add a member to the project", async ({ page }) => {
    await openProject(page);
    await addMemberToProject(page, invitedUser.name);
  });

  test("should remove a member from the project", async ({ page }) => {
    await openProject(page);
    await addMemberToProject(page, invitedUser.name);

    await page.getByTestId("member-card-menu-btn").click();
    await page.getByRole("menuitem", { name: /remove/i }).click();

    const removeDialog = page.getByRole("alertdialog");
    await expect(removeDialog).toBeVisible({ timeout: 10000 });

    await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/projects/") &&
          res.request().method() === "POST" &&
          res.status() === 200,
      ),
      page.getByRole("button", { name: /remove/i }).click(),
    ]);

    expect(removeDialog).toBeHidden({ timeout: 10000 });

    await waitForMembersCount(page, 2);
  });
});

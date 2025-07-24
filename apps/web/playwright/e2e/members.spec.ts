import { PlaywrightCommands } from "../support/commands";
import { generateUser } from "../support/utils";
import { test, expect, type Page } from "@playwright/test";

const openProject = async (page: Page) => {
  await page.getByTestId("project-item").click();
};

const waitForMembersCount = async (page: Page, expectedCount: number) => {
  const membersCard = page.getByTestId("member-card");
  await expect(membersCard).toHaveCount(expectedCount);
};

const addMemberToProject = async (page: Page, userName: string) => {
  await page.getByTestId("add-team-member-btn").click();

  await page.getByRole("combobox").fill(userName);
  await expect(page.getByTestId("search-user-item")).toContainText(userName, { timeout: 10000 });

  await page.getByTestId("search-user-item").click();

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

  await waitForMembersCount(page, 2);
};

const removeMemberFromProject = async (page: Page, expectedRemaining = 1) => {
  await page.getByTestId("member-card-menu-btn").click();
  await page.getByRole("menuitem").click();

  await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("/projects/") &&
        res.request().method() === "POST" &&
        res.status() === 200,
    ),
    page.getByRole("button", { name: /remove/i }).click(),
  ]);

  await waitForMembersCount(page, expectedRemaining);
};

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

  test("should add a member to the project", async ({ page }) => {
    await test.step("Open the project", async () => {
      await openProject(page);
    });

    await test.step("Add invited user to the project", async () => {
      await addMemberToProject(page, invitedUser.name);
    });
  });

  test("should remove a member from the project", async ({ page }) => {
    await test.step("Open the project", async () => {
      await openProject(page);
    });

    await test.step("Add invited user to the project", async () => {
      await addMemberToProject(page, invitedUser.name);
    });

    await test.step("Remove invited user from the project", async () => {
      await removeMemberFromProject(page, 1);
    });
  });
});

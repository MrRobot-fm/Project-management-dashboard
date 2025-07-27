import { PlaywrightCommands } from "../support/commands";
import { generateUser } from "../support/utils";
import { expect, type Page, test } from "@playwright/test";

test.describe("User account", () => {
  let user: ReturnType<typeof generateUser>;
  const updatedUser = {
    name: "New name",
    email: "new-email@gmail.com",
  };

  let commands: PlaywrightCommands;

  test.beforeEach(async ({ page }) => {
    user = generateUser();
    commands = new PlaywrightCommands(page);

    await commands.createUserAndLogin(user);
  });

  const openUserMenu = async (page: Page) => {
    const userMenuAvatar = page.getByTestId("nav-user");
    await userMenuAvatar.click();

    const userMenu = page.getByRole("menu");
    await expect(userMenu).toBeVisible();

    return {
      userMenuAvatar,
      userMenu,
    };
  };

  test("should edit successfully the user account info", async ({ page }) => {
    const { userMenuAvatar, userMenu } = await openUserMenu(page);

    const accountButton = page.getByRole("menuitem", { name: "Edit account", exact: true });
    await accountButton.click();

    const userAccountDialog = page.getByRole("dialog");
    await expect(userAccountDialog).toBeVisible();

    const nameInput = userAccountDialog.getByLabel("name");
    await nameInput.clear();
    await nameInput.fill(updatedUser.name);

    const emailInput = userAccountDialog.getByLabel("email");
    await emailInput.clear();
    await emailInput.fill(updatedUser.email);

    const saveChangeButton = userAccountDialog.getByRole("button", { name: /save changes/i });

    await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes("/") && res.request().method() === "POST" && res.status() === 200,
      ),
      saveChangeButton.click(),
    ]);

    await expect(userAccountDialog).toBeHidden();

    await userMenuAvatar.click();
    await expect(userMenu).toBeVisible();

    const userInfo = userMenu.locator('[data-slot="dropdown-menu-label"]');
    await expect(userInfo).toContainText(updatedUser.name);
    await expect(userInfo).toContainText(updatedUser.email);

    await commands.deleteCurrentUser({
      ...updatedUser,
      password: user.password,
    });
  });

  test("should delete user account successfully", async ({ page }) => {
    const { userMenu } = await openUserMenu(page);

    const deleteAccountButton = page.getByRole("menuitem", { name: "Delete account", exact: true });

    await deleteAccountButton.click();

    await expect(userMenu).toBeHidden();

    const deleteAccountDialog = page.getByRole("dialog");
    await expect(deleteAccountDialog).toBeVisible();

    const deleteButton = deleteAccountDialog.getByRole("button", { name: /delete account/i });
    await deleteButton.click();

    await page.waitForURL("/signup", { timeout: 15000 });
    await expect(page).toHaveURL("/signup");
  });
});

import { PlaywrightCommands } from "../support/commands";
import { generateUser } from "../support/utils";
import { test, expect } from "@playwright/test";

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

  test.afterEach(async () => {
    await commands.deleteCurrentUser({
      ...updatedUser,
      password: user.password,
    });
  });

  test("should edit successfully the user account info", async ({ page }) => {
    const userMenuAvatar = page.getByTestId("nav-user");
    await userMenuAvatar.click();

    const userMenu = page.getByRole("menu");
    await expect(userMenu).toBeVisible();

    const accountButton = page.getByRole("menuitem", { name: /account/i });
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

    const user = userMenu.locator('[data-slot="dropdown-menu-label"]');
    await expect(user).toContainText(updatedUser.name);
    await expect(user).toContainText(updatedUser.email);
  });
});

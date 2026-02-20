import { PlaywrightCommands } from "../support/commands";
import { generateUser } from "../support/utils";
import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  let user: ReturnType<typeof generateUser>;
  let commands: PlaywrightCommands;

  test.beforeEach(async ({ page }) => {
    user = generateUser();
    commands = new PlaywrightCommands(page);
  });

  test.afterEach(async () => {
    await commands.deleteCurrentUser({
      email: user.email,
      password: user.password,
      name: user.name,
    });
  });

  test("should login with valid credentials", async ({ page }) => {
    await commands.createUserAndLogin(user);
    await expect(page.getByText(/welcome back/i)).toBeVisible();
    await commands.logout();
  });

  test("should not login with incorrect email", async ({ page }) => {
    const wrongEmail = "wrong-" + user.email;

    await commands.createUser(user);
    await page.goto("/login");
    await page.getByRole("textbox", { name: "email" }).fill(wrongEmail);
    await page.getByRole("textbox", { name: "password" }).fill(user.password);
    await page.getByRole("button", { name: /login/i }).click({ force: true });

    await expect(page.getByText(/user not found/i)).toBeVisible();
  });

  test("should not login with incorrect password", async ({ page }) => {
    const wrongPassword = "WrongPassword123!";

    await commands.createUser(user);
    await page.goto("/login");
    await page.getByRole("textbox", { name: "email" }).fill(user.email);
    await page.getByRole("textbox", { name: "password" }).fill(wrongPassword);
    await page.getByRole("button", { name: /login/i }).click();

    await expect(page.getByText(/invalid password/i)).toBeVisible();
  });

  test("should disable login button when there are empty fields", async ({ page }) => {
    await commands.createUser(user);
    await page.goto("/login");

    await expect(page.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  test("should redirect to home after successful login", async ({ page }) => {
    await commands.createUserAndLogin(user);
    await expect(page).toHaveURL("/");
  });
});

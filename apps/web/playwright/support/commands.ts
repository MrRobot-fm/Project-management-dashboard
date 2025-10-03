import { type Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001/api";

interface User {
  name: string;
  email: string;
  password: string;
  id?: string;
}

interface UserWithCookie extends User {
  cookie: string;
}

const loginAndGetCookie = async (
  page: Page,
  email: string,
  password: string,
): Promise<UserWithCookie> => {
  const response = await page.request.post(`${API_URL}/auth/login`, {
    data: { email, password },
    headers: { "Content-Type": "application/json" },
  });

  const responseBody = await response.json();
  const cookies = response.headers()["set-cookie"];
  const jwtCookie = cookies?.split(";")[0] || "";

  return {
    email: responseBody.user.email,
    password: responseBody.user.password,
    id: responseBody.user.id,
    name: responseBody.user.name,
    cookie: jwtCookie,
  };
};

export class PlaywrightCommands {
  constructor(private page: Page) {}

  async createUser(user: User) {
    const response = await this.page.request.post(`${API_URL}/users`, {
      data: user,
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }

  async createUserAndLogin(user: User) {
    const createdUser = await this.createUser(user);

    await this.page.goto("/login");
    await this.page.getByRole("textbox", { name: "email" }).fill(user.email);
    await this.page.getByRole("textbox", { name: "password" }).fill(user.password);
    await this.page.getByRole("button", { name: /login/i }).click();
    await this.page.waitForURL("/", { timeout: 10000 });
    await expect(this.page).toHaveURL("/", { timeout: 30000 });

    return createdUser;
  }

  async logout() {
    await this.page.getByTestId("nav-user").click();
    await this.page.getByTestId("logout-btn").click();
  }

  async deleteCurrentUser(user: User) {
    const userWithCookie = await loginAndGetCookie(this.page, user.email, user.password);

    await this.page.request.delete(`${API_URL}/users/${userWithCookie.id}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: userWithCookie.cookie,
      },
    });
  }

  async createWorkspace(name: string) {
    await this.page.getByTestId("workspaces-select").click();
    await this.page.getByRole("button", { name: /create workspace/i }).click();
    await this.page.getByRole("textbox", { name: /name/i }).fill(name);

    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, "..", "fixtures", "super_mario.jpeg"));

    const avatar = this.page.getByTestId("uploaded-image");
    await expect(avatar).toHaveAttribute("src", /.+/);

    await this.page.getByRole("button", { name: /create/i }).click();
  }

  async editWorkspace(name: string) {
    await this.page.getByTestId("workspaces-select").click();
    await this.page.getByRole("button", { name: /edit workspace/i }).click();
    const nameInput = this.page.getByRole("textbox", { name: /name/i });
    await nameInput.clear();
    await nameInput.fill(name);

    await this.page.getByRole("button", { name: /remove logo/i }).click();
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, "..", "fixtures", "super_mario.jpeg"));

    const avatar = this.page.getByTestId("uploaded-image");
    await expect(avatar).toHaveAttribute("src", /.+/);

    await this.page.getByRole("button", { name: /save changes/i }).click({ force: true });
  }

  async deleteCurrentWorkspace() {
    await this.page.getByTestId("workspaces-select").click();

    const deleteBtn = this.page.getByRole("button", { name: /delete workspace/i });
    await expect(deleteBtn).toBeVisible({ timeout: 15000 });
    await deleteBtn.click();

    const confirmDelete = this.page.getByRole("button", { name: /delete/i });
    await expect(confirmDelete).toBeVisible({ timeout: 5000 });
    await confirmDelete.click();
  }

  async createProject(name: string, description: string) {
    await this.page.getByRole("button", { name: /projects/i }).click();
    await this.page.getByRole("textbox", { name: /name/i }).fill(name);
    await this.page.getByRole("textbox", { name: /description/i }).fill(description);

    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, "..", "fixtures", "super_mario.jpeg"));

    const avatar = this.page.getByTestId("uploaded-image");
    await expect(avatar).toHaveAttribute("src", /.+/);

    await this.page.getByRole("button", { name: /create project/i }).click();
  }

  async editProject(name: string, description: string, existingName: string) {
    await expect(this.page.getByTestId("project-item")).toContainText(existingName, {
      timeout: 10000,
    });

    await this.page.getByRole("button", { name: /more/i }).click({ force: true });
    await this.page.getByRole("menuitem", { name: /edit/i }).click({ force: true });

    const nameInput = this.page.getByRole("textbox", { name: /name/i });
    await nameInput.clear();
    await this.page.waitForTimeout(100);
    await nameInput.fill(name);

    const descriptionInput = this.page.getByRole("textbox", { name: /description/i });
    await descriptionInput.clear();
    await descriptionInput.fill(description);

    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, "..", "fixtures", "super_mario.jpeg"));

    const avatar = this.page.getByTestId("uploaded-image");
    await expect(avatar).toHaveAttribute("src", /.+/);

    await this.page.getByRole("button", { name: /save changes/i }).click({ force: true });
  }

  async deleteProject(name: string) {
    await expect(this.page.getByTestId("project-item")).toContainText(name);

    await this.page.getByRole("button", { name: /more/i }).click({ force: true });
    await this.page.getByRole("menuitem", { name: /delete/i }).click();
  }

  async waitForResponse({
    url,
    method,
    status = 200,
    action,
  }: {
    url: string;
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
    status?: number;
    action: Promise<void>;
  }) {
    const responsePromise = this.page.waitForResponse(
      (res) =>
        res.url().includes(url) && res.request().method() === method && res.status() === status,
    );
    const [response] = await Promise.all([responsePromise, action]);

    return response;
  }

  async openProject() {
    await this.page.getByTestId("project-item").click();
    await this.page.waitForURL(/\/projects\/[a-f0-9-]+/, { timeout: 10000 });
  }

  async createTask(userName: string) {
    const taskPageLink = this.page.getByRole("link", { name: /no tasks available/i });
    await taskPageLink.click();
    await this.page.waitForURL(/\/projects\/[a-f0-9-]+\/tasks$/, { timeout: 10000 });

    await expect(this.page.getByText(/tasks/i)).toBeVisible({ timeout: 10000 });

    await this.page.getByTestId("add-task-btn-to-do").click();

    const dialog = this.page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await this.page.getByRole("textbox", { name: /title/i }).fill("Test Task");
    await this.page.getByRole("textbox", { name: /description/i }).fill("Test Description");

    await this.page.getByTestId("search-members-input").fill(userName);
    const searchItem = this.page.getByTestId("search-user-item");
    await expect(searchItem).toContainText(userName);
    await searchItem.click();

    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join(__dirname, "..", "fixtures", "super_mario.jpeg"));

    await expect(this.page.getByTestId("asset-thumb")).toContainText("super_mario.jpeg");

    const createTaskButton = this.page.getByRole("button", { name: /create task/i });
    await expect(createTaskButton).toBeEnabled();

    await this.waitForResponse({
      url: "/projects/",
      method: "POST",
      action: createTaskButton.click(),
    });

    await expect(dialog).not.toBeVisible();
    await expect(this.page.getByTestId("task-card")).toContainText("Test Task");
  }

  async deleteTask() {
    const taskCard = this.page.getByTestId("task-card");
    await taskCard.click();
    await expect(this.page.getByRole("dialog")).toBeVisible();

    await this.page.getByTestId("task-dialog-menu").click();
    const deleteTaskButton = this.page.getByRole("button", { name: /delete task/i });
    await expect(deleteTaskButton).toBeVisible();

    await this.waitForResponse({
      url: "/projects/",
      method: "POST",
      action: deleteTaskButton.click(),
    });

    await expect(taskCard).not.toBeVisible();
  }
}

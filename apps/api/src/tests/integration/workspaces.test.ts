import { createUsers, loginUser } from "@/tests/utils/auth";
import { generateUser } from "@/tests/utils/generate-user";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
} from "@/tests/utils/workspaces";
import { faker } from "@faker-js/faker";

describe("API Workspaces", () => {
  let cookie: string;
  let userId: string;
  let testUser: { name: string; password: string; email: string };

  beforeEach(async () => {
    testUser = generateUser();

    await createUsers([testUser]);

    const login = await loginUser(testUser.email, testUser.password);

    cookie = login.cookie;
    userId = login.userId;
  });

  it("POST /api/workspaces - create a new workspace", async () => {
    const newWorkspace = {
      name: faker.company.name(),
    };

    const response = await createWorkspace(cookie, newWorkspace.name);

    expect(response.workspace.name).toBe(newWorkspace.name);
    expect(response.workspace.ownerId).toBe(userId);
  });

  it("GET /api/workspaces - retrieve list of workspaces", async () => {
    const newWorkspace = {
      name: faker.company.name(),
    };

    await createWorkspace(cookie, newWorkspace.name);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await getWorkspaces(cookie);

    expect(response.workspaces.length).toBeGreaterThanOrEqual(1);
  });

  it("DELETE /api/workspaces/:workspaceId - delete a workspace", async () => {
    const newWorkspace = {
      name: faker.company.name(),
    };

    const response = await createWorkspace(cookie, newWorkspace.name);

    await deleteWorkspace(cookie, response.workspace.id);
  });

  it("DELETE /api/workspaces/:workspaceId - returns 404 for non-existing workspace", async () => {
    await deleteWorkspace(cookie, "non-existing-id", 404);
  });

  it("POST /api/workspaces - fails with invalid body", async () => {
    const invalidBody = {
      name: "a",
    };

    const response = await createWorkspace(cookie, invalidBody.name, 422);

    const typedResponse = response as unknown as { errors: unknown };
    expect(typedResponse.errors).toBeDefined();
  });

  it("GET /api/workspaces - fails without authentication", async () => {
    await getWorkspaces("", 401);
  });
});

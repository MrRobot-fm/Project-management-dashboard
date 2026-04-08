import { createUsers, loginUser } from "@/tests/utils/auth";
import { generateUser } from "@/tests/utils/generate-user";
import { addProjectMembers, createProject } from "@/tests/utils/projects";
import { createTask } from "@/tests/utils/tasks";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
} from "@/tests/utils/workspaces";
import { faker } from "@faker-js/faker";

describe("API Workspaces", () => {
  let cookie: string;
  let userId: string;
  let testUser;

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

  it("GET /api/workspaces - returns projects, project members and tasks counts", async () => {
    const collaborator = generateUser();
    await createUsers([collaborator]);
    const collaboratorLogin = await loginUser(collaborator.email, collaborator.password);

    const workspaceResponse = await createWorkspace(cookie, faker.company.name());
    const workspaceId = workspaceResponse.workspace.id;

    const projectResponse = await createProject(
      cookie,
      {
        name: faker.company.name().slice(0, 10),
        description: faker.lorem.words({ min: 2, max: 4 }),
        logo: "",
      },
      workspaceId,
    );

    await addProjectMembers({
      projectId: projectResponse.project.id,
      workspaceId,
      cookie,
      userIds: [collaboratorLogin.userId],
    });

    const taskResponse = await createTask({
      projectId: projectResponse.project.id,
      cookie,
      newTask: {
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        status: "TODO",
      },
    });

    expect(taskResponse.status).toBe(201);

    const response = await getWorkspaces(cookie);
    const workspace = response.workspaces.find(
      (item: { id: string }) => item.id === workspaceId,
    );

    expect(workspace).toBeDefined();
    expect(workspace.projectsCount).toBe(1);
    expect(workspace.projectMembersCount).toBe(2);
    expect(workspace.tasksCount).toBe(1);
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
      name: "a", // Manteniamo questo corto per farlo fallire intenzionalmente
    };

    const response = await createWorkspace(cookie, invalidBody.name, 422);

    const typedResponse = response as unknown as { errors: unknown };
    expect(typedResponse.errors).toBeDefined();
  });

  it("GET /api/workspaces - fails without authentication", async () => {
    await getWorkspaces("", 401);
  });
});

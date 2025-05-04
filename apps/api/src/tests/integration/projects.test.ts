import { createWorkspace } from "../utils/workspaces";
import { app } from "@/server";
import { createUsers, loginUser } from "@/tests/utils/auth";
import { generateUser } from "@/tests/utils/generate-user";
import { createProject } from "@/tests/utils/projects";
import { getBasePath, removeExistingFiles } from "@/utils/storage";
import { faker } from "@faker-js/faker";
import request from "supertest";

describe("API Projects", () => {
  let cookie: string;
  let testUser: { name: string; password: string; email: string };
  let workspaceId: string;
  let newProject: { name: string; description: string; logo: string };
  let projectId: string | null = null;

  const fileName = "logo.png";

  beforeEach(async () => {
    testUser = generateUser();
    await createUsers([testUser]);

    const login = await loginUser(testUser.email, testUser.password);
    cookie = login.cookie;

    const workspace = await createWorkspace(cookie, faker.company.name());
    workspaceId = workspace.workspace.id;

    newProject = {
      name: faker.company.name().slice(0, 10),
      description: faker.lorem.words({ min: 2, max: 4 }),
      logo: fileName,
    };
  });

  afterEach(async () => {
    if (projectId) {
      const basePath = getBasePath({ projectId: projectId });
      await removeExistingFiles("project-logo", basePath);

      projectId = null;
    }
  });

  const createTestProject = async (): Promise<string> => {
    const response = await createProject(cookie, newProject, workspaceId);
    projectId = response.project.id;

    return response.project.id;
  };

  it("POST /api/workspaces/:workspaceId/project - create a new project", async () => {
    const response = await createProject(cookie, newProject, workspaceId);
    projectId = response.project.id;
    expect(response.project.name).toBe(newProject.name);
  });

  it("POST /api/workspaces/:workspaceId/project - should fail if workspace ID is invalid", async () => {
    const invalidId = "non-existent-id";

    const response = await createProject(cookie, newProject, invalidId, 404);
    expect(response.message).toBe("Workspace not found");
  });

  it("GET /api/projects - get all projects", async () => {
    await createTestProject();

    const response = await request(app)
      .get("/api/projects")
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body.projects.length).toBeGreaterThan(0);
  });

  it("PUT /api/projects/:projectId - update a project", async () => {
    const projectId = await createTestProject();

    const updatedName = "Updated Project Name";

    const response = await request(app)
      .put(`/api/projects/${projectId}`)
      .set("Cookie", cookie)
      .send({ name: updatedName })
      .expect(200);

    expect(response.body.project.name).toBe(updatedName);
  });

  it("DELETE /api/projects/:projectId - delete a project", async () => {
    const projectId = await createTestProject();

    const response = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body.success).toBeTruthy();
  });
});

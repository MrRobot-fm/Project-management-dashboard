import { createUsers, loginUser } from "../utils/auth";
import { generateUser } from "../utils/generate-user";
import { createProject } from "../utils/projects";
import { createTask } from "../utils/tasks";
import { createWorkspace } from "../utils/workspaces";
import { app } from "@/server";
import { faker } from "@faker-js/faker";
import type { TaskStatus } from "@workspace/db";
import request from "supertest";

describe("API Tasks", () => {
  let cookie: string;
  let workspaceId: string;
  let projectId: string;
  let taskId: string;
  const newTask = {
    title: faker.lorem.words(5),
    description: faker.lorem.sentence(),
    status: "TODO" as TaskStatus,
  };

  beforeEach(async () => {
    const owner = generateUser();

    await createUsers([owner]);

    const login = await loginUser(owner.email, owner.password);
    cookie = login.cookie;

    const workspace = await createWorkspace(cookie, faker.company.name());
    workspaceId = workspace.workspace.id;

    const project = await createProject(
      cookie,
      {
        name: faker.company.name().slice(0, 10),
        description: faker.lorem.words({ min: 2, max: 4 }),
        logo: "",
      },
      workspaceId,
    );

    projectId = project.project.id;
  });

  it("GET /api/:projectId/tasks - get all the tasks of a project", async () => {
    const response = await createTask({
      cookie,
      projectId,
      newTask,
    });

    expect(response.status).toBe(201);
    expect(response.body.task).toHaveProperty("id");
    expect(response.body.task.title).toBeDefined();

    const getTasksResponse = await request(app)
      .get(`/api/projects/${projectId}/tasks`)
      .set("Cookie", cookie);

    expect(getTasksResponse.status).toBe(200);
    expect(getTasksResponse.body.tasks).toHaveLength(1);
    expect(getTasksResponse.body.tasks[0]).toHaveProperty("id");
    expect(getTasksResponse.body.tasks[0].status).toBe("TODO");
  });

  it("POST /api/:projectId/tasks - create a new task", async () => {
    const response = await createTask({
      cookie,
      projectId,
      newTask,
    });

    expect(response.status).toBe(201);
    expect(response.body.task).toHaveProperty("id");
    expect(response.body.task.title).toBeDefined();
  });

  it("PUT /api/tasks/:taskId - update an existing task", async () => {
    const createTaskResponse = await createTask({
      cookie,
      projectId,
      newTask,
    });

    taskId = createTaskResponse.body.task.id;

    expect(createTaskResponse.status).toBe(201);
    expect(createTaskResponse.body.task).toHaveProperty("id");
    expect(createTaskResponse.body.task.title).toBeDefined();

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Cookie", cookie)
      .send({
        title: faker.lorem.words(5),
        description: faker.lorem.sentence(),
        status: "DONE",
      });

    expect(response.status).toBe(200);
    expect(response.body.task).toHaveProperty("id");
    expect(response.body.task.title).toBeDefined();
  });

  it("DELETE /api/tasks/:taskId - delete an existing task", async () => {
    const createTaskResponse = await createTask({
      cookie,
      projectId,
      newTask,
    });

    taskId = createTaskResponse.body.task.id;

    expect(createTaskResponse.status).toBe(201);
    expect(createTaskResponse.body.task).toHaveProperty("id");
    expect(createTaskResponse.body.task.title).toBeDefined();

    const response = await request(app).delete(`/api/tasks/${taskId}`).set("Cookie", cookie);

    expect(response.status).toBe(200);
    expect(response.body.task).toHaveProperty("id");
    expect(response.body.task.title).toBeDefined();
  });
});

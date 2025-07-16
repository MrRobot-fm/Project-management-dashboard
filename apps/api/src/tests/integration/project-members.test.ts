import { createUsers, loginUser } from "../utils/auth";
import { generateUser } from "../utils/generate-user";
import {
  addProjectMembers,
  changeMemberRole,
  createProject,
  deleteProjectMember,
} from "../utils/projects";
import { createWorkspace } from "../utils/workspaces";
import { app } from "@/server";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { expect } from "vitest";

describe("API - Project members", () => {
  let cookie: string;
  let workspaceId: string;
  let projectId: string;
  let testUserId: string;
  let testUser2Id: string;

  beforeEach(async () => {
    const owner = generateUser();
    const testUser = generateUser();
    const testUser2 = generateUser();

    await createUsers([owner, testUser, testUser2]);

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

    const users = await request(app).get("/api/users").set("Cookie", cookie).expect(200);

    const [, user1, user2] = users.body;
    testUserId = user1.id;
    testUser2Id = user2.id;
  });

  it("POST /api/projects/:projectId/members - should add a single project members", async () => {
    const res = await addProjectMembers({ projectId, workspaceId, cookie, userIds: [testUserId] });

    expect(res.status).toBe(201);
    expect(res.body.members).toHaveLength(1);
  });

  it("POST /api/projects/:projectId/members - should add a multiple project members", async () => {
    const res = await addProjectMembers({
      projectId,
      workspaceId,
      cookie,
      userIds: [testUserId, testUser2Id],
    });

    expect(res.status).toBe(201);
    expect(res.body.members).toHaveLength(2);
  });

  it("DELETE /api/projects/:projectId/members/:userId - should delete a project members", async () => {
    await addProjectMembers({ projectId, workspaceId, cookie, userIds: [testUserId] });

    const res = await deleteProjectMember({ projectId, userId: testUserId, cookie });

    expect(res.status).toBe(200);
    expect(res.body.member.userId).toBe(testUserId);
  });

  it("PUT /api/projects/:projectId/members/:userId - should change the project member role", async () => {
    await addProjectMembers({ projectId, workspaceId, cookie, userIds: [testUserId] });

    const res = await changeMemberRole({
      projectId,
      workspaceId,
      userId: testUserId,
      role: "COLLABORATOR",
      cookie,
    });

    expect(res.status).toBe(201);
    expect(res.body.members[0].role).toBe("COLLABORATOR");
  });
});

import { app } from "@/server";
import type { Project } from "@workspace/db";
import request from "supertest";

export type CreateProjectResponse = { project: Project };

export const createProject = async (
  cookie: string,
  body: Pick<Project, "name" | "description" | "logo">,
  workspaceId: string,
  statusCode?: number,
): Promise<CreateProjectResponse & { message: string }> => {
  const file = Buffer.from(body.logo ?? "test-logo");

  const req = request(app)
    .post(`/api/workspaces/${workspaceId}/project`)
    .set("Cookie", cookie)
    .field("name", body.name)
    .field("description", body.description ?? "");

  if (body.logo) {
    req.attach("logo", file, body.logo.toString());
  }

  const project = await req.expect(statusCode ?? 201);
  return project.body;
};

interface AddProjectMember {
  projectId: string;
  workspaceId: string;
  userIds: string[];
  role?: string;
  cookie: string;
}

export const addProjectMembers = async ({
  projectId,
  workspaceId,
  userIds,
  role = "ADMIN",
  cookie,
}: AddProjectMember) => {
  return request(app)
    .post(`/api/projects/${projectId}/members`)
    .set("Cookie", cookie)
    .send({ workspaceId, role, userId: userIds });
};

interface DeleteProjectMember {
  projectId: string;
  userId: string;
  cookie: string;
}

export const deleteProjectMember = async ({ projectId, userId, cookie }: DeleteProjectMember) => {
  return request(app).delete(`/api/projects/${projectId}/members/${userId}`).set("Cookie", cookie);
};

interface ChangeMemberRole {
  projectId: string;
  workspaceId: string;
  userId: string;
  role: string;
  cookie: string;
}

export const changeMemberRole = async ({
  projectId,
  userId,
  workspaceId,
  role,
  cookie,
}: ChangeMemberRole) => {
  return request(app)
    .put(`/api/projects/${projectId}/members/${userId}`)
    .set("Cookie", cookie)
    .send({ workspaceId, role });
};

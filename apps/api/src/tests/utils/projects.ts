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
    .field("description", body.description);

  if (body.logo) {
    req.attach("logo", file, body.logo.toString());
  }

  const project = await req.expect(statusCode ?? 201);
  return project.body;
};

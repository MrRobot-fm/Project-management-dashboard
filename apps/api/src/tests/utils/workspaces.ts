import { app } from "@/server";
import type { Workspace } from "@workspace/db";
import request from "supertest";

export type CreateWorkspaceResponse = { workspace: Workspace };

export const createWorkspace = async (
  cookie: string,
  name: string,
  statusCode?: number,
): Promise<CreateWorkspaceResponse> => {
  const workspace = await request(app)
    .post("/api/workspaces")
    .set("Cookie", cookie)
    .send({ name })
    .expect(statusCode ?? 201);

  return workspace.body;
};

export const getWorkspaces = async (cookie: string, statusCode?: number) => {
  const response = await request(app)
    .get("/api/workspaces")
    .set("Cookie", cookie)
    .expect(statusCode ?? 200);

  return response.body;
};

export const deleteWorkspace = async (
  cookie: string,
  workspaceId: string,
  statusCode?: number,
) => {
  const response = await request(app)
    .delete(`/api/workspaces/${workspaceId}`)
    .set("Cookie", cookie)
    .expect(statusCode ?? 204);

  return response.body;
};

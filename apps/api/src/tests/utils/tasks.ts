import { app } from "@/server";
import type { Task } from "@workspace/db";
import request from "supertest";

export const createTask = async ({
  projectId,
  newTask,
  cookie,
}: {
  projectId: string;
  newTask: Pick<Task, "title" | "description" | "status">;
  cookie: string;
}) => {
  return await request(app)
    .post(`/api/projects/${projectId}/tasks`)
    .set("Cookie", cookie)
    .send({
      ...newTask,
      projectId,
    });
};

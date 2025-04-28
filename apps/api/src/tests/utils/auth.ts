import { app } from "@/server";
import { prisma } from "@workspace/db";
import { hashSync } from "bcrypt";
import request from "supertest";

export async function createUsers(
  users: { email: string; name: string; password: string }[],
) {
  await prisma.user.createMany({
    data: users.map((user) => ({
      ...user,
      password: hashSync(user.password, 10),
    })),
  });
}

export async function loginUser(email: string, password: string) {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password })
    .expect(200);

  const cookies = res.headers["set-cookie"] as unknown as string[];
  const cookie = cookies.join("; ") || "";

  return { cookie, userId: res.body.user.id };
}

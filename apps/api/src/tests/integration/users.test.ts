import { app } from "@/server";
import { createUsers, loginUser } from "@/tests/utils/auth";
import { prisma } from "@workspace/db";
import request from "supertest";

describe("API Users", () => {
  let cookie: string;

  beforeEach(async () => {
    await createUsers([
      {
        name: "Test User 1",
        email: "test1@example.com",
        password: "test.user1",
      },
      {
        name: "Test User 2",
        email: "test2@example.com",
        password: "test.user2",
      },
    ]);

    const login = await loginUser("test1@example.com", "test.user1");

    cookie = login.cookie;
  });

  it("GET /api/users - returns users", async () => {
    const response: { body: { email: string }[] } = await request(app)
      .get("/api/users")
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body.some((u) => u.email === "test1@example.com")).toBe(
      true,
    );
  });

  it("POST /api/users - creates a new user", async () => {
    const newUser = {
      name: "New User",
      email: "new@example.com",
      password: "new.user",
    };

    const response = await request(app)
      .post("/api/users")
      .set("Cookie", cookie)
      .send(newUser)
      .expect(201);

    const userId = response.body.user.id;
    expect(userId).toBeDefined();

    const savedUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    expect(savedUser).not.toBeNull();
    expect(savedUser?.name).toBe(newUser.name);
    expect(savedUser?.email).toBe(newUser.email);
  });

  it("PUT /api/users/:id - updates a user", async () => {
    const user = await prisma.user.create({
      data: {
        name: "To Be Updated",
        email: "update@example.com",
        password: "user.to.update",
      },
    });

    const updateData = { name: "Updated Name" };

    await request(app)
      .put(`/api/users/${user.id}`)
      .set("Cookie", cookie)
      .send(updateData)
      .expect(200);

    const updated = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(updated?.name).toBe(updateData.name);
    expect(updated?.email).toBe(user.email);
  });

  it("DELETE /api/users/:id - deletes a user", async () => {
    const user = await prisma.user.create({
      data: {
        name: "To Be Deleted",
        email: "delete@example.com",
        password: "user.to.delete",
      },
    });

    await request(app)
      .delete(`/api/users/${user.id}`)
      .set("Cookie", cookie)
      .expect(204);

    const deleted = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(deleted).toBeNull();
  });
});

import { app } from "@/server";
import { createUsers, loginUser } from "@/tests/utils/auth";
import { generateUser } from "@/tests/utils/generate-user";
import { prisma } from "@workspace/db";
import { hashSync } from "bcrypt";
import request from "supertest";

describe("API Users", () => {
  let cookie: string;
  let adminUser: { name: string; password: string; email: string };

  beforeEach(async () => {
    adminUser = generateUser();
    const regularUser = generateUser();

    await createUsers([
      {
        ...adminUser,
        password: adminUser.password,
      },
      regularUser,
    ]);

    const login = await loginUser(adminUser.email, adminUser.password);
    cookie = login.cookie;
  });

  it("GET /api/users - returns users", async () => {
    const response: { body: { email: string }[] } = await request(app)
      .get("/api/users")
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body.some((u) => u.email === adminUser.email)).toBe(true);
  });

  it("POST /api/users - creates a new user", async () => {
    const newUser = generateUser();

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
    const userToUpdate = generateUser();

    const user = await prisma.user.create({
      data: {
        ...userToUpdate,
        password: hashSync(userToUpdate.password, 10),
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
    expect(updated?.email).toBe(userToUpdate.email);
  });

  it("DELETE /api/users/:id - deletes a user", async () => {
    const userToDelete = generateUser();

    const user = await prisma.user.create({
      data: {
        ...userToDelete,
        password: hashSync(userToDelete.password, 10),
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

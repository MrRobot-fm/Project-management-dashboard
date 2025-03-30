import { app } from "../../server.js";
import { prisma } from "../setup.js";
import request from "supertest";

describe("API Users", () => {
  let cookie: string;

  beforeEach(async () => {
    await prisma.user.createMany({
      data: [
        { name: "Test User 1", email: "test1@example.com", password: "ciao" },
        { name: "Test User 2", email: "test2@example.com", password: "test" },
      ],
    });

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "test1@example.com", password: "ciao" })
      .expect(200);

    const cookies = loginResponse.headers["set-cookie"] as unknown as string[];

    cookie =
      cookies.find((cookie: string) => cookie.startsWith("jwt_token=")) || "";
  });

  it("GET /api/users restituisce gli utenti", async () => {
    const response: { body: { email: string }[] } = await request(app)
      .get("/api/users")
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body.some((u) => u.email === "test1@example.com")).toBe(
      true,
    );
  });

  it("POST /api/users crea un nuovo utente", async () => {
    const newUser = {
      name: "Nuovo Utente",
      email: "nuovo@example.com",
      password: "XXXXXXXX",
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

  it("PUT /api/users/:id aggiorna un utente", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Da Aggiornare",
        email: "update@example.com",
        password: "XXXX",
      },
    });

    const updateData = { name: "Nome Aggiornato" };

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

  it("DELETE /api/users/:id elimina un utente", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Da Eliminare",
        email: "delete@example.com",
        password: "XXXX",
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

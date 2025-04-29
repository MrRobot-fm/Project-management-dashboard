import { app } from "@/server";
import { createUsers, loginUser } from "@/tests/utils/auth";
import { generateUser } from "@/tests/utils/generate-user";
import { getBasePath, removeExistingFiles } from "@/utils/storage";
import { prisma } from "@workspace/db";
import request from "supertest";

describe("API File Upload", () => {
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

  afterEach(async () => {
    const user = await prisma.user.findUnique({
      where: { email: adminUser.email },
    });
    const basePath = getBasePath(undefined, user?.id);

    await removeExistingFiles("user-logo", basePath);
  });

  it("PUT /api/users/:id - should upload a user logo", async () => {
    const user = await prisma.user.findUnique({
      where: { email: adminUser.email },
    });

    const file = Buffer.from("fake image data");
    const fileName = "logo.png";

    const response = await request(app)
      .put(`/api/users/${user?.id}`)
      .set("Cookie", cookie)
      .attach("logo", file, fileName)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.user.logo).toBeDefined();

    const updatedUser = await prisma.user.findUnique({
      where: { id: user?.id },
    });

    expect(updatedUser?.logo).toBeDefined();
  });

  it("PUT /api/users/:id - should fail if file type is not allowed", async () => {
    const user = await prisma.user.findUnique({
      where: { email: adminUser.email },
    });

    const file = Buffer.from("fake text data");
    const fileName = "invalid.txt";

    const response = await request(app)
      .put(`/api/users/${user?.id}`)
      .set("Cookie", cookie)
      .attach("logo", file, fileName)
      .expect(400);

    expect(response.body.message).toBe("File type not allowed");
  });

  it("PUT /api/users/:id - should fail if user is not authorized", async () => {
    const user = await prisma.user.findUnique({
      where: { email: adminUser.email },
    });

    const nonAdminUser = generateUser();

    await createUsers([nonAdminUser]);
    const nonAdminLogin = await loginUser(
      nonAdminUser.email,
      nonAdminUser.password,
    );
    const nonAdminCookie = nonAdminLogin.cookie;

    const file = Buffer.from("fake image data");
    const fileName = "logo.png";

    const response = await request(app)
      .put(`/api/users/${user?.id}`)
      .set("Cookie", nonAdminCookie)
      .attach("logo", file, fileName)
      .expect(401);

    expect(response.body.message).toBe(
      "User is not authorized - you can only modify your own user data",
    );
  });
});

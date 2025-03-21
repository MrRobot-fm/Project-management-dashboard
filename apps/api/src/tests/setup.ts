import { PrismaClient, Prisma } from "@workspace/db";
import "@workspace/vitest-config/setup";

const prisma = new PrismaClient();

interface TableResult {
  tablename: string;
}

beforeAll(async () => {
  try {
    const result = await prisma.$queryRaw(Prisma.sql`SELECT 1+1`);
    console.log("Successfully connected to the test database:", result);
  } catch (error) {
    console.error("Error connecting to the test database:", error);
    throw new Error("Unable to connect to the test database");
  }
});

afterEach(async () => {
  try {
    const tables = await prisma.$queryRaw<TableResult[]>(Prisma.sql`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
    `);

    for (const { tablename } of tables) {
      if (tablename !== "_prisma_migrations") {
        await prisma.$executeRaw(
          Prisma.sql`TRUNCATE TABLE "${Prisma.raw(tablename)}" CASCADE`,
        );
      }
    }
  } catch (error) {
    console.error("Error cleaning up the database:", error);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
  console.log("Successfully disconnected from the test database");
});

export { prisma };

import { PrismaClient, Prisma } from "@workspace/db";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export async function resetDatabase() {
  const tables = await prisma.$queryRaw<{ tablename: string }[]>(Prisma.sql`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  `);

  for (const { tablename } of tables) {
    if (tablename !== "_prisma_migrations") {
      await prisma.$executeRaw(Prisma.sql`TRUNCATE TABLE "${Prisma.raw(tablename)}" CASCADE`);
    }
  }
}

export async function disconnectPrisma() {
  await prisma.$disconnect();
}

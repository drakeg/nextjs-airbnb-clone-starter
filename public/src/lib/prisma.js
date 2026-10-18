import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required for database access.");
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.__roostPrisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__roostPrisma = prisma;
}

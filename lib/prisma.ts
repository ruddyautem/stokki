import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "@/app/generated/prisma8/contract.d";
import contractJson from "@/app/generated/prisma8/contract.json" with {
  type: "json",
};

const createDb = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");
  return postgres<Contract>({ url, contractJson });
};

const globalForPrisma = globalThis as unknown as {
  db?: ReturnType<typeof createDb>;
};

export const getDb = () => {
  globalForPrisma.db ??= createDb();
  return globalForPrisma.db;
};

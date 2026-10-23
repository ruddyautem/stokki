import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "@/app/generated/prisma8/contract.d";
import contractJson from "@/app/generated/prisma8/contract.json" with {
  type: "json",
};

const contract = contractFromJson<Contract>(contractJson);

const createDb = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");
  return postgres({ url, contract });
};

const globalForPrisma = globalThis as unknown as {
  db?: ReturnType<typeof createDb>;
};

export const getDb = () => {
  globalForPrisma.db ??= createDb();
  return globalForPrisma.db;
};

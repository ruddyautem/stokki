import "dotenv/config";
import { defineConfig as definePostgresConfig } from "@prisma/orm-postgres/config";
import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  orm: definePostgresConfig({
    contract: "prisma8/contract.prisma",
    output: "app/generated/prisma8",
    db: {
      connection:
        process.env.DATABASE_URL ||
        "postgresql://invalid:invalid@127.0.0.1:1/invalid",
    },
  }),
});

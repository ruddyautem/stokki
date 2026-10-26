import { getDb } from "./prisma";
export async function stockSummary(userId: string) {
  const db = getDb();
  const [result] = await db.query(
    db.raw.sql`SELECT COUNT(*)::int AS "totalCount",
    COUNT(*) FILTER (WHERE quantity > COALESCE("lowStockAt", 5))::int AS "inStockCount",
    COUNT(*) FILTER (WHERE quantity > 0 AND quantity <= COALESCE("lowStockAt", 5))::int AS "lowStockCount",
    COUNT(*) FILTER (WHERE quantity = 0)::int AS "outOfStockCount",
    COALESCE(SUM(price * quantity), 0)::float8 AS "totalValue"
    FROM "public"."Product" WHERE "userId" = ${userId}`
      .returnsRow({
        totalCount: "pg/int4@1",
        inStockCount: "pg/int4@1",
        lowStockCount: "pg/int4@1",
        outOfStockCount: "pg/int4@1",
        totalValue: "pg/float8@1",
      })
      .build(),
  );
  return result;
}

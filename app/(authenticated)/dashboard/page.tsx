import DashboardClient from "@/components/DashboardClient";
import getCurrentUser from "@/lib/auth";
import { getDb } from "@/lib/prisma";
import { stockSummary } from "@/lib/stock-summary";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) throw new Error("Unauthorized");
  const db = getDb();

  const [stats, recent] = await Promise.all([
    stockSummary(userId),
    db.orm.public.Product.where({ userId })
      .orderBy((p) => p.createdAt.desc())
      .limit(5)
      .all(),
  ]);
  const totalProducts = stats.totalCount;
  const lowStock = stats.lowStockCount;
  const inStockCount = stats.inStockCount;
  const lowStockCount = stats.lowStockCount;
  const outOfStockCount = stats.outOfStockCount;
  const totalValue = stats.totalValue;

  // Convert exact decimal strings to numbers for Client Components.
  const serializedRecent = recent.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  const pct = (count: number) =>
    totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;

  const inStockPercentage = pct(inStockCount);
  const lowStockPercentage = pct(lowStockCount);
  const outOfStockPercentage = pct(outOfStockCount);

  const now = new Date();
  const weeklyProductsData = [];

  // Fetch only grouped counts for the visible 12-week window, not all historical rows.
  const since = new Date(now);
  since.setUTCDate(since.getUTCDate() - 77);
  since.setUTCHours(0, 0, 0, 0);
  const weekly = await db.query(
    db.raw
      .sql`SELECT (("createdAt"::date - ${since.toISOString().slice(0, 10)}::date) / 7)::int AS bucket, COUNT(*)::int AS count FROM "public"."Product" WHERE "userId" = ${userId} AND "createdAt" >= ${since.toISOString()}::timestamp AND "createdAt" <= ${now.toISOString()}::timestamp GROUP BY bucket`
      .returnsRow({ bucket: "pg/int4@1", count: "pg/int4@1" })
      .build(),
  );
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setUTCDate(weekStart.getUTCDate() - i * 7);
    weekStart.setUTCHours(0, 0, 0, 0);

    const weekLabel = `${String(weekStart.getUTCMonth() + 1).padStart(
      2,
      "0",
    )}/${String(weekStart.getUTCDate()).padStart(2, "0")}`;

    const weekCount = weekly.find((row) => row.bucket === 11 - i)?.count ?? 0;
    weeklyProductsData.push({ week: weekLabel, products: weekCount });
  }

  return (
    <DashboardClient
      totalProducts={totalProducts}
      totalValue={totalValue}
      lowStock={lowStock}
      weeklyProductsData={weeklyProductsData}
      recent={serializedRecent}
      inStockCount={inStockCount}
      lowStockCount={lowStockCount}
      outOfStockCount={outOfStockCount}
      inStockPercentage={inStockPercentage}
      lowStockPercentage={lowStockPercentage}
      outOfStockPercentage={outOfStockPercentage}
    />
  );
};
export default DashboardPage;

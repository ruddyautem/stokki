import DashboardClient from "@/components/DashboardClient";
import getCurrentUser from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;

  // PERF FIX: use DB-level count() for stock levels instead of JS-filtering
  // all products in memory. totalValue still needs price*qty (no native Prisma
  // aggregate for product expressions), but we avoid fetching createdAt for it.
  const [
    totalProducts,
    lowStock,
    inStockCount,
    lowStockCount,
    outOfStockCount,
    priceQtyProducts,
    weeklyProducts,
    recent,
  ] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: { userId, lowStockAt: { not: null }, quantity: { lte: 5 } },
    }),
    // DB counts — avoids loading all products into JS memory
    prisma.product.count({ where: { userId, quantity: { gt: 5 } } }),
    prisma.product.count({
      where: {
        userId,
        AND: [{ quantity: { lt: 5 } }, { quantity: { gte: 1 } }],
      },
    }),
    prisma.product.count({ where: { userId, quantity: { equals: 0 } } }),
    // Minimal selects — only what each computation needs
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { createdAt: true },
    }),
    prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const totalValue = priceQtyProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  // Convert Prisma Decimals to plain numbers/objects for Client Components
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

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      "0",
    )}/${String(weekStart.getDate()).padStart(2, "0")}`;

    const weekCount = weeklyProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    }).length;
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

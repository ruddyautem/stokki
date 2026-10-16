import DashboardClient from "@/components/DashboardClient";
import getCurrentUser from "@/lib/auth";
import { getDb } from "@/lib/prisma";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) throw new Error("Unauthorized");
  const db = getDb();

  // PERF FIX: use DB-level count() for stock levels instead of JS-filtering
  // all products in memory. totalValue still needs price*qty (no native Prisma
  // aggregate for product expressions), but we avoid fetching createdAt for it.
  const [
    totalProductsResult,
    lowStockResult,
    inStockResult,
    lowQuantityResult,
    outOfStockResult,
    priceQtyProducts,
    weeklyProducts,
    recent,
  ] = await Promise.all([
    db.orm.public.Product.where({ userId }).aggregate((agg) => ({
      count: agg.count(),
    })),
    db.orm.public.Product.where({ userId })
      .where((product) => product.lowStockAt.isNotNull())
      .where((product) => product.quantity.lte(5))
      .aggregate((agg) => ({ count: agg.count() })),
    // DB counts — avoids loading all products into JS memory
    db.orm.public.Product.where({ userId })
      .where((product) => product.quantity.gt(5))
      .aggregate((agg) => ({ count: agg.count() })),
    db.orm.public.Product.where({ userId })
      .where((product) => product.quantity.lt(5))
      .where((product) => product.quantity.gte(1))
      .aggregate((agg) => ({ count: agg.count() })),
    db.orm.public.Product.where({ userId })
      .where({ quantity: 0 })
      .aggregate((agg) => ({ count: agg.count() })),
    // Minimal selects — only what each computation needs
    db.orm.public.Product.where({ userId }).select("price", "quantity").all(),
    db.orm.public.Product.where({ userId }).select("createdAt").all(),
    db.orm.public.Product.where({ userId })
      .orderBy((product) => product.createdAt.desc())
      .limit(5)
      .all(),
  ]);

  const totalProducts = totalProductsResult.count;
  const lowStock = lowStockResult.count;
  const inStockCount = inStockResult.count;
  const lowStockCount = lowQuantityResult.count;
  const outOfStockCount = outOfStockResult.count;

  const totalValue = priceQtyProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

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
      const productDate = new Date(`${product.createdAt.replace(" ", "T")}Z`);
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

import ProductsChart from "@/components/ProductsChart";
import StockDonutChart from "@/components/StockDonutChart";
import StatCard from "@/components/StatCard";
import StockLegendItem from "@/components/StockLegendItem";
import PageLayout from "@/components/PageLayout";
import getCurrentUser from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TrendingUp, Package, DollarSign, AlertTriangle } from "lucide-react";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;

  const [totalProducts, lowStock, allProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: { userId, lowStockAt: { not: null }, quantity: { lte: 5 } },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true, createdAt: true },
    }),
  ]);

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;
  const lowStockCount = allProducts.filter(
    (p) => Number(p.quantity) < 5 && Number(p.quantity) >= 1,
  ).length;
  const outOfStockCount = allProducts.filter(
    (p) => Number(p.quantity) === 0,
  ).length;

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

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });
    weeklyProductsData.push({ week: weekLabel, products: weekProducts.length });
  }

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stockData = [
    { name: "En stock", value: inStockCount, percentage: inStockPercentage },
    {
      name: "Stock faible",
      value: lowStockCount,
      percentage: lowStockPercentage,
    },
    {
      name: "Rupture de stock",
      value: outOfStockCount,
      percentage: outOfStockPercentage,
    },
  ];

  const trendingBadge = (value: string) => (
    <div className='flex items-center text-emerald-600 text-sm font-medium justify-center sm:justify-start'>
      <TrendingUp className='w-4 h-4 mr-1' />
      {value}
    </div>
  );

  return (
    <PageLayout
      title="Tableau de bord"
      subtitle="Voici un aperçu de vos statistiques d'inventaire"
    >
      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8'>
        <StatCard
          icon={Package}
          iconBg='bg-slate-100'
          iconColor='text-slate-700'
          value={String(totalProducts)}
          label='Total produits'
          badge={trendingBadge(`+${totalProducts}`)}
        />
        <StatCard
          icon={DollarSign}
          iconBg='bg-slate-100'
          iconColor='text-[#10b981]'
          value={`${Number(totalValue).toFixed(0)} €`}
          label='Valeur totale'
          badge={trendingBadge(`+${Number(totalValue).toFixed(0)} €`)}
        />
        <StatCard
          icon={AlertTriangle}
          iconBg='bg-amber-100'
          iconColor='text-amber-600'
          value={String(lowStock)}
          label='Stock faible'
          badge={
            <div className='flex items-center text-slate-600 text-sm font-medium justify-center sm:justify-start'>
              {lowStock} alertes
            </div>
          }
        />
      </div>

      {/* Chart + Stock Levels */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-6 lg:mb-8'>
        {/* Products Chart */}
        <div className='bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm text-center lg:text-left'>
          <h2 className='text-lg font-bold text-slate-900 mb-4 sm:mb-6'>
            Nouveaux produits (par semaine)
          </h2>
          <div className='w-full h-40 sm:h-48'>
            <ProductsChart data={weeklyProductsData} />
          </div>
        </div>

        {/* Stock Levels */}
        <div className='bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm'>
          <h2 className='text-lg font-bold text-slate-900 text-center lg:text-left w-full mb-4 sm:mb-6'>
            Quantité de produits en stock
          </h2>
          <div className='space-y-3'>
            {recent.length === 0 ? (
              <p className='text-center text-slate-500 py-8'>
                Aucun produit trouvé
              </p>
            ) : (
              recent.map((product) => {
                const stockLevel =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                      ? 1
                      : 2;

                const bgColors = [
                  "bg-red-500",
                  "bg-amber-500",
                  "bg-emerald-500",
                ];

                return (
                  <div
                    className='flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors'
                    key={product.id}
                  >
                    <div className='flex items-center space-x-3'>
                      <div
                        className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}
                      />
                      <span className='text-sm font-medium text-slate-900'>
                        {product.name}
                      </span>
                    </div>
                    <div className='text-sm font-semibold text-slate-900'>
                      {product.quantity} unités
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Stock Percentage */}
      <div className='bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm'>
        <h2 className='text-lg font-bold text-slate-900 text-center lg:text-left w-full mb-4 sm:mb-6'>
          Niveau de stock (en pourcentage)
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center'>
          <div className='flex items-center justify-center py-4 order-first lg:order-first'>
            <StockDonutChart
              data={stockData}
              inStockPercentage={inStockPercentage}
            />
          </div>
          <div className='flex flex-col space-y-3 sm:space-y-4 items-center sm:items-start'>
            <StockLegendItem
              color='bg-[#10b981]'
              label='En stock'
              value={`${inStockPercentage}%`}
            />
            <StockLegendItem
              color='bg-[#f59e0b]'
              label='Stock faible'
              value={`${lowStockPercentage}%`}
            />
            <StockLegendItem
              color='bg-[#ef4444]'
              label='Rupture de stock'
              value={`${outOfStockPercentage}%`}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
export default DashboardPage;

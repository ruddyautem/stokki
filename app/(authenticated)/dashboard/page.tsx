import ProductsChart from "@/components/ProductsChart";
import StockDonutChart from "@/components/StockDonutChart";
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
    0
  );

  const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;
  const lowStockCount = allProducts.filter(
    (p) => Number(p.quantity) < 5 && Number(p.quantity) >= 1
  ).length;
  const outOfStockCount = allProducts.filter(
    (p) => Number(p.quantity) === 0
  ).length;

  const inStockPercentage =
    totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
  const lowStockPercentage =
    totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
  const outOfStockPercentage =
    totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

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
      "0"
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

  return (
    <div className='min-h-screen bg-slate-50'>
      <main className='ml-64 p-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-slate-900'>
                Tableau de bord
              </h1>
              <p className='text-slate-600 mt-1'>
                Voici un aperçu de vos statistiques d'inventaire
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between mb-4'>
              <div className='bg-slate-100 rounded-lg p-3'>
                <Package className='w-6 h-6 text-slate-700' />
              </div>
              <div className='flex items-center text-emerald-600 text-sm font-medium'>
                <TrendingUp className='w-4 h-4 mr-1' />+{totalProducts}
              </div>
            </div>
            <div className='text-3xl font-bold text-slate-900 mb-1'>
              {totalProducts}
            </div>
            <div className='text-sm text-slate-600'>Total produits</div>
          </div>

          <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between mb-4'>
              <div className='bg-slate-100 rounded-lg p-3'>
                <DollarSign className='w-6 h-6 text-[#10b981]' />
              </div>
              <div className='flex items-center text-emerald-600 text-sm font-medium'>
                <TrendingUp className='w-4 h-4 mr-1' />+
                {Number(totalValue).toFixed(0)} €
              </div>
            </div>
            <div className='text-3xl font-bold text-slate-900 mb-1'>
              {Number(totalValue).toFixed(0)} €
            </div>
            <div className='text-sm text-slate-600'>Valeur totale</div>
          </div>

          <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between mb-4'>
              <div className='bg-amber-100 rounded-lg p-3'>
                <AlertTriangle className='w-6 h-6 text-amber-600' />
              </div>
              <div className='flex items-center text-slate-600 text-sm font-medium'>
                {lowStock} alertes
              </div>
            </div>
            <div className='text-3xl font-bold text-slate-900 mb-1'>
              {lowStock}
            </div>
            <div className='text-sm text-slate-600'>Stock faible</div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* Products Chart */}
          <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-bold text-slate-900'>
                Nouveaux produits (par semaine)
              </h2>
            </div>
            <div className='h-48'>
              <ProductsChart data={weeklyProductsData} />
            </div>
          </div>

          {/* Stock Levels */}
          <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-bold text-slate-900'>
                Quantité de produits en stock
              </h2>
            </div>
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
        <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-lg font-bold text-slate-900'>
              Niveau de stock (en pourcentage)
            </h2>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='flex items-center justify-center'>
              <StockDonutChart
                data={stockData}
                inStockPercentage={inStockPercentage}
              />
            </div>
            <div className='flex flex-col justify-center space-y-4'>
              <div className='flex items-center justify-between p-4 rounded-lg bg-slate-50'>
                <div className='flex items-center space-x-3'>
                  <div className='w-4 h-4 rounded-full bg-[#10b981]' />
                  <span className='text-sm font-medium text-slate-900'>
                    En stock
                  </span>
                </div>
                <span className='text-lg font-bold text-slate-900'>
                  {inStockPercentage}%
                </span>
              </div>
              <div className='flex items-center justify-between p-4 rounded-lg bg-slate-50'>
                <div className='flex items-center space-x-3'>
                  <div className='w-4 h-4 rounded-full bg-[#f59e0b]' />
                  <span className='text-sm font-medium text-slate-900'>
                    Stock faible
                  </span>
                </div>
                <span className='text-lg font-bold text-slate-900'>
                  {lowStockPercentage}%
                </span>
              </div>
              <div className='flex items-center justify-between p-4 rounded-lg bg-slate-50'>
                <div className='flex items-center space-x-3'>
                  <div className='w-4 h-4 rounded-full bg-[#ef4444]' />
                  <span className='text-sm font-medium text-slate-900'>
                    Rupture de stock
                  </span>
                </div>
                <span className='text-lg font-bold text-slate-900'>
                  {outOfStockPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default DashboardPage;

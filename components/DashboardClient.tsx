"use client";

import { AlertTriangle, DollarSign, Package } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ProductsChart from "@/components/ProductsChart";
import StatCard from "@/components/StatCard";
import StockDonutChart from "@/components/StockDonutChart";
import StockLegendItem from "@/components/StockLegendItem";
import { useLanguage } from "@/context/LanguageContext";

interface RecentProduct {
  id: string;
  name: string;
  quantity: number;
  lowStockAt: number | null;
}

interface DashboardClientProps {
  totalProducts: number;
  totalValue: number;
  lowStock: number;
  weeklyProductsData: { week: string; products: number }[];
  recent: RecentProduct[];
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
  inStockPercentage: number;
  lowStockPercentage: number;
  outOfStockPercentage: number;
}

export default function DashboardClient({
  totalProducts,
  totalValue,
  lowStock,
  weeklyProductsData,
  recent,
  inStockCount,
  lowStockCount,
  outOfStockCount,
  inStockPercentage,
  lowStockPercentage,
  outOfStockPercentage,
}: DashboardClientProps) {
  const { t, language } = useLanguage();

  const stockData = [
    {
      name: t.dashboard.inStock,
      value: inStockCount,
      percentage: inStockPercentage,
    },
    {
      name: t.dashboard.lowStock,
      value: lowStockCount,
      percentage: lowStockPercentage,
    },
    {
      name: t.dashboard.outOfStockItem,
      value: outOfStockCount,
      percentage: outOfStockPercentage,
    },
  ];

  return (
    <PageLayout title={t.dashboard.title} subtitle={t.dashboard.subtitle}>
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2.5 lg:gap-3.5 xl:gap-5 2xl:gap-6 3xl:gap-8 mb-3 lg:mb-3.5 2xl:mb-5 3xl:mb-8 shrink-0">
        <StatCard
          icon={Package}
          iconBg="bg-indigo-500/10 dark:bg-indigo-500/20"
          iconColor="text-indigo-600 dark:text-indigo-400"
          accentBg="bg-linear-to-b from-indigo-50/50 to-white dark:from-slate-900 dark:to-slate-900"
          borderColor="border-indigo-100 dark:border-slate-800 sm:border-slate-200/80"
          value={String(totalProducts)}
          label={t.dashboard.totalProducts}
        />
        <StatCard
          icon={DollarSign}
          iconBg="bg-emerald-500/10 dark:bg-emerald-500/20"
          iconColor="text-emerald-600 dark:text-emerald-400"
          accentBg="bg-linear-to-b from-emerald-50/50 to-white dark:from-slate-900 dark:to-slate-900"
          borderColor="border-emerald-100 dark:border-slate-800 sm:border-slate-200/80"
          value={`${Number(totalValue).toFixed(0)} €`}
          label={t.dashboard.totalValue}
        />
        <StatCard
          icon={AlertTriangle}
          iconBg={
            lowStock > 0
              ? "bg-amber-500/10 dark:bg-amber-500/20"
              : "bg-slate-100 dark:bg-slate-800"
          }
          iconColor={
            lowStock > 0
              ? "text-amber-600 dark:text-amber-400"
              : "text-slate-500 dark:text-slate-400"
          }
          accentBg={
            lowStock > 0
              ? "bg-linear-to-b from-amber-50/50 to-white dark:from-slate-900 dark:to-slate-900"
              : "bg-white dark:bg-slate-900"
          }
          borderColor={
            lowStock > 0
              ? "border-amber-200 dark:border-slate-800 sm:border-slate-200/80"
              : "border-slate-200/80 dark:border-slate-800"
          }
          value={String(lowStock)}
          label={t.dashboard.lowStockAlert}
        />
      </div>

      {/* Chart + Stock Levels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 lg:gap-3.5 xl:gap-5 2xl:gap-6 3xl:gap-8 mb-3 lg:mb-3.5 2xl:mb-5 3xl:mb-8">
        {/* Products Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 lg:p-4 2xl:p-5 3xl:p-7 shadow-sm text-center lg:text-left flex flex-col justify-between transition-colors">
          <h2 className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-2.5 2xl:mb-3 3xl:mb-5">
            {t.dashboard.stockEvolution}
          </h2>
          <div className="w-full h-36 sm:h-40 lg:h-38 xl:h-44 2xl:h-56 3xl:h-72">
            <ProductsChart data={weeklyProductsData} />
          </div>
        </div>

        {/* Stock Levels */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 lg:p-4 2xl:p-5 3xl:p-7 shadow-sm flex flex-col justify-between transition-colors">
          <h2 className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl font-bold text-slate-900 dark:text-white text-center lg:text-left w-full mb-2 sm:mb-2.5 2xl:mb-3 3xl:mb-5">
            {t.dashboard.recentProducts}
          </h2>
          <div className="space-y-1.5 2xl:space-y-2 3xl:space-y-3.5 flex-1 flex flex-col justify-center">
            {recent.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-6">
                {t.dashboard.noProducts}
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
                    className="flex items-center justify-between px-3 py-1.5 lg:py-1.5 2xl:py-2.5 2xl:px-4 3xl:py-3.5 3xl:px-5 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    key={product.id}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`w-2.5 h-2.5 2xl:w-3 2xl:h-3 3xl:w-3.5 3xl:h-3.5 rounded-full ${bgColors[stockLevel]}`}
                      />
                      <span className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-medium text-slate-900 dark:text-slate-200">
                        {product.name}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {product.quantity}{" "}
                      {language === "en"
                        ? product.quantity > 1
                          ? "units"
                          : "unit"
                        : product.quantity > 1
                          ? "unités"
                          : "unité"}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Stock Percentage */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 lg:p-4 2xl:p-5 3xl:p-7 shadow-sm mb-6 lg:mb-0 transition-colors">
        <h2 className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl font-bold text-slate-900 dark:text-white text-center lg:text-left w-full mb-2 sm:mb-2.5 2xl:mb-3 3xl:mb-5">
          {t.dashboard.stockLevels} ({t.dashboard.stockPercentage})
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 2xl:gap-6 3xl:gap-8 items-center">
          <div className="flex items-center justify-center py-1 2xl:py-2 3xl:py-5">
            <StockDonutChart
              data={stockData}
              inStockPercentage={inStockPercentage}
            />
          </div>
          <div className="flex flex-col space-y-1.5 lg:space-y-2 2xl:space-y-3 3xl:space-y-4">
            <StockLegendItem
              color="bg-[#10b981]"
              label={t.dashboard.inStock}
              value={`${inStockPercentage}%`}
            />
            <StockLegendItem
              color="bg-[#f59e0b]"
              label={t.dashboard.lowStock}
              value={`${lowStockPercentage}%`}
            />
            <StockLegendItem
              color="bg-[#ef4444]"
              label={t.dashboard.outOfStockItem}
              value={`${outOfStockPercentage}%`}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

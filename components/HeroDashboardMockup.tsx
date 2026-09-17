"use client";

import {
  AlertTriangle,
  Blocks,
  ChevronUp,
  DollarSign,
  Moon,
  Package,
  Plus,
  Settings,
  Sun,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ProductsChart from "./ProductsChart";

const mockChartData = [
  { week: "06/10", products: 6 },
  { week: "06/17", products: 9 },
  { week: "06/24", products: 5 },
  { week: "07/01", products: 14 },
  { week: "07/08", products: 10 },
  { week: "07/15", products: 16 },
  { week: "07/22", products: 22 },
  { week: "07/29", products: 18 },
  { week: "08/05", products: 25 },
  { week: "08/12", products: 34 },
  { week: "08/19", products: 28 },
  { week: "08/26", products: 42 },
];

export default function HeroDashboardMockup() {
  const { t, language } = useLanguage();
  const isEn = language === "en";

  const recentProducts = [
    {
      id: "1",
      name: "iPhone 15 Pro",
      quantity: 14,
      color: "bg-emerald-500",
    },
    {
      id: "2",
      name: "MacBook Air M3",
      quantity: 3,
      color: "bg-amber-500",
    },
    {
      id: "3",
      name: "AirPods Pro 2",
      quantity: 26,
      color: "bg-emerald-500",
    },
    {
      id: "4",
      name: isEn ? "Magic Keyboard" : "Clavier Magic",
      quantity: 2,
      color: "bg-amber-500",
    },
    {
      id: "5",
      name: isEn ? "USB-C Cable (2m)" : "Câble USB-C (2m)",
      quantity: 0,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-1.5 sm:p-2.5 lg:p-3 shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/80 flex flex-col text-slate-800 dark:text-slate-200 font-sans transition-colors">
      <div className="w-full rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden">
        {/* Mock Browser Header */}
        <div className="relative h-9 sm:h-10 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex items-center justify-between px-3 sm:px-4 shrink-0 select-none">
          {/* macOS window control buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 z-10">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57] shadow-xs" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e] shadow-xs" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840] shadow-xs" />
          </div>

          {/* Browser Address Pill (absolutely centered) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-14 sm:px-36">
            <div className="h-5 sm:h-6 px-3 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono pointer-events-auto shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>stokki.autem.dev/dashboard</span>
            </div>
          </div>

          {/* Window action badge */}
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs z-10">
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
              {isEn ? "LIVE PREVIEW" : "APERÇU EN DIRECT"}
            </span>
          </div>
        </div>

        {/* Mock Application Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          {/* Desktop Authentic Sidebar */}
          <aside className="hidden lg:flex flex-col w-56 xl:w-64 2xl:w-68 border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 pt-3.5 2xl:pt-5 pb-3 2xl:pb-4 px-3.5 2xl:px-4 shrink-0 select-none">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4 2xl:mb-5 px-1 shrink-0">
              <div className="bg-linear-to-br from-indigo-600 to-indigo-700 rounded-lg p-1.5 shadow-md">
                <Blocks className="w-4 h-4 2xl:w-4.5 2xl:h-4.5 text-white" />
              </div>
              <span className="text-lg xl:text-xl 2xl:text-xl font-bold tracking-tight text-slate-900 dark:text-white block">
                Stokki
              </span>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-1 2xl:gap-1.5 flex-1">
              <div className="text-[10px] 2xl:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 px-3 shrink-0">
                {t.nav.menu}
              </div>

              {/* Active Dashboard item */}
              <div className="flex items-center space-x-3 py-2 2xl:py-2.5 rounded-xl px-3 bg-indigo-600 text-white shadow-md shadow-indigo-600/20 shrink-0 font-medium text-xs xl:text-sm">
                <Blocks className="w-4 h-4 text-white shrink-0" />
                <span>{t.nav.dashboard}</span>
              </div>

              {/* Inactive Items */}
              <div className="flex items-center space-x-3 py-2 2xl:py-2.5 rounded-xl px-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 shrink-0 text-xs xl:text-sm font-medium transition-colors">
                <Package className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                <span>{t.nav.inventory}</span>
              </div>

              <div className="flex items-center space-x-3 py-2 2xl:py-2.5 rounded-xl px-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 shrink-0 text-xs xl:text-sm font-medium transition-colors">
                <Plus className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                <span>{t.nav.addProduct}</span>
              </div>

              <div className="flex items-center space-x-3 py-2 2xl:py-2.5 rounded-xl px-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 shrink-0 text-xs xl:text-sm font-medium transition-colors">
                <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                <span>{t.nav.settings}</span>
              </div>
            </div>

            {/* User Profile at bottom */}
            <div className="mt-auto -mx-3.5 2xl:-mx-4 px-3.5 2xl:px-4 pt-2.5 2xl:pt-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shrink-0">
              <div className="flex items-center w-full gap-2.5 p-1.5 -mx-1.5 rounded-lg text-left">
                <div className="shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {isEn ? "TU" : "UT"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {isEn ? "Test User" : "Utilisateur Test"}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    test@stokki.dev
                  </p>
                </div>
                <ChevronUp className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
            {/* Authentic Mobile Header for small screens */}
            <div className="lg:hidden px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-linear-to-br from-indigo-600 to-indigo-700 rounded-lg p-1.5 shadow-xs">
                  <Blocks className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                  Stokki
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="h-6 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center font-semibold text-slate-700 dark:text-slate-300 text-[11px]">
                  {isEn ? "EN" : "FR"}
                </div>
                <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <Sun className="w-3.5 h-3.5 dark:hidden text-amber-500" />
                  <Moon className="w-3.5 h-3.5 hidden dark:block text-indigo-400" />
                </div>
              </div>
            </div>

            {/* Dashboard Content Container */}
            <div className="p-3 sm:p-4 lg:p-4 2xl:p-6 space-y-2.5 sm:space-y-3.5 2xl:space-y-4">
              {/* Page Title & Subtitle */}
              <div className="text-center lg:text-left shrink-0">
                <h1 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {t.dashboard.title}
                </h1>
                <p className="text-[11px] sm:text-xs lg:text-xs 2xl:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  {t.dashboard.subtitle}
                </p>
              </div>

              {/* ROW 1: 3 StatCards (generous, sharp, readable) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-3.5 2xl:gap-5 shrink-0">
                {/* Total References */}
                <div className="bg-linear-to-b from-indigo-50/60 to-white dark:from-slate-900 dark:to-slate-900 border border-indigo-100 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 lg:p-3 2xl:p-4 shadow-sm flex flex-col justify-between items-center lg:items-start text-center lg:text-left min-w-0">
                  <div className="w-full lg:w-auto mb-1 sm:mb-1.5 2xl:mb-2">
                    <div className="w-full lg:w-8.5 lg:h-8.5 2xl:w-10 2xl:h-10 h-7.5 sm:h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Package className="w-4 h-4 lg:w-4.5 lg:h-4.5 2xl:w-5 2xl:h-5" />
                    </div>
                  </div>
                  <div className="w-full min-w-0">
                    <div className="text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none truncate">
                      1 248
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-xs 2xl:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate mt-1">
                      {t.dashboard.totalProducts}
                    </div>
                  </div>
                </div>

                {/* Total Value */}
                <div className="bg-linear-to-b from-emerald-50/60 to-white dark:from-slate-900 dark:to-slate-900 border border-emerald-100 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 lg:p-3 2xl:p-4 shadow-sm flex flex-col justify-between items-center lg:items-start text-center lg:text-left min-w-0">
                  <div className="w-full lg:w-auto mb-1 sm:mb-1.5 2xl:mb-2">
                    <div className="w-full lg:w-8.5 lg:h-8.5 2xl:w-10 2xl:h-10 h-7.5 sm:h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <DollarSign className="w-4 h-4 lg:w-4.5 lg:h-4.5 2xl:w-5 2xl:h-5" />
                    </div>
                  </div>
                  <div className="w-full min-w-0">
                    <div className="text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none truncate">
                      {isEn ? "€14,500" : "14 500 €"}
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-xs 2xl:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate mt-1">
                      {t.dashboard.totalValue}
                    </div>
                  </div>
                </div>

                {/* Low Stock */}
                <div className="bg-linear-to-b from-amber-50/60 to-white dark:from-slate-900 dark:to-slate-900 border border-amber-200 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 lg:p-3 2xl:p-4 shadow-sm flex flex-col justify-between items-center lg:items-start text-center lg:text-left min-w-0">
                  <div className="w-full lg:w-auto mb-1 sm:mb-1.5 2xl:mb-2">
                    <div className="w-full lg:w-8.5 lg:h-8.5 2xl:w-10 2xl:h-10 h-7.5 sm:h-8 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-4 h-4 lg:w-4.5 lg:h-4.5 2xl:w-5 2xl:h-5" />
                    </div>
                  </div>
                  <div className="w-full min-w-0">
                    <div className="text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none truncate">
                      5
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-xs 2xl:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate mt-1">
                      {t.dashboard.lowStockAlert}
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: Chart & Recent Products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3.5 2xl:gap-5">
                {/* Products Evolution Chart */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-2.5 sm:p-3 lg:p-3 2xl:p-4 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <h2 className="text-xs sm:text-sm lg:text-sm 2xl:text-base font-bold text-slate-900 dark:text-white">
                      {t.dashboard.stockEvolution}
                    </h2>
                    <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="w-3 h-3" />
                      +32%
                    </span>
                  </div>
                  <div className="w-full h-28 sm:h-32 lg:h-32 xl:h-34 2xl:h-40">
                    <ProductsChart data={mockChartData} />
                  </div>
                </div>

                {/* Recent Products List */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-2.5 sm:p-3 lg:p-3 2xl:p-4 shadow-sm flex flex-col justify-between transition-colors">
                  <h2 className="text-xs sm:text-sm lg:text-sm 2xl:text-base font-bold text-slate-900 dark:text-white mb-1.5 text-center lg:text-left">
                    {t.dashboard.recentProducts}
                  </h2>
                  <div className="space-y-1 sm:space-y-1.5 2xl:space-y-2 flex-1 flex flex-col justify-center">
                    {recentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between px-2.5 2xl:px-3 py-1 sm:py-1.5 2xl:py-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center space-x-2 2xl:space-x-2.5 min-w-0">
                          <div
                            className={`w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full shrink-0 ${product.color}`}
                          />
                          <span className="text-xs sm:text-xs lg:text-xs 2xl:text-sm font-medium text-slate-900 dark:text-slate-200 truncate">
                            {product.name}
                          </span>
                        </div>
                        <div className="text-xs sm:text-xs lg:text-xs 2xl:text-sm font-semibold text-slate-900 dark:text-slate-100 shrink-0 ml-2">
                          {product.quantity}{" "}
                          {product.quantity > 1
                            ? isEn
                              ? "units"
                              : "unités"
                            : isEn
                              ? "unit"
                              : "unité"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ROW 3: Stock Percentage & Donut Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-2.5 sm:p-3 lg:p-3 2xl:p-4 shadow-sm transition-colors">
                <h2 className="text-xs sm:text-sm lg:text-sm 2xl:text-base font-bold text-slate-900 dark:text-white text-center lg:text-left mb-1.5 2xl:mb-2">
                  {t.dashboard.stockLevels} ({t.dashboard.stockPercentage})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 2xl:gap-5 items-center">
                  {/* Clean, well-sized Donut Chart */}
                  <div className="flex items-center justify-center py-0.5">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-28 lg:h-28 2xl:w-34 2xl:h-34 flex items-center justify-center">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        {/* Background track */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-slate-100 dark:text-slate-800"
                        />
                        {/* In stock 78% (emerald) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeDasharray="238.76"
                          strokeDashoffset="52.5"
                          strokeLinecap="round"
                        />
                        {/* Low stock 15% (amber) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          strokeDasharray="35.8 202.9"
                          strokeDashoffset="-186.2"
                          strokeLinecap="round"
                        />
                        {/* Out of stock 7% (red) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#ef4444"
                          strokeWidth="8"
                          strokeDasharray="16.7 222"
                          strokeDashoffset="-222"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-base sm:text-lg 2xl:text-xl font-black text-slate-900 dark:text-white leading-none">
                          78%
                        </span>
                        <span className="text-[9px] sm:text-[10px] 2xl:text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                          {t.dashboard.inStock}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Legend rows */}
                  <div className="flex flex-col space-y-1 sm:space-y-1.5 2xl:space-y-2">
                    <div className="flex items-center justify-between p-1.5 sm:p-2 2xl:p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                        <span className="text-xs sm:text-xs lg:text-xs 2xl:text-sm font-medium text-slate-900 dark:text-slate-200">
                          {t.dashboard.inStock}
                        </span>
                      </div>
                      <span className="text-xs sm:text-xs lg:text-xs 2xl:text-sm font-bold text-slate-900 dark:text-white">
                        78%
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-1.5 sm:p-2 2xl:p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                        <span className="text-xs sm:text-xs lg:text-xs 2xl:text-sm font-medium text-slate-900 dark:text-slate-200">
                          {t.dashboard.lowStock}
                        </span>
                      </div>
                      <span className="text-xs sm:text-xs lg:text-xs 2xl:text-sm font-bold text-slate-900 dark:text-white">
                        15%
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-1.5 sm:p-2 2xl:p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                        <span className="text-xs sm:text-xs lg:text-xs 2xl:text-sm font-medium text-slate-900 dark:text-slate-200">
                          {t.dashboard.outOfStockItem}
                        </span>
                      </div>
                      <span className="text-xs sm:text-xs lg:text-xs 2xl:text-sm font-bold text-slate-900 dark:text-white">
                        7%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentic Mobile Bottom Navigation Bar footer for small screens (5 exact items) */}
            <div className="lg:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center justify-around px-2 pt-2 pb-2.5 select-none shrink-0">
              {/* 1. Dashboard */}
              <div className="flex flex-col items-center justify-center min-w-[44px]">
                <Blocks className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[10px] mt-0.5 tracking-tight font-semibold text-indigo-600 dark:text-indigo-400">
                  {t.nav.dashboard}
                </span>
              </div>

              {/* 2. Inventory */}
              <div className="flex flex-col items-center justify-center min-w-[44px] text-slate-400 dark:text-slate-500">
                <Package className="w-4.5 h-4.5" />
                <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                  {t.nav.inventory}
                </span>
              </div>

              {/* 3. Add (elevated primary button) */}
              <div className="flex flex-col items-center justify-center relative -top-3 px-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-white dark:ring-slate-900">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-semibold mt-0.5 text-slate-600 dark:text-slate-400">
                  {t.nav.add}
                </span>
              </div>

              {/* 4. Settings */}
              <div className="flex flex-col items-center justify-center min-w-[44px] text-slate-400 dark:text-slate-500">
                <Settings className="w-4.5 h-4.5" />
                <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                  {t.nav.settings}
                </span>
              </div>

              {/* 5. Profile */}
              <div className="flex flex-col items-center justify-center min-w-[44px] text-slate-400 dark:text-slate-500">
                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {isEn ? "TU" : "UT"}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                  {t.nav.profile}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

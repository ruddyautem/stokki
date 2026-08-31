import {
  AlertTriangle,
  Blocks,
  ChevronUp,
  DollarSign,
  Menu,
  Package,
  Plus,
  Settings,
  TrendingUp,
  XCircle,
} from "lucide-react";
import ProductsChart from "./ProductsChart";

const mockChartData = [
  { week: "07/15", products: 4 },
  { week: "07/22", products: 8 },
  { week: "07/29", products: 6 },
  { week: "08/05", products: 12 },
  { week: "08/12", products: 24 },
  { week: "08/19", products: 18 },
  { week: "08/26", products: 32 },
];

export default function HeroDashboardMockup() {
  return (
    <div className="w-full h-full flex-1 min-h-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xl shadow-slate-200/40 flex flex-col overflow-hidden text-slate-800 font-sans">
      <div className="w-full h-full rounded-lg border border-slate-100 bg-slate-50 flex flex-col overflow-hidden">
        {/* Mock Browser Header */}
        <div className="h-10 xl:h-12 border-b border-slate-200 bg-white flex items-center px-4 xl:px-6 gap-3 xl:gap-4 shrink-0">
          <div className="flex gap-1.5 xl:gap-2">
            <div className="w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="h-5 xl:h-6 px-3 bg-slate-100 rounded-md flex items-center text-[10px] xl:text-xs text-slate-400 font-mono">
            stokki.autem.dev
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex flex-col w-56 xl:w-64 border-r border-slate-200 bg-white pt-4 pb-0 px-4 shrink-0">
            <div className="flex items-center gap-3 mb-6 xl:mb-10 px-2 shrink-0">
              <div className="bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-1.5 xl:p-2 shadow-md">
                <Blocks className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
              </div>
              <span className="text-lg xl:text-xl font-bold text-slate-900 block">
                Stokki
              </span>
            </div>

            <div className="flex flex-col gap-1 overflow-hidden xl:overflow-y-auto min-h-0">
              <div className="text-[10px] xl:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 xl:mb-3 px-3 shrink-0">
                Menu
              </div>

              <div className="flex items-center space-x-3 py-2.5 xl:py-3 rounded-xl px-3 transition-all bg-slate-900 text-white shadow-md shrink-0">
                <Blocks className="w-4 h-4 xl:w-5 xl:h-5 text-white shrink-0" />
                <span className="text-xs xl:text-sm font-medium">
                  Tableau de bord
                </span>
              </div>

              <div className="flex items-center space-x-3 py-2.5 xl:py-3 rounded-xl px-3 transition-all text-slate-600 hover:bg-slate-50 shrink-0">
                <Package className="w-4 h-4 xl:w-5 xl:h-5 text-slate-400 shrink-0" />
                <span className="text-xs xl:text-sm font-medium">
                  Inventaire
                </span>
              </div>

              <div className="flex items-center space-x-3 py-2.5 xl:py-3 rounded-xl px-3 transition-all text-slate-600 hover:bg-slate-50 shrink-0">
                <Plus className="w-4 h-4 xl:w-5 xl:h-5 text-slate-400 shrink-0" />
                <span className="text-xs xl:text-sm font-medium">
                  Ajouter produit
                </span>
              </div>

              <div className="flex items-center space-x-3 py-2.5 xl:py-3 rounded-xl px-3 transition-all text-slate-600 hover:bg-slate-50 shrink-0">
                <Settings className="w-4 h-4 xl:w-5 xl:h-5 text-slate-400 shrink-0" />
                <span className="text-xs xl:text-sm font-medium">
                  Paramètres
                </span>
              </div>
            </div>

            <div className="mt-auto -mx-4 px-4 py-1.5 border-t border-slate-200 bg-white shrink-0">
              <div className="flex items-center w-full gap-3 p-2 -mx-2 rounded-lg text-left opacity-90 grayscale shrink-0">
                <div className="shrink-0 w-6 h-6 xl:w-8 xl:h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden text-[10px] xl:text-xs font-bold text-slate-600 uppercase">
                  UT
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] xl:text-sm font-semibold text-slate-700 truncate">
                    Utilisateur Test
                  </p>
                  <p className="text-[9px] xl:text-xs text-slate-500 truncate">
                    test@test.com
                  </p>
                </div>
                <ChevronUp className="w-3 h-3 xl:w-4 xl:h-4 text-slate-400 shrink-0" />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col p-3 md:p-5 lg:p-6 xl:p-8 gap-3 md:gap-4 lg:gap-5 xl:gap-8 bg-[#f8fafc] overflow-hidden relative">
            <div className="md:hidden absolute top-3 left-3 w-7 h-7 rounded-md bg-white border border-slate-200 shadow-sm flex items-center justify-center z-10">
              <Menu className="w-4 h-4 text-slate-600" />
            </div>

            {/* Page Header */}
            <div className="flex flex-col items-center md:items-start shrink-0 mt-2 md:mt-0">
              <h2 className="text-lg md:text-xl xl:text-3xl font-bold tracking-tight text-slate-900">
                Tableau de bord
              </h2>
              <p className="text-[10px] md:text-sm xl:text-base text-slate-500 mt-0.5">
                Voici un aperçu de vos statistiques d'inventaire
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 xl:gap-6 shrink-0 mt-1 md:mt-2 xl:mt-4">
              {/* Card 1 */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 xl:p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-slate-700" />
                  </div>
                  <div className="flex items-center gap-0.5 xl:gap-1 text-emerald-600 text-[9px] xl:text-[11px] font-medium">
                    <TrendingUp className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
                    +1,248
                  </div>
                </div>
                <div className="mt-2 xl:mt-4">
                  <div className="text-[10px] xl:text-sm font-medium text-slate-500 leading-tight">
                    Total produits
                  </div>
                  <div className="text-lg lg:text-xl xl:text-3xl font-bold text-slate-900 mt-0.5 xl:mt-1">
                    1,248
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 xl:p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-md bg-emerald-50 flex items-center justify-center shrink-0">
                    <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-emerald-500" />
                  </div>
                  <div className="flex items-center gap-0.5 xl:gap-1 text-emerald-600 text-[9px] xl:text-[11px] font-medium">
                    <TrendingUp className="w-2.5 h-2.5 xl:w-3 xl:h-3" />
                    +14500 €
                  </div>
                </div>
                <div className="mt-2 xl:mt-4">
                  <div className="text-[10px] xl:text-sm font-medium text-slate-500 leading-tight">
                    Valeur totale
                  </div>
                  <div className="text-lg lg:text-xl xl:text-3xl font-bold text-slate-900 mt-0.5 xl:mt-1">
                    14 500 €
                  </div>
                </div>
              </div>

              {/* Card 3 (Hidden on mobile) */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 xl:p-6 shadow-sm hidden md:flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-md bg-amber-100 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-amber-600" />
                  </div>
                  <div className="flex items-center text-slate-600 text-[9px] xl:text-[11px] font-medium">
                    15 alertes
                  </div>
                </div>
                <div className="mt-2 xl:mt-4">
                  <div className="text-[10px] xl:text-sm font-medium text-slate-500 leading-tight">
                    Stock faible
                  </div>
                  <div className="text-lg lg:text-xl xl:text-3xl font-bold text-slate-900 mt-0.5 xl:mt-1">
                    15
                  </div>
                </div>
              </div>

              {/* Card 4 (Hidden on mobile) */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 xl:p-6 shadow-sm hidden xl:flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-md bg-red-100 flex items-center justify-center shrink-0">
                    <XCircle className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-red-500" />
                  </div>
                  <div className="flex items-center text-slate-600 text-[9px] xl:text-[11px] font-medium">
                    3 alertes
                  </div>
                </div>
                <div className="mt-2 xl:mt-4">
                  <div className="text-[10px] xl:text-sm font-medium text-slate-500 leading-tight">
                    Rupture de stock
                  </div>
                  <div className="text-lg lg:text-xl xl:text-3xl font-bold text-slate-900 mt-0.5 xl:mt-1">
                    3
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row: Chart and List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 xl:gap-6 shrink-0 flex-1 min-h-32 md:min-h-40 xl:min-h-24">
              {/* Chart */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 xl:p-6 shadow-sm flex flex-col h-full min-h-32">
                <h3 className="text-[11px] lg:text-[13px] xl:text-base font-bold text-slate-900 mb-2 shrink-0">
                  Nouveaux produits (par semaine)
                </h3>
                <div className="flex-1 w-full min-h-0">
                  <ProductsChart data={mockChartData} />
                </div>
              </div>

              {/* List */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 xl:p-6 shadow-sm hidden md:flex flex-col h-full min-h-44">
                <h3 className="text-[11px] lg:text-[13px] xl:text-base font-bold text-slate-900 mb-3 lg:mb-4 xl:mb-6 shrink-0">
                  Quantité de produits en stock
                </h3>
                <div className="flex flex-col gap-2.5 lg:gap-3 xl:gap-4 flex-1 overflow-hidden justify-start">
                  {[
                    {
                      name: "iPhone 13 Pro",
                      status: "12 unités",
                      color: "bg-emerald-500",
                    },
                    {
                      name: "Macbook Air M2",
                      status: "0 unités",
                      color: "bg-red-500",
                    },
                    {
                      name: "Airpods Pro",
                      status: "25 unités",
                      color: "bg-emerald-500",
                    },
                    {
                      name: "Clavier Magic",
                      status: "4 unités",
                      color: "bg-amber-500",
                    },
                    {
                      name: "Souris MX Master",
                      status: "2 unités",
                      color: "bg-amber-500",
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-2 xl:p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-2 xl:gap-3">
                        <div
                          className={`w-2 h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 rounded-full shrink-0 ${item.color}`}
                        />
                        <span className="text-[10px] lg:text-xs xl:text-sm font-medium text-slate-900">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[9px] lg:text-[10px] xl:text-sm font-semibold text-slate-900">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

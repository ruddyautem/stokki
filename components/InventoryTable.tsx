"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { type TranslationsType, useLanguage } from "@/context/LanguageContext";
import { DeleteMultipleProducts, SetProductQuantity } from "@/lib/products";
import ConfirmModal from "./ConfirmModal";
import Pagination from "./Pagination";

export interface Product {
  id: string;
  name: string;
  sku: string | null;
  quantity: number;
  price: number;
  lowStockAt: number | null;
}

export interface InventoryStats {
  totalCount: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
}

interface InventoryTableProps {
  items: Product[];
  initialStats?: InventoryStats;
  initialSearchQuery?: string;
  onDeleteProduct: (formData: FormData) => Promise<void>;
}

const getStockBadge = (item: Product, t: TranslationsType) => {
  if (item.quantity === 0) {
    return {
      dot: "bg-rose-500 dark:bg-rose-400",
      badge:
        "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200/80 dark:border-rose-900/60",
      label: t.inventory.outOfStockBadge,
    };
  }
  if (item.lowStockAt && item.quantity <= item.lowStockAt) {
    return {
      dot: "bg-amber-500 dark:bg-amber-400",
      badge:
        "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-900/60",
      label: t.inventory.lowStockBadge,
    };
  }
  return {
    dot: "bg-emerald-500 dark:bg-emerald-400",
    badge:
      "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900/60",
    label: t.inventory.inStockBadge,
  };
};

const computeStockCategory = (
  quantity: number,
  lowStockAt: number | null,
): "out" | "low" | "in" => {
  if (quantity === 0) return "out";
  const threshold = lowStockAt ?? 5;
  if (quantity <= threshold) return "low";
  return "in";
};

const InventoryTable = ({
  items,
  initialStats,
  initialSearchQuery = "",
  onDeleteProduct,
}: InventoryTableProps) => {
  const { t } = useLanguage();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(items);
  const [stats, setStats] = useState<InventoryStats>(
    initialStats ?? {
      totalCount: items.length,
      inStockCount: items.filter(
        (p) => computeStockCategory(p.quantity, p.lowStockAt) === "in",
      ).length,
      lowStockCount: items.filter(
        (p) => computeStockCategory(p.quantity, p.lowStockAt) === "low",
      ).length,
      outOfStockCount: items.filter(
        (p) => computeStockCategory(p.quantity, p.lowStockAt) === "out",
      ).length,
    },
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"single" | "bulk">("bulk");
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);

  // Direct edit state: editing numeric input
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  // Refs to avoid race conditions, double clicks, and unnecessary re-renders
  const productsRef = useRef<Product[]>(products);
  productsRef.current = products;
  const pendingDebounceRef = useRef<Record<string, NodeJS.Timeout>>({});
  const lastSyncTimestampRef = useRef<number>(0);

  // Client-side live search query & pagination state
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePageSize, setMobilePageSize] = useState(5);
  const [mobileCardHeight, setMobileCardHeight] = useState(64);
  const [desktopPageSize, setDesktopPageSize] = useState(8);

  // Dynamically calculate mobile and desktop layout to fit without vertical scroll
  useEffect(() => {
    const updateDimensions = () => {
      // On 1024x1366 (iPad Pro portrait), user requested to keep mobile version
      const isMobileVersion =
        window.innerWidth < 1024 ||
        (window.innerWidth === 1024 && window.innerHeight > 1100);
      setIsMobile(isMobileVersion);
      if (isMobileVersion) {
        // Mobile overhead (all fixed elements excluding the card list):
        // MobileHeader: ~40px
        // pt-3 padding: 12px
        // Title + subtitle + mb-3: ~57px
        // Search & Filter card: ~60px
        // Gap below search: ~8px
        // Pagination footer: ~52px
        // BottomNav fixed: ~65px
        // pb-20 bottom padding: 80px
        // Dividers/border: ~1px each × pageSize ≈ negligible
        // Total: ~375px
        const overhead = 375;
        const availableHeight = Math.max(200, window.innerHeight - overhead);

        // Dynamic target page size
        const isTablet = window.innerWidth >= 768;
        const isLargePhone =
          window.innerWidth >= 430 || window.innerHeight >= 900;
        const targetPageSize = isTablet
          ? window.innerHeight >= 1300
            ? 17 // 1024×1366 → 17
            : window.innerHeight >= 1200
              ? 8
              : 8 // 768×1024 → 8
          : isLargePhone
            ? 10 // 430×932 → 10
            : 8; // 390×844 → 8
        setMobilePageSize(targetPageSize);

        // Card height fills exactly the available space:
        // - 390×844:  469px / 8  = ~58px per card → total 464px ✓
        // - 430×932:  557px / 10 = ~55px per card → total 550px ✓
        // - 768×1024: 649px / 8  = ~81px → capped at 80px ✓
        // - 1024×1366: 991px / 17 = ~58px per card ✓
        const maxCardHeight = isTablet
          ? window.innerHeight >= 1300
            ? 64
            : 72
          : 80;
        const computedCardHeight = Math.max(
          50,
          Math.min(maxCardHeight, Math.floor(availableHeight / targetPageSize)),
        );
        setMobileCardHeight(computedCardHeight);
      } else {
        // Desktop overhead calculation:
        // Page header (title + subtitle + margins): ~75px
        // Page padding top/bottom (lg:pt-6 lg:pb-6 + main margin): ~48px
        // Search bar card: ~56px
        // KPI summary cards: ~72px
        // Footer: ~35px
        // Table header row: ~42px
        // Pagination row at bottom of table: ~48px
        // Gaps & borders: ~32px
        // Safety cushion: ~45px (prevents any vertical scroll on 768p and 900p screens)
        // Total fixed overhead: ~455px on standard desktop, ~520px on 3xl screens (accounting for larger padding & header)
        const is3xl = window.innerWidth >= 2000;
        const desktopOverhead = is3xl ? 520 : 455;
        const availableTableHeight = Math.max(
          200,
          window.innerHeight - desktopOverhead,
        );
        // Each desktop table row is strictly 58px
        const desktopRowHeight = 58;
        const calculatedRows = Math.floor(
          availableTableHeight / desktopRowHeight,
        );
        // Dynamic clamping:
        // - On 1024x768 (height 768): calculatedRows = (768 - 455)/58 = 5 rows (retire 1 article vs 6)
        // - On 1440x900 (height 900): calculatedRows = (900 - 455)/58 = 7 rows (retire 1 article vs 8)
        // - On 1920x1080 (height 1080): calculatedRows = (1080 - 455)/58 = 10 rows
        // - On 2560x1440 (height 1440, 3xl): calculatedRows = (1440 - 520)/58 = 15 rows (no scrollbar)
        const fittedDesktopSize = Math.max(4, Math.min(18, calculatedRows));
        setDesktopPageSize(fittedDesktopSize);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Responsive page size: dynamic fit on mobile and desktop
  const pageSize = isMobile ? mobilePageSize : desktopPageSize;

  // Sorting / Filtering by name, quantity, price (Default is "name" asc)
  const [sortField, setSortField] = useState<"name" | "quantity" | "price">(
    "name",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(e.target as Node)
      ) {
        setShowFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (field: "name" | "quantity" | "price") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const selectFilterOption = (
    field: "name" | "quantity" | "price",
    direction: "asc" | "desc",
  ) => {
    setSortField(field);
    setSortDirection(direction);
    setShowFilterMenu(false);
  };

  // Instant live filtered list
  const filteredProducts = products.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.name.toLowerCase().includes(query) ||
      item.sku?.toLowerCase().includes(query)
    );
  });

  // Sorted list based on current active sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;
    if (sortField === "name") {
      const cmp = a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
      return sortDirection === "asc" ? cmp : -cmp;
    }
    if (sortField === "quantity") {
      return sortDirection === "asc"
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    }
    if (sortField === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });

  // Instant Pagination
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProducts = sortedProducts.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize,
  );

  // Reset to page 1 whenever search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    // If a user just modified quantities in the last 1.5 seconds, don't overwrite with stale server items
    if (Date.now() - lastSyncTimestampRef.current < 1500) return;

    // Preserve local ordering in case of background refresh
    setProducts((prev) => {
      if (prev.length === 0) return items;
      const incomingMap = new Map(items.map((it) => [it.id, it]));
      // Map existing items in their current order, then append any genuinely new items
      const updated = prev
        .map((it) => incomingMap.get(it.id))
        .filter((it): it is Product => it !== undefined);
      const prevIdSet = new Set(prev.map((it) => it.id));
      const newlyAdded = items.filter((it) => !prevIdSet.has(it.id));
      return [...newlyAdded, ...updated];
    });
  }, [items]);

  useEffect(() => {
    if (initialStats) {
      setStats(initialStats);
    }
  }, [initialStats]);

  const updateStatsLive = (
    prevQuantity: number,
    nextQuantity: number,
    lowStockAt: number | null,
  ) => {
    const prevCat = computeStockCategory(prevQuantity, lowStockAt);
    const nextCat = computeStockCategory(nextQuantity, lowStockAt);
    if (prevCat === nextCat) return;

    setStats((prev) => {
      const updated = { ...prev };
      if (prevCat === "in")
        updated.inStockCount = Math.max(0, updated.inStockCount - 1);
      if (prevCat === "low")
        updated.lowStockCount = Math.max(0, updated.lowStockCount - 1);
      if (prevCat === "out")
        updated.outOfStockCount = Math.max(0, updated.outOfStockCount - 1);

      if (nextCat === "in") updated.inStockCount += 1;
      if (nextCat === "low") updated.lowStockCount += 1;
      if (nextCat === "out") updated.outOfStockCount += 1;
      return updated;
    });
  };

  const updateQuantity = (id: string, getNextQty: (curr: number) => number) => {
    lastSyncTimestampRef.current = Date.now();

    const currentItem = productsRef.current.find((p) => p.id === id);
    if (!currentItem) return;

    const previousQuantity = currentItem.quantity;
    const nextQuantity = Math.max(0, getNextQty(previousQuantity));
    if (nextQuantity === previousQuantity) return;

    // Immediately update productsRef synchronously so consecutive rapid clicks read the new value
    productsRef.current = productsRef.current.map((item) =>
      item.id === id ? { ...item, quantity: nextQuantity } : item,
    );

    // Instant local state update
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item,
      ),
    );
    updateStatsLive(previousQuantity, nextQuantity, currentItem.lowStockAt);

    // Debounce the backend persistence so rapid clicking on + or - batches cleanly
    if (pendingDebounceRef.current[id]) {
      clearTimeout(pendingDebounceRef.current[id]);
    }

    pendingDebounceRef.current[id] = setTimeout(async () => {
      delete pendingDebounceRef.current[id];
      try {
        await SetProductQuantity(id, nextQuantity);
      } catch (error) {
        // Rollback on failure
        setProducts((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: previousQuantity } : item,
          ),
        );
        updateStatsLive(nextQuantity, previousQuantity, currentItem.lowStockAt);
        console.error("Error setting quantity:", error);
        toast.error(t.inventory.qtyUpdateError);
      }
    }, 250);
  };

  const handleStepQuantity = (id: string, delta: number) => {
    updateQuantity(id, (currentQty) => {
      const next = Math.max(0, currentQty + delta);
      if (editingId === id) {
        setEditingValue(String(next));
      }
      return next;
    });
  };

  const handleCommitEditing = (id: string) => {
    if (editingId !== id) return;
    setEditingId(null);
    const parsed = parseInt(editingValue.trim(), 10);
    const target = Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
    updateQuantity(id, () => target);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? products.map((item) => item.id) : []);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) setSelectedIds([...selectedIds, id]);
    else setSelectedIds(selectedIds.filter((sId) => sId !== id));
  };

  const allSelected =
    products.length > 0 &&
    products.every((item) => selectedIds.includes(item.id));

  const handleBulkDeleteClick = () => {
    setDeleteType("bulk");
    setShowConfirmModal(true);
  };
  const handleSingleDeleteClick = (id: string) => {
    setSingleDeleteId(id);
    setDeleteType("single");
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (deleteType === "bulk") {
        await DeleteMultipleProducts(selectedIds);
        toast.success(`${selectedIds.length} ${t.inventory.deleteBulkSuccess}`);
        setSelectedIds([]);
      } else if (deleteType === "single" && singleDeleteId) {
        const formData = new FormData();
        formData.append("id", singleDeleteId);
        await onDeleteProduct(formData);
        toast.success(t.inventory.deleteSuccess);
        setSingleDeleteId(null);
      }
      router.refresh();
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error(t.inventory.deleteError);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelect = (id: string) => {
    handleSelectOne(id, !selectedIds.includes(id));
  };

  // Modern Checkbox component
  const Checkbox = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange?: () => void;
  }) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (onChange) onChange();
      }}
      className={`relative w-4.5 h-4.5 border rounded-md transition-all duration-150 flex items-center justify-center ${
        checked
          ? "bg-indigo-600 border-indigo-600 text-white shadow-2xs"
          : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
      } cursor-pointer`}
      aria-label="Sélectionner"
    >
      {checked && <Check className="w-3 h-3 stroke-[3]" />}
    </button>
  );

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Action Header Card: [Filtre] [Barre de recherche] [Rechercher icône] + [Nouveau produit] */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-3 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 transition-colors">
        <div className="flex-1 flex items-center gap-1.5 sm:gap-3">
          {/* [Filtre] Button with Hamburger/Filter Menu */}
          <div className="relative shrink-0" ref={filterMenuRef}>
            <button
              type="button"
              onClick={() => setShowFilterMenu((prev) => !prev)}
              aria-label="Filtrer et trier l'inventaire"
              aria-expanded={showFilterMenu}
              className={`h-10 px-2.5 sm:px-4 flex items-center gap-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-95 ${
                showFilterMenu
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Menu className="w-4 h-4 stroke-[2.25] shrink-0" />
              <span className="hidden sm:inline">{t.inventory.filter}</span>
            </button>

            {/* Filter Dropdown Menu */}
            {showFilterMenu && (
              <div className="absolute left-0 top-full mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {t.inventory.sortBy}
                </div>

                {/* Nom */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => selectFilterOption("name", "asc")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      sortField === "name" && sortDirection === "asc"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{t.inventory.nameAsc}</span>
                    {sortField === "name" && sortDirection === "asc" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => selectFilterOption("name", "desc")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      sortField === "name" && sortDirection === "desc"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{t.inventory.nameDesc}</span>
                    {sortField === "name" && sortDirection === "desc" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </button>
                </div>

                <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />

                {/* Quantité */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => selectFilterOption("quantity", "asc")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      sortField === "quantity" && sortDirection === "asc"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{t.inventory.qtyAsc}</span>
                    {sortField === "quantity" && sortDirection === "asc" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => selectFilterOption("quantity", "desc")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      sortField === "quantity" && sortDirection === "desc"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{t.inventory.qtyDesc}</span>
                    {sortField === "quantity" && sortDirection === "desc" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </button>
                </div>

                <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />

                {/* Prix */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => selectFilterOption("price", "asc")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      sortField === "price" && sortDirection === "asc"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{t.inventory.priceAsc}</span>
                    {sortField === "price" && sortDirection === "asc" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => selectFilterOption("price", "desc")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      sortField === "price" && sortDirection === "desc"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{t.inventory.priceDesc}</span>
                    {sortField === "price" && sortDirection === "desc" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* [Barre de recherche instantanée OU Barre d'action de suppression] */}
          {selectedIds.length > 0 ? (
            <div className="flex-1 flex items-center justify-between gap-2 px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white rounded-xl border border-slate-800 shadow-xs h-10 sm:h-10.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold truncate">
                  {selectedIds.length} {t.inventory.selectedCount}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="text-slate-400 hover:text-white text-xs underline cursor-pointer ml-1 hidden sm:inline"
                >
                  {t.inventory.cancelSelection}
                </button>
              </div>
              <button
                type="button"
                onClick={handleBulkDeleteClick}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-all shadow-xs disabled:opacity-50 cursor-pointer active:scale-95 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.inventory.deleteSelected}</span>
              </button>
            </div>
          ) : (
            <div className="flex-1 flex items-center min-w-0">
              <div className="flex-1 relative min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t.inventory.searchPlaceholder}
                  className="w-full pl-8 sm:pl-10 pr-8 sm:pr-9 py-2 sm:py-2.5 bg-slate-50/70 dark:bg-slate-800/70 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-900 dark:text-white truncate"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-md cursor-pointer transition-colors"
                    title="Effacer la recherche"
                    aria-label="Effacer la recherche"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Direct CTA button to add product on desktop */}
        {!isMobile && (
          <Link
            href="/add-product"
            prefetch={true}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-all active:scale-95 shrink-0 shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            {t.inventory.newProduct}
          </Link>
        )}
      </div>

      {/* Top Summary Banner on Large Screens — UPDATES LIVE */}
      {!isMobile && (
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-all">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {t.inventory.totalReferences}
              </p>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                {stats.totalCount}
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
              <Package className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-all">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {t.inventory.inStockBadge}
              </p>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5 transition-transform">
                {stats.inStockCount}
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-900" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-all">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {t.inventory.lowStockBadge}
              </p>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5 transition-transform">
                {stats.lowStockCount}
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100 dark:ring-amber-900" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-all">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                {t.inventory.outOfStockBadge}
              </p>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5 transition-transform">
                {stats.outOfStockCount}
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-100 dark:ring-rose-900" />
            </div>
          </div>
        </div>
      )}

      {/* Modern Desktop Table with stable pixel-perfect height */}
      {!isMobile && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-2.5 pl-5 pr-3 w-12">
                    <Checkbox
                      checked={allSelected}
                      onChange={() => handleSelectAll(!allSelected)}
                    />
                  </th>
                  <th className="py-2.5 px-3 w-[28%] font-semibold text-slate-700 dark:text-slate-300">
                    <button
                      type="button"
                      onClick={() => handleSort("name")}
                      className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
                    >
                      <span>{t.inventory.colProduct}</span>
                      {sortField === "name" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                        ) : (
                          <ArrowDown className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </th>
                  <th className="py-2.5 px-3 w-[16%] font-semibold text-slate-700 dark:text-slate-300">
                    {t.inventory.colSku}
                  </th>
                  <th className="py-2.5 px-3 w-[14%] font-semibold text-slate-700 dark:text-slate-300">
                    <button
                      type="button"
                      onClick={() => handleSort("price")}
                      className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
                    >
                      <span>{t.inventory.colPrice}</span>
                      {sortField === "price" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                        ) : (
                          <ArrowDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </th>
                  <th className="py-2.5 px-3 w-[14%] font-semibold text-slate-700 dark:text-slate-300">
                    {t.inventory.colStatus}
                  </th>
                  <th className="py-2.5 px-3 w-[18%] font-semibold text-slate-700 dark:text-slate-300 text-center">
                    <button
                      type="button"
                      onClick={() => handleSort("quantity")}
                      className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
                    >
                      <span>{t.inventory.colQuantity}</span>
                      {sortField === "quantity" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                        ) : (
                          <ArrowDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </th>
                  <th className="py-2.5 pr-5 pl-3 w-20 font-semibold text-slate-700 dark:text-slate-300 text-right">
                    {t.inventory.colActions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/90 dark:divide-slate-800 text-sm">
                {paginatedProducts.length === 0 ? (
                  <tr style={{ height: `${pageSize * 58}px` }}>
                    <td
                      colSpan={7}
                      style={{ height: `${pageSize * 58}px` }}
                      className="text-center text-slate-400 align-middle"
                    >
                      <Package className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="text-sm font-medium text-slate-600">
                        {t.inventory.noProductFound}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {t.inventory.noProductFoundSub}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    const status = getStockBadge(item, t);
                    const _isEditing = editingId === item.id;

                    return (
                      <tr
                        key={item.id}
                        onClick={() => toggleSelect(item.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            if (editingId) return;
                            e.preventDefault();
                            toggleSelect(item.id);
                          }
                        }}
                        tabIndex={0}
                        aria-selected={isSelected}
                        style={{ height: "58px" }}
                        className={`h-[58px] group hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 ${
                          isSelected
                            ? "bg-indigo-50/40 dark:bg-indigo-950/40"
                            : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-2.5 pl-5 pr-3 align-middle">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => toggleSelect(item.id)}
                          />
                        </td>

                        {/* Product Name + Icon */}
                        <td className="py-2.5 px-3.5 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-8.5 h-8.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-2xs transition-all">
                              <Package className="w-4.5 h-4.5" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                ID: {item.id.slice(-6)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* SKU */}
                        <td className="py-2.5 px-3.5 align-middle">
                          <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {item.sku || "—"}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-2.5 px-3.5 font-semibold text-sm text-slate-900 dark:text-white align-middle">
                          {item.price.toFixed(2)} €
                        </td>

                        {/* Status Badge */}
                        <td className="py-2.5 px-3.5 align-middle">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.badge}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                            />
                            {status.label}
                          </span>
                        </td>

                        {/* Direct Quantity Input Box with - / + */}
                        <td className="py-2.5 px-3.5 align-middle">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStepQuantity(item.id, -1);
                              }}
                              disabled={item.quantity <= 0}
                              className="w-7 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none rounded-md border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                              title={t.inventory.decreaseQty}
                              aria-label={t.inventory.decreaseQty}
                            >
                              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={
                                editingId === item.id
                                  ? editingValue
                                  : item.quantity
                              }
                              onFocus={(e) => {
                                setEditingId(item.id);
                                setEditingValue(String(item.quantity));
                                e.currentTarget.select();
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.currentTarget.select();
                              }}
                              onChange={(e) => {
                                const val = e.target.value.replace(
                                  /[^0-9]/g,
                                  "",
                                );
                                setEditingValue(val);
                              }}
                              onBlur={() => handleCommitEditing(item.id)}
                              onKeyDown={(e) => {
                                e.stopPropagation();
                                if (e.key === "Enter") {
                                  handleCommitEditing(item.id);
                                  (e.target as HTMLInputElement).blur();
                                } else if (e.key === "Escape") {
                                  setEditingId(null);
                                  (e.target as HTMLInputElement).blur();
                                }
                              }}
                              aria-label={`${t.inventory.colQuantity}: ${item.name}`}
                              className="w-14 h-8 text-center text-xs font-bold text-slate-900 dark:text-white bg-slate-50/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 border border-slate-200/90 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-lg shadow-2xs focus:outline-none transition-all"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStepQuantity(item.id, 1);
                              }}
                              className="w-7 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                              title={t.inventory.increaseQty}
                              aria-label={t.inventory.increaseQty}
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        </td>

                        {/* Action: Delete */}
                        <td className="py-2.5 pr-5 pl-3.5 text-right align-middle">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSingleDeleteClick(item.id);
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                            title={t.inventory.deleteProductTooltip}
                            aria-label={`${t.inventory.deleteProductTooltip} ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.75] text-red-500" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}

                {/* Ghost rows to keep table height and pagination position 100% strictly identical */}
                {paginatedProducts.length > 0 &&
                  paginatedProducts.length < pageSize &&
                  Array.from({
                    length: pageSize - paginatedProducts.length,
                  }).map((_, idx) => (
                    <tr
                      key={`ghost-${idx}`}
                      aria-hidden="true"
                      style={{ height: "58px" }}
                      className="h-[58px] pointer-events-none select-none border-b border-slate-100/90 dark:border-slate-800"
                    >
                      <td className="py-2.5 pl-5 pr-3 w-12 opacity-0 align-middle">
                        <div className="w-4.5 h-4.5" />
                      </td>
                      <td className="py-2.5 px-3.5 opacity-0 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-8.5 h-8.5" />
                          <div>
                            <p className="font-semibold text-sm leading-tight">
                              &nbsp;
                            </p>
                            <p className="text-xs leading-tight">&nbsp;</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3.5 opacity-0 align-middle">
                        <span className="font-mono text-xs px-2 py-0.5">
                          &nbsp;
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 opacity-0 font-semibold text-sm align-middle">
                        &nbsp;
                      </td>
                      <td className="py-2.5 px-3.5 opacity-0 align-middle">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium">
                          &nbsp;
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 opacity-0 align-middle">
                        <div className="flex items-center justify-center">
                          <div className="h-7.5" />
                        </div>
                      </td>
                      <td className="py-2.5 pr-5 pl-3.5 opacity-0 text-right align-middle">
                        <div className="w-7 h-7 inline-block" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Desktop Instant Client-Side Pagination inside table footer - always rendered for fixed stable height */}
          <div className="border-t border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 px-4 h-14 min-h-[56px] flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {filteredProducts.length === 0 ? (
                <span>0 {t.inventory.paginationProducts}</span>
              ) : (
                <>
                  {t.inventory.paginationShowing}{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {(safeCurrentPage - 1) * pageSize + 1}
                  </span>{" "}
                  {t.inventory.paginationTo}{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {Math.min(
                      safeCurrentPage * pageSize,
                      filteredProducts.length,
                    )}
                  </span>{" "}
                  {t.inventory.paginationOn}{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {filteredProducts.length}
                  </span>{" "}
                  {t.inventory.paginationProducts}
                </>
              )}
            </p>
            {totalPages > 1 ? (
              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              />
            ) : (
              <div className="h-10" />
            )}
          </div>
        </div>
      )}

      {/* Mobile minimal list layout */}
      {isMobile && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
          {paginatedProducts.length === 0 ? (
            <div
              style={{ height: `${pageSize * mobileCardHeight}px` }}
              className="flex flex-col items-center justify-center p-6 text-center text-slate-400 dark:text-slate-500"
            >
              <Package className="w-8 h-8 mb-2 text-slate-300 dark:text-slate-600 stroke-1" />
              <p className="text-sm font-medium">{t.inventory.noProductYet}</p>
            </div>
          ) : (
            paginatedProducts.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              const isOutOfStock = item.quantity === 0;
              const isLowStock =
                item.lowStockAt !== null &&
                item.quantity > 0 &&
                item.quantity <= item.lowStockAt;
              const _isEditing = editingId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id)}
                  style={{ height: `${mobileCardHeight}px` }}
                  className={`px-3 sm:px-4 transition-colors flex items-center gap-2.5 sm:gap-3.5 cursor-pointer select-none active:bg-slate-100/60 dark:active:bg-slate-800/80 ${
                    isSelected
                      ? "bg-slate-50/90 dark:bg-slate-800/90"
                      : "hover:bg-slate-50/40 dark:hover:bg-slate-800/40"
                  }`}
                >
                  {/* Select Checkbox */}
                  <div className="shrink-0">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </div>

                  {/* Main product info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isOutOfStock
                            ? "bg-rose-500"
                            : isLowStock
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                      />
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 shrink-0">
                        {item.price.toFixed(2)} €
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">
                        •
                      </span>
                      <span
                        className={`font-semibold tracking-wide shrink-0 ${
                          isOutOfStock
                            ? "text-rose-600 dark:text-rose-400"
                            : isLowStock
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {isOutOfStock
                          ? t.inventory.statusOutOfStock
                          : isLowStock
                            ? t.inventory.statusLowStock
                            : t.inventory.statusInStock}
                      </span>
                      {item.sku && (
                        <>
                          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">
                            •
                          </span>
                          <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline truncate">
                            {item.sku}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions: Direct Quantity Input with - / + & Delete */}
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStepQuantity(item.id, -1);
                        }}
                        disabled={item.quantity <= 0}
                        className="w-6 sm:w-7 h-7 sm:h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none rounded border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                        title={t.inventory.decreaseQty}
                        aria-label={t.inventory.decreaseQty}
                      >
                        <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={
                          editingId === item.id ? editingValue : item.quantity
                        }
                        onFocus={(e) => {
                          setEditingId(item.id);
                          setEditingValue(String(item.quantity));
                          e.currentTarget.select();
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.currentTarget.select();
                        }}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, "");
                          setEditingValue(val);
                        }}
                        onBlur={() => handleCommitEditing(item.id)}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === "Enter") {
                            handleCommitEditing(item.id);
                            (e.target as HTMLInputElement).blur();
                          } else if (e.key === "Escape") {
                            setEditingId(null);
                            (e.target as HTMLInputElement).blur();
                          }
                        }}
                        aria-label={`${t.inventory.colQuantity}: ${item.name}`}
                        className="w-10 sm:w-12 h-7 sm:h-8 text-center text-xs font-bold text-slate-900 dark:text-white bg-slate-50/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 border border-slate-200/90 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-md shadow-2xs focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStepQuantity(item.id, 1);
                        }}
                        className="w-6 sm:w-7 h-7 sm:h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                        title={t.inventory.increaseQty}
                        aria-label={t.inventory.increaseQty}
                      >
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSingleDeleteClick(item.id);
                      }}
                      className="p-1 sm:p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                      title={t.inventory.deleteProductTooltip}
                      aria-label={`${t.inventory.deleteProductTooltip} ${item.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {/* Ghost mobile rows to keep mobile container height strictly identical */}
          {paginatedProducts.length > 0 &&
            paginatedProducts.length < pageSize &&
            Array.from({ length: pageSize - paginatedProducts.length }).map(
              (_, idx) => (
                <div
                  key={`mobile-ghost-${idx}`}
                  aria-hidden="true"
                  style={{ height: `${mobileCardHeight}px` }}
                  className="px-3 sm:px-4 opacity-0 pointer-events-none select-none flex items-center gap-2.5 sm:gap-3.5"
                >
                  <div className="w-4.5 h-4.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" />
                      <h3 className="text-xs sm:text-sm font-semibold truncate">
                        &nbsp;
                      </h3>
                    </div>
                    <div className="mt-0.5 text-[11px] sm:text-xs">&nbsp;</div>
                  </div>
                  <div className="w-20 h-7 shrink-0" />
                </div>
              ),
            )}
          {/* Mobile Pagination integrated right below the items - always rendered for fixed stable height */}
          <div className="border-t border-slate-100 dark:border-slate-800 px-3 py-3 flex items-center justify-between min-h-[52px] bg-slate-50/50 dark:bg-slate-900">
            {totalPages > 1 ? (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="text-slate-900 dark:text-slate-100 font-semibold">
                    {safeCurrentPage}
                  </span>{" "}
                  / {totalPages}
                </p>
                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={(p) => setCurrentPage(p)}
                />
              </>
            ) : (
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {filteredProducts.length} {t.inventory.paginationProducts}
              </p>
            )}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title={
          deleteType === "bulk"
            ? t.inventory.confirmDeleteTitle
            : t.inventory.confirmDeleteTitle
        }
        message={
          deleteType === "bulk"
            ? t.inventory.confirmDeleteBulk
            : t.inventory.confirmDeleteSingle
        }
        confirmText={t.inventory.confirm}
        cancelText={t.inventory.cancel}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default InventoryTable;

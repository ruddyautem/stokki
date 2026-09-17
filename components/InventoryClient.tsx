"use client";

import InventoryTable from "@/components/InventoryTable";
import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/context/LanguageContext";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku: string | null;
  lowStockAt: number | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface InventoryStats {
  totalCount: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
}

interface InventoryClientProps {
  items: Product[];
  initialStats: InventoryStats;
  initialSearchQuery: string;
  onDeleteProduct: (formData: FormData) => Promise<void>;
}

export default function InventoryClient({
  items,
  initialStats,
  initialSearchQuery,
  onDeleteProduct,
}: InventoryClientProps) {
  const { t } = useLanguage();

  return (
    <PageLayout title={t.inventory.title} subtitle={t.inventory.subtitle}>
      <div className="space-y-3 sm:space-y-4 lg:space-y-3 pb-2 lg:pb-1 w-full max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1760px] mx-auto">
        <InventoryTable
          items={items}
          initialStats={initialStats}
          initialSearchQuery={initialSearchQuery}
          onDeleteProduct={onDeleteProduct}
        />
      </div>
    </PageLayout>
  );
}

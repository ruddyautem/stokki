import InventoryClient from "@/components/InventoryClient";
import getCurrentUser from "@/lib/auth";
import { getDb } from "@/lib/prisma";
import DeleteProduct from "@/lib/products";

const Inventory = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchQuery?: string }>;
}) => {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) throw new Error("Unauthorized");
  const db = getDb();
  const params = await searchParams;
  const searchQuery = (params.searchQuery ?? "").trim();

  const [
    totalResult,
    inStockResult,
    lowStockResult,
    outOfStockResult,
    products,
  ] = await Promise.all([
    db.orm.public.Product.where({ userId }).aggregate((agg) => ({
      count: agg.count(),
    })),
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
    db.orm.public.Product.where({ userId })
      .orderBy([
        (product) => product.createdAt.desc(),
        (product) => product.id.desc(),
      ])
      .all(),
  ]);

  // Convert Decimal to number for client component
  const items = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  // Initial stats passed to InventoryClient for live synchronization
  const initialStats = {
    totalCount: totalResult.count,
    inStockCount: inStockResult.count,
    lowStockCount: lowStockResult.count,
    outOfStockCount: outOfStockResult.count,
  };

  // Server action to pass to client component
  const handleDeleteProduct = async (formData: FormData) => {
    "use server";
    await DeleteProduct(formData);
  };

  return (
    <InventoryClient
      items={items}
      initialStats={initialStats}
      initialSearchQuery={searchQuery}
      onDeleteProduct={handleDeleteProduct}
    />
  );
};

export default Inventory;

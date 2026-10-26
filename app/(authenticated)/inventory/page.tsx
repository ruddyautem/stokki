import InventoryClient from "@/components/InventoryClient";
import getCurrentUser from "@/lib/auth";
import { getDb } from "@/lib/prisma";
import DeleteProduct from "@/lib/products";
import { stockSummary } from "@/lib/stock-summary";

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

  const [initialStats, products] = await Promise.all([
    stockSummary(userId),
    db.orm.public.Product.where({ userId })
      .orderBy([(p) => p.name.asc(), (p) => p.id.asc()])
      .limit(18)
      .all(),
  ]);
  const items = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

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

import InventoryClient from "@/components/InventoryClient";
import getCurrentUser from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteProduct from "@/lib/products";

const Inventory = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchQuery?: string }>;
}) => {
  const user = await getCurrentUser();
  const userId = user?.id;
  const params = await searchParams;
  const searchQuery = (params.searchQuery ?? "").trim();

  const [totalCount, inStockCount, lowStockCount, outOfStockCount, products] =
    await Promise.all([
      prisma.product.count({ where: { userId } }),
      prisma.product.count({ where: { userId, quantity: { gt: 5 } } }),
      prisma.product.count({
        where: {
          userId,
          AND: [{ quantity: { lt: 5 } }, { quantity: { gte: 1 } }],
        },
      }),
      prisma.product.count({ where: { userId, quantity: { equals: 0 } } }),
      prisma.product.findMany({
        where: { userId },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      }),
    ]);

  // Convert Decimal to number for client component
  const items = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  // Initial stats passed to InventoryClient for live synchronization
  const initialStats = {
    totalCount,
    inStockCount,
    lowStockCount,
    outOfStockCount,
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

import Pagination from "@/components/Pagination";
import InventoryTable from "@/components/InventoryTable";
import getCurrentUser from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteProduct from "@/lib/products";
import { Search } from "lucide-react";

const Inventory = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchQuery?: string; page?: string }>;
}) => {
  const user = await getCurrentUser();
  const userId = user?.id;
  const params = await searchParams;
  const searchQuery = (params.searchQuery ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 10;

  const where = {
    userId,
    ...(searchQuery
      ? { name: { contains: searchQuery, mode: "insensitive" as const } }
      : {}),
  };

  const [totalCount, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // Convert Decimal to number for client component
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
    <div className='min-h-screen bg-slate-50'>
      <main className='ml-64 p-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-slate-900'>Inventaire</h1>
              <p className='text-slate-600 mt-1'>
                Gérez vos produits et suivez les niveaux de stock
              </p>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-600'>
              <span className='font-medium'>{totalCount}</span>
              <span>produit{totalCount !== 1 ? "s" : ""} au total</span>
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          {/* Search */}
          <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm'>
            <form action='/inventory' className='flex gap-3' method='GET'>
              <div className='flex-1 relative'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  name='searchQuery'
                  defaultValue={searchQuery}
                  placeholder='Rechercher un produit par nom...'
                  className='w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all'
                />
              </div>
              <button
                type='submit'
                className='px-8 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-all shadow-sm hover:shadow-md cursor-pointer'
              >
                Rechercher
              </button>
            </form>
          </div>

          {/* Products Table with Selection */}
          <InventoryTable items={items} onDeleteProduct={handleDeleteProduct} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm'>
              <Pagination
                currentPage={page}
                baseUrl='/inventory'
                searchParams={{ searchQuery, pageSize: String(pageSize) }}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Inventory;

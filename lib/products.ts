"use server";

import { or } from "@prisma/orm-postgres/orm-client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Models } from "@/app/generated/prisma8/contract.d";
import getCurrentUser from "./auth";
import { getDb } from "./prisma";

const productSchema = z.object({
  name: z.string().trim().max(200).min(1, "Product name is required"),
  price: z
    .string()
    .regex(/^(?:0|[1-9]\d{0,9})(?:\.\d{1,2})?$/, "Invalid price"),
  quantity: z.coerce
    .number()
    .int()
    .min(0, "Quantity must be a non-negative integer")
    .max(2147483647),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).max(2147483647).optional(),
});

// FIX: explicit auth guard + Zod validation on id
const DeleteProduct = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorized");

  const id = z
    .string()
    .min(1, "ID required")
    .parse(String(formData.get("id") ?? ""));

  await getDb()
    .orm.public.Product.where({ userId: user.id, id })
    .deleteAndCount();

  revalidatePath("/inventory");
};

// FIX: explicit auth guard + console.error + user.id (no fallback "")
export const CreateProduct = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorized");

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Validation Failed");
  }

  try {
    await getDb().orm.public.Product.create({
      ...parsed.data,
      price: parsed.data.price as Models.public_Product["price"],
      userId: user.id,
    });
    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    if (
      error instanceof Error &&
      /Product_userId_sku_key|23505|unique/i.test(error.message)
    ) {
      throw new Error("Ce SKU existe déjà dans votre inventaire.");
    }
    console.error("Error creating product:", error);
    throw new Error("Could not create product");
  }
};

// Bulk delete function
export const DeleteMultipleProducts = async (productIds: string[]) => {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (productIds.length === 0) {
    throw new Error("No products selected");
  }

  try {
    await getDb()
      .orm.public.Product.where({ userId })
      .where((product) => product.id.in(productIds))
      .deleteAndCount();

    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.error("Error deleting products:", error);
    throw new Error("Failed to delete products");
  }
};

export const UpdateProductQuantity = async (id: string, delta: number) => {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  z.string().min(1).parse(id);
  z.number().int().min(-2147483647).max(2147483647).parse(delta);
  // Compare-and-set retries protect concurrent increments without overwriting another writer.
  for (let attempt = 0; attempt < 10; attempt++) {
    const product = await getDb().orm.public.Product.first({ id, userId });
    if (!product) throw new Error("Product not found");
    const quantity = Math.max(0, product.quantity + delta);
    z.number().int().max(2147483647).parse(quantity);
    const changed = await getDb()
      .orm.public.Product.where({ id, userId, quantity: product.quantity })
      .updateAndCount({ quantity });
    if (changed) {
      revalidatePath("/inventory");
      revalidatePath("/dashboard");
      return { success: true, quantity };
    }
  }
  throw new Error("Stock changed concurrently. Please retry.");
};

export const SetProductQuantity = async (
  id: string,
  quantity: number,
  expectedQuantity: number,
) => {
  const user = await getCurrentUser();
  z.string().min(1).parse(id);
  z.number().int().min(0).max(2147483647).parse(quantity);
  z.number().int().min(0).max(2147483647).parse(expectedQuantity);
  const changed = await getDb()
    .orm.public.Product.where({
      id,
      userId: user.id,
      quantity: expectedQuantity,
    })
    .updateAndCount({ quantity });
  if (!changed)
    throw new Error("Stock changed concurrently. Reload before editing.");
  revalidatePath("/inventory");
  revalidatePath("/dashboard");
  return { success: true, quantity };
};

export async function getInventoryPage(input: {
  page: number;
  size: number;
  search: string;
  sort: string;
  direction: string;
}) {
  const user = await getCurrentUser();
  const { page, size, search, sort, direction } = z
    .object({
      page: z.number().int().min(1).max(100000),
      size: z.number().int().min(1).max(100),
      search: z.string().max(200),
      sort: z.enum(["name", "quantity", "price", "createdAt"]),
      direction: z.enum(["asc", "desc"]),
    })
    .parse(input);
  let query = getDb().orm.public.Product.where({ userId: user.id });
  const term = search
    .trim()
    .replaceAll("\\", "\\\\")
    .replaceAll("%", "\\%")
    .replaceAll("_", "\\_");
  if (term)
    query = query.where((p) =>
      or(p.name.ilike(`%${term}%`), p.sku.ilike(`%${term}%`)),
    );
  const total = await query.aggregate((a) => ({ count: a.count() }));
  const actualPage = Math.min(page, Math.max(1, Math.ceil(total.count / size)));
  const products = await query
    .orderBy([
      (p) => (direction === "asc" ? p[sort].asc() : p[sort].desc()),
      (p) => p.id.asc(),
    ])
    .limit(size)
    .offset((actualPage - 1) * size)
    .all();
  return {
    items: products.map((product) => ({
      ...product,
      price: Number(product.price),
    })),
    count: total.count,
  };
}

export default DeleteProduct;

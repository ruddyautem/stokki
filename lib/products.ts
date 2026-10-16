"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Models } from "@/app/generated/prisma8/contract.d";
import getCurrentUser from "./auth";
import { getDb } from "./prisma";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z
    .string()
    .regex(/^(?:0|[1-9]\d{0,9})(?:\.\d{1,2})?$/, "Invalid price"),
  quantity: z.coerce
    .number()
    .int()
    .min(0, "Quantity must be a non-negative integer"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
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

  if (!id || typeof delta !== "number") {
    throw new Error("Invalid parameters");
  }

  const product = await getDb().orm.public.Product.first({ id, userId });

  if (!product) {
    throw new Error("Product not found");
  }

  const newQuantity = Math.max(0, product.quantity + delta);

  await getDb().orm.public.Product.where({ id, userId }).update({
    quantity: newQuantity,
  });

  revalidatePath("/inventory");
  revalidatePath("/dashboard");
  return { success: true, quantity: newQuantity };
};

export const SetProductQuantity = async (id: string, quantity: number) => {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!id || typeof quantity !== "number" || Number.isNaN(quantity)) {
    throw new Error("Invalid parameters");
  }

  const validQuantity = Math.max(0, Math.floor(quantity));

  await getDb().orm.public.Product.where({ id, userId }).updateAndCount({
    quantity: validQuantity,
  });

  revalidatePath("/dashboard");
  return { success: true, quantity: validQuantity };
};

export default DeleteProduct;

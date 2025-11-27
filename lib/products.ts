"use server";

import getCurrentUser from "./auth";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce
    .number()
    .int()
    .min(0, "Quantity must be a non-negative integer"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

const DeleteProduct = async (formData: FormData) => {
  const user = await getCurrentUser();
  const id = String(formData.get("id") || "");

  await prisma.product.deleteMany({
    where: { userId: user?.id, id: id },
  });

  revalidatePath("/inventory");
};

export const CreateProduct = async (formData: FormData) => {
  const user = await getCurrentUser();
  
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
    await prisma.product.create({
      data: { ...parsed.data, userId: user?.id || "" },
    });
    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.log(error);
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
    await prisma.product.deleteMany({
      where: {
        id: { in: productIds },
        userId: userId,
      },
    });

    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.error("Error deleting products:", error);
    throw new Error("Failed to delete products");
  }
};

export default DeleteProduct;
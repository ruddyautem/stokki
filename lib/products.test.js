import { expect, mock, test } from "bun:test";

let quantity = 10,
  currentOwner = "A",
  revalidations = [];
mock.module("./auth", () => ({ default: async () => ({ id: currentOwner }) }));
mock.module("next/cache", () => ({
  revalidatePath: (path) => revalidations.push(path),
}));
mock.module("./prisma", () => ({
  getDb: () => ({
    orm: {
      public: {
        Product: {
          first: async ({ userId }) => (userId === "A" ? { quantity } : null),
          where: (predicate) => ({
            updateAndCount: async (next) => {
              await Promise.resolve();
              if (predicate.userId !== "A" || predicate.quantity !== quantity)
                return 0;
              quantity = next.quantity;
              return 1;
            },
          }),
        },
      },
    },
  }),
}));
const { UpdateProductQuantity, SetProductQuantity } = await import(
  "./products"
);
test("concurrent additions are retried: stock 10 becomes 12", async () => {
  quantity = 10;
  currentOwner = "A";
  revalidations = [];
  await Promise.all([
    UpdateProductQuantity("p", 1),
    UpdateProductQuantity("p", 1),
  ]);
  expect(quantity).toBe(12);
  expect(revalidations).toContain("/dashboard");
  expect(revalidations).toContain("/inventory");
});
test("direct edit rejects stale data and another owner cannot update stock", async () => {
  quantity = 12;
  await expect(SetProductQuantity("p", 20, 10)).rejects.toThrow();
  expect(quantity).toBe(12);
  currentOwner = "B";
  await expect(UpdateProductQuantity("p", 1)).rejects.toThrow();
  expect(quantity).toBe(12);
  currentOwner = "A";
});
test("invalid deltas and integer overflow leave stock unchanged", async () => {
  quantity = 2147483647;
  await expect(UpdateProductQuantity("p", 1)).rejects.toThrow();
  await expect(UpdateProductQuantity("p", 0.5)).rejects.toThrow();
  expect(quantity).toBe(2147483647);
});

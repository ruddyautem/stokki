import { expect, test } from "bun:test";
import { stockCategory } from "./stock";

test("every boundary belongs to exactly one stock category with the product threshold", () => {
  for (const threshold of [null, 0, 2, 20])
    for (const quantity of [0, 1, 4, 5, 6, 10, 21]) {
      const category = stockCategory(quantity, threshold);
      expect(category).toBe(
        quantity === 0 ? "out" : quantity <= (threshold ?? 5) ? "low" : "in",
      );
    }
  expect(stockCategory(5, null)).toBe("low");
  expect(stockCategory(10, 20)).toBe("low");
  expect(stockCategory(1, 0)).toBe("in");
});

export function stockCategory(
  quantity: number,
  lowStockAt: number | null,
): "out" | "low" | "in" {
  if (quantity === 0) return "out";
  return quantity <= (lowStockAt ?? 5) ? "low" : "in";
}

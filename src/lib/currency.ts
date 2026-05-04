import type { Product } from "@/lib/products";

export function priceToNumber(product: Product): number {
  return product.price;
}

export function formatSoles(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}

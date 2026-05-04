import type { Product } from "../data/products";

export function priceToNumber(product: Product): number {
  return Number(product.price.replace("S/", "").trim());
}

export function formatSoles(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}

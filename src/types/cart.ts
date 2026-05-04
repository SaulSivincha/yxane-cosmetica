import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

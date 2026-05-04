"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/products";
import { useCart } from "@/providers/cart-provider";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
  children: ReactNode;
};

export function AddToCartButton({
  product,
  className,
  children,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button className={className} onClick={() => addItem(product)}>
      {children}
    </Button>
  );
}

"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { checkoutProducts } from "@/data/products";
import { priceToNumber } from "@/lib/currency";
import type { Product } from "@/data/products";
import type { CartItem } from "@/types/cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  isCartOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  increaseItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialItems: CartItem[] = checkoutProducts.map((product) => ({
  product,
  quantity: 1,
}));

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addItem(product: Product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }

  function removeItem(productId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  }

  function increaseItem(productId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decreaseItem(productId: string) {
    setItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.product.id !== productId) {
          return [item];
        }

        if (item.quantity === 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  }

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + priceToNumber(item.product) * item.quantity,
      0,
    );
    const shipping = items.length > 0 ? 10 : 0;

    return {
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      isCartOpen,
      addItem,
      removeItem,
      increaseItem,
      decreaseItem,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
    };
  }, [items, isCartOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}

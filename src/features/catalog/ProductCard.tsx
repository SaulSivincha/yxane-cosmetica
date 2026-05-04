"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { formatSoles } from "@/lib/currency";
import type { Product } from "@/lib/products";
import { useCart } from "@/providers/cart-provider";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-yxane-ink m-0 transition-colors hover:bg-yxane-surface/30">
      <Link
        href={routes.product(product.slug)}
        className="focus-ring relative aspect-[4/5] overflow-hidden border-b border-yxane-ink/10 bg-yxane-surface text-left transition-colors"
      >
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-yxane-mauve">
          {product.category}
        </p>
        <Link
          href={routes.product(product.slug)}
          className="focus-ring rounded text-left"
        >
          <h3 className="font-serif text-lg text-yxane-ink transition-colors group-hover:text-yxane-hover">
            {product.title}
          </h3>
        </Link>
        {product.presentation && (
          <p className="mt-2 text-sm text-stone-500">
            {product.presentation}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="font-semibold text-yxane-ink">
            {formatSoles(product.price)}
          </span>
          <button
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-white border border-yxane-mauve/40 text-yxane-ink transition-colors hover:border-yxane-ink shadow-sm"
            onClick={() => addItem(product)}
            type="button"
            aria-label="Añadir al carrito"
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

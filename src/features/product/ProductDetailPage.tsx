import { ArrowLeft, Leaf, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/navigation";
import type { Product } from "@/data/products";
import { AddToCartButton } from "./AddToCartButton";

type ProductDetailPageProps = {
  product: Product;
};

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  return (
    <section className="container-page py-12">
      <Link
        href={routes.shop}
        className="focus-ring mb-8 inline-flex items-center gap-2 rounded text-sm font-semibold text-yxane-ink"
      >
        <ArrowLeft size={17} />
        Volver a compra
      </Link>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_480px]">
        <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-yxane-surface">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) calc(100vw - 560px), 100vw"
            className="object-cover"
          />
        </div>

        <aside className="self-start rounded-lg border border-yxane-line/70 bg-white/80 p-8 shadow-ambient">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yxane-mauve">
            {product.category}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-yxane-ink">
            {product.name}
          </h1>
          <p className="mt-3 text-stone-500">{product.size}</p>
          <p className="mt-6 text-2xl font-semibold text-yxane-ink">
            {product.price}
          </p>
          <p className="mt-6 leading-7 text-stone-600">{product.description}</p>

          <div className="mt-8 flex items-center gap-3">
            <button
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-yxane-line bg-white"
              type="button"
              aria-label="Disminuir cantidad"
            >
              <Minus size={18} />
            </button>
            <span className="flex h-11 w-14 items-center justify-center rounded-lg border border-yxane-line bg-white font-semibold">
              1
            </span>
            <button
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-yxane-line bg-white"
              type="button"
              aria-label="Aumentar cantidad"
            >
              <Plus size={18} />
            </button>
          </div>

          <AddToCartButton product={product} className="mt-8 w-full">
            <ShoppingCart size={18} />
            Agregar al pedido
          </AddToCartButton>

          <div className="mt-8 grid gap-3 border-t border-yxane-line/70 pt-6 text-sm text-stone-600">
            <p className="flex items-center gap-2">
              <Leaf size={17} className="text-yxane-ink" />
              Elaboración natural y lotes pequeños.
            </p>
            <p>Recojo o coordinación por WhatsApp en Arequipa.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

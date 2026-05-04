import { ArrowLeft, Leaf, Minus, Plus, ShoppingCart } from "lucide-react";
import type { PageId } from "../../app/routes";
import type { Product } from "../../data/products";
import { Button } from "../../components/ui/Button";

type ProductDetailPageProps = {
  product: Product;
  onNavigate: (page: PageId) => void;
  onAddToCart: (product: Product) => void;
};

export function ProductDetailPage({
  product,
  onNavigate,
  onAddToCart,
}: ProductDetailPageProps) {
  return (
    <section className="container-page py-12">
      <button
        className="focus-ring mb-8 inline-flex items-center gap-2 rounded text-sm font-semibold text-yxane-ink"
        onClick={() => onNavigate("shop")}
      >
        <ArrowLeft size={17} />
        Volver a compra
      </button>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_480px]">
        <div className="overflow-hidden rounded-lg bg-yxane-surface">
          <img
            src={product.image}
            alt={product.name}
            className="h-full min-h-[520px] w-full object-cover"
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
            <button className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-yxane-line bg-white">
              <Minus size={18} />
            </button>
            <span className="flex h-11 w-14 items-center justify-center rounded-lg border border-yxane-line bg-white font-semibold">
              1
            </span>
            <button className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg border border-yxane-line bg-white">
              <Plus size={18} />
            </button>
          </div>

          <Button className="mt-8 w-full" onClick={() => onAddToCart(product)}>
            <ShoppingCart size={18} />
            Agregar al pedido
          </Button>

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

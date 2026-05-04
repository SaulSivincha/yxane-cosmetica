import { ShoppingCart } from "lucide-react";
import type { Product } from "../../data/products";
import { Button } from "../../components/ui/Button";

type ProductCardProps = {
  product: Product;
  onOpen: (product: Product) => void;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onOpen, onAdd }: ProductCardProps) {
  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-yxane-ink m-0 transition-colors hover:bg-yxane-surface/30">
      <button
        className="focus-ring aspect-[4/5] overflow-hidden border-b border-yxane-ink/10 bg-yxane-surface text-left transition-colors"
        onClick={() => onOpen(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </button>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-yxane-mauve">
          {product.category}
        </p>
        <button
          className="focus-ring rounded text-left"
          onClick={() => onOpen(product)}
        >
          <h3 className="font-serif text-lg text-yxane-ink transition-colors group-hover:text-yxane-hover">
            {product.name}
          </h3>
        </button>
        <p className="mt-2 text-sm text-stone-500">{product.size}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="font-semibold text-yxane-ink">{product.price}</span>
          <button
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-white border border-yxane-mauve/40 text-yxane-ink transition-colors hover:border-yxane-ink shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            aria-label="Añadir al carrito"
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

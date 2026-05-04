import { Banknote, Leaf, ListFilter } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type ShopPageProps = {
  products: Product[];
};

function uniqueValues(values: string[]) {
  return Array.from(new Set(values)).sort((first, second) =>
    first.localeCompare(second, "es"),
  );
}

export function ShopPage({ products }: ShopPageProps) {
  const categories = uniqueValues(products.map((product) => product.category));
  const skinNeeds = uniqueValues(
    products.flatMap((product) => product.skinNeeds),
  );
  const maxPrice = Math.ceil(
    Math.max(0, ...products.map((product) => product.price)),
  );
  const hasVeganProducts = products.some((product) => product.isVegan);

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 grid gap-6 py-14 lg:grid-cols-[220px_auto_1fr]">
      <aside className="h-fit py-2">
        <div className="mb-8">
          <h2 className="font-serif text-xl font-bold text-yxane-ink">
            Filtros
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Refina por propiedades botánicas
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-serif text-xl text-yxane-ink">
              <ListFilter size={20} className="text-yxane-ink" />
              Colecciones
            </h3>
            <div className="space-y-3">
              {categories.map((item) => (
                <label key={item} className="flex items-center gap-3 text-sm text-stone-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-stone-300 text-yxane-ink focus:ring-yxane-ink"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-serif text-xl text-yxane-ink">
              <Leaf size={20} className="text-yxane-ink" />
              Filtrar por necesidad
            </h3>
            <div className="space-y-3">
              {skinNeeds.map((item) => (
                <label key={item} className="flex items-center gap-3 text-sm text-stone-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-stone-300 text-yxane-ink focus:ring-yxane-ink"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-serif text-xl text-yxane-ink">
              <Banknote size={20} className="text-yxane-ink" />
              Rango de precios
            </h3>
            <div className="px-1">
              <div className="relative h-[2px] w-full bg-stone-200">
                <div className="absolute inset-y-0 left-0 right-0 bg-stone-500"></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-medium text-stone-500">
                <span>S/ 0</span>
                <span>S/ {maxPrice}+</span>
              </div>
            </div>
          </div>

          {hasVeganProducts && (
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-xl text-yxane-ink">
                <Leaf size={20} className="text-yxane-ink" strokeWidth={1.5} />
                Valores
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm text-stone-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-stone-300 text-yxane-ink focus:ring-yxane-ink"
                  />
                  Vegano
                </label>
              </div>
            </div>
          )}
        </div>
      </aside>

      <div className="hidden lg:flex flex-col items-center px-4" aria-hidden="true">
        <div className="flex-1 w-px bg-stone-200" />
        <div className="py-5">
          <div className="w-[5px] h-[5px] rotate-45 bg-yxane-mauve" />
        </div>
        <div className="flex-1 w-px bg-stone-200" />
      </div>

      <div className="pl-4">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
            Catálogo completo
          </p>
          <h1 className="font-serif text-4xl text-yxane-ink md:text-5xl">
            Fórmulas naturales para una rutina pausada.
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            Productos reales del catálogo Yxane, organizados para explorar,
            comparar y construir un pedido con intención.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

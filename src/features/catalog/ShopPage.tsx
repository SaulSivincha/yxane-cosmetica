"use client";

import { useMemo, useState } from "react";
import { Banknote, Leaf, ListFilter, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatSoles } from "@/lib/currency";
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [onlyVegan, setOnlyVegan] = useState(false);

  const categories = useMemo(
    () => uniqueValues(products.map((product) => product.category)),
    [products],
  );
  const skinNeeds = useMemo(
    () => uniqueValues(products.flatMap((product) => product.skinNeeds)),
    [products],
  );
  const maxPrice = useMemo(
    () => Math.ceil(Math.max(0, ...products.map((product) => product.price))),
    [products],
  );
  const [priceLimit, setPriceLimit] = useState(maxPrice);
  const hasVeganProducts = products.some((product) => product.isVegan);

  const effectivePriceLimit = Math.min(priceLimit, maxPrice);
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesNeed =
      selectedNeeds.length === 0 ||
      selectedNeeds.some((need) => product.skinNeeds.includes(need));
    const matchesPrice = product.price <= effectivePriceLimit;
    const matchesVegan = !onlyVegan || product.isVegan;

    return matchesCategory && matchesNeed && matchesPrice && matchesVegan;
  });
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedNeeds.length > 0 ||
    onlyVegan ||
    effectivePriceLimit < maxPrice;

  function toggleValue(value: string, selected: string[], setSelected: (values: string[]) => void) {
    setSelected(
      selected.includes(value)
        ? selected.filter((selectedValue) => selectedValue !== value)
        : [...selected, value],
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedNeeds([]);
    setOnlyVegan(false);
    setPriceLimit(maxPrice);
  }

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
                    checked={selectedCategories.includes(item)}
                    onChange={() =>
                      toggleValue(item, selectedCategories, setSelectedCategories)
                    }
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
                    checked={selectedNeeds.includes(item)}
                    onChange={() =>
                      toggleValue(item, selectedNeeds, setSelectedNeeds)
                    }
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
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={effectivePriceLimit}
                onChange={(event) => setPriceLimit(Number(event.target.value))}
                className="w-full accent-yxane-ink"
              />
              <div className="mt-4 flex items-center justify-between text-xs font-medium text-stone-500">
                <span>S/ 0</span>
                <span>{formatSoles(effectivePriceLimit)}</span>
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
                    checked={onlyVegan}
                    onChange={(event) => setOnlyVegan(event.target.checked)}
                    className="h-4 w-4 rounded border-stone-300 text-yxane-ink focus:ring-yxane-ink"
                  />
                  Vegano
                </label>
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="focus-ring inline-flex items-center gap-2 rounded border border-yxane-line px-3 py-2 text-sm font-semibold text-yxane-ink transition-colors hover:border-yxane-ink"
            >
              <X size={16} />
              Limpiar filtros
            </button>
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
          <p className="mt-4 text-sm font-semibold text-yxane-ink">
            {filteredProducts.length} de {products.length} productos
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-yxane-line bg-yxane-surface/40 p-8 text-stone-600">
            No hay productos que coincidan con esos filtros.
          </div>
        )}
      </div>
    </section>
  );
}

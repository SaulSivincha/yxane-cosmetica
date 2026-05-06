"use client";

import { ShoppingCart } from "lucide-react";
import { useActionState, useMemo, useState } from "react";
import Image from "next/image";
import { formatSoles } from "@/lib/currency";
import type { Product } from "@/lib/products";
import type { ProductFormState } from "./actions";

type ProductFormProps = {
  action: (
    state: ProductFormState,
    formData: FormData,
  ) => Promise<ProductFormState>;
  product?: Product;
  submitLabel: string;
};

const inputClass =
  "focus-ring h-11 w-full rounded-lg border border-yxane-line bg-white px-3 text-sm text-stone-700";
const textareaClass =
  "focus-ring min-h-28 w-full rounded-lg border border-yxane-line bg-white px-3 py-2 text-sm text-stone-700";

function listToText(values?: string[]) {
  return values?.join(", ") ?? "";
}

export function ProductForm({ action, product, submitLabel }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [title, setTitle] = useState(product?.title ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [presentation, setPresentation] = useState(product?.presentation ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [compareAtPrice, setCompareAtPrice] = useState(
    String(product?.compareAtPrice ?? ""),
  );
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const previewUrl = useMemo(() => imageUrl.trim(), [imageUrl]);
  const previewPrice = Number(price);
  const previewCompareAtPrice = Number(compareAtPrice);

  return (
    <form action={formAction} className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="grid gap-8">
        {product && <input type="hidden" name="id" value={product.id} />}

        <div className="grid gap-5 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Título
            <input
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={inputClass}
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Slug
            <input
              name="slug"
              defaultValue={product?.slug}
              className={inputClass}
              placeholder="se-genera-desde-el-titulo"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Categoría
            <input
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={inputClass}
              list="product-categories"
              required
            />
            <datalist id="product-categories">
              <option value="Sérum" />
              <option value="Skincare" />
              <option value="Jabones naturales" />
              <option value="Aceites naturales" />
              <option value="Aceites esenciales" />
            </datalist>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Presentación
            <input
              name="presentation"
              value={presentation}
              onChange={(event) => setPresentation(event.target.value)}
              className={inputClass}
              placeholder="30ml, 95g..."
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Precio
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className={inputClass}
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Precio anterior
            <input
              name="compareAtPrice"
              type="number"
              step="0.01"
              min="0"
              value={compareAtPrice}
              onChange={(event) => setCompareAtPrice(event.target.value)}
              className={inputClass}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Stock
            <input
              name="stock"
              type="number"
              min="0"
              defaultValue={product?.stock ?? ""}
              className={inputClass}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Orden
            <input
              name="sortOrder"
              type="number"
              defaultValue={product?.sortOrder ?? 0}
              className={inputClass}
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
          Descripción
          <textarea
            name="description"
            defaultValue={product?.description}
            className={textareaClass}
            required
          />
        </label>

        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Subir imagen a Supabase
            <input
              name="image"
              type="file"
              accept="image/*"
              className="focus-ring w-full rounded-lg border border-dashed border-yxane-line bg-white px-3 py-3 text-sm text-stone-700"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            URL de imagen
            <input
              name="imageUrl"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
          </label>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Necesidades
            <input
              name="skinNeeds"
              defaultValue={listToText(product?.skinNeeds)}
              className={inputClass}
              placeholder="Hidratación, Luminosidad"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
            Tags
            <input
              name="tags"
              defaultValue={listToText(product?.tags)}
              className={inputClass}
              placeholder="rostro, noche"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-3 text-sm font-semibold text-yxane-ink">
            <input
              name="isActive"
              type="checkbox"
              defaultChecked={product?.isActive ?? true}
              className="h-4 w-4 rounded border-yxane-line text-yxane-ink"
            />
            Producto activo
          </label>

          <label className="flex items-center gap-3 text-sm font-semibold text-yxane-ink">
            <input
              name="isVegan"
              type="checkbox"
              defaultChecked={product?.isVegan ?? false}
              className="h-4 w-4 rounded border-yxane-line text-yxane-ink"
            />
            Vegano
          </label>
        </div>

        {state.error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="focus-ring inline-flex min-h-11 items-center justify-center rounded-lg border border-yxane-ink bg-yxane-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-yxane-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Guardando..." : submitLabel}
          </button>
        </div>
      </div>

      <aside className="xl:sticky xl:top-24 xl:self-start">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
          Vista en tienda
        </p>
        <article className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-yxane-ink bg-white transition-colors">
          <div className="relative aspect-[4/5] overflow-hidden border-b border-yxane-ink/10 bg-yxane-surface">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={title || "Vista previa del producto"}
                fill
                sizes="340px"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-stone-500">
                La imagen aparecerá aquí
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-yxane-mauve">
              {category || "Categoría"}
            </p>
            <h3 className="font-serif text-lg text-yxane-ink">
              {title || "Nombre del producto"}
            </h3>
            {presentation && (
              <p className="mt-2 text-sm text-stone-500">{presentation}</p>
            )}
            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              <div>
                <span className="font-semibold text-yxane-ink">
                  {Number.isFinite(previewPrice) && previewPrice > 0
                    ? formatSoles(previewPrice)
                    : "S/ 0.00"}
                </span>
                {Number.isFinite(previewCompareAtPrice) &&
                  previewCompareAtPrice > 0 && (
                    <span className="ml-2 text-sm text-stone-400 line-through">
                      {formatSoles(previewCompareAtPrice)}
                    </span>
                  )}
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-yxane-mauve/40 bg-white text-yxane-ink shadow-sm">
                <ShoppingCart size={17} />
              </span>
            </div>
          </div>
        </article>
      </aside>
    </form>
  );
}

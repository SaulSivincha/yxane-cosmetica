import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import {
  deleteProduct,
  toggleProductStatus,
} from "@/app/admin/productos/actions";
import { DeleteProductButton } from "@/app/admin/productos/DeleteProductButton";
import { requireAdmin } from "@/lib/admin-auth";
import { formatSoles } from "@/lib/currency";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Productos admin",
  description: "Administración de productos Yxane.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  await requireAdmin();

  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <section className="container-page py-14">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
            Administración
          </p>
          <h1 className="mt-3 font-serif text-5xl text-yxane-ink">
            Productos
          </h1>
          <p className="mt-4 text-stone-600">
            Crea, edita, publica o elimina productos del catálogo.
          </p>
        </div>

        <Link
          href="/admin/productos/nuevo"
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-yxane-ink bg-yxane-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-yxane-hover"
        >
          <Plus size={18} />
          Nuevo producto
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto rounded-lg border border-yxane-line bg-white/85">
        <div className="min-w-[860px]">
          <div className="grid grid-cols-[88px_1fr_140px_100px_120px_190px] gap-4 border-b border-yxane-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
            <span>Imagen</span>
            <span>Producto</span>
            <span>Precio</span>
            <span>Stock</span>
            <span>Estado</span>
            <span className="text-right">Acciones</span>
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[88px_1fr_140px_100px_120px_190px] items-center gap-4 border-b border-yxane-line px-5 py-4 last:border-b-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded bg-yxane-surface">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes="88px"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-serif text-lg text-yxane-ink">
                  {product.title}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {product.category} · /productos/{product.slug}
                </p>
              </div>

              <div>
                <p className="font-semibold text-yxane-ink">
                  {formatSoles(product.price.toNumber())}
                </p>
                {product.compareAtPrice && (
                  <p className="text-sm text-stone-400 line-through">
                    {formatSoles(product.compareAtPrice.toNumber())}
                  </p>
                )}
              </div>

              <p className="text-sm font-semibold text-yxane-ink">
                {product.stock ?? "Sin límite"}
              </p>

              <form action={toggleProductStatus}>
                <input type="hidden" name="id" value={product.id} />
                <input
                  type="hidden"
                  name="isActive"
                  value={product.isActive ? "" : "on"}
                />
                <button
                  type="submit"
                  className={`focus-ring rounded-full px-3 py-1 text-xs font-semibold ${
                    product.isActive
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {product.isActive ? "Activo" : "Oculto"}
                </button>
              </form>

              <div className="flex justify-end gap-2">
                <Link
                  href={`/admin/productos/${product.id}/editar`}
                  className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-yxane-line px-3 text-sm font-semibold text-yxane-ink transition-colors hover:border-yxane-ink"
                  aria-label={`Editar ${product.title}`}
                >
                  <Edit size={17} />
                  Editar
                </Link>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={product.id} />
                  <DeleteProductButton productTitle={product.title} />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

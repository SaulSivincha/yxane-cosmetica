import type { Metadata } from "next";
import { ProductForm } from "@/app/admin/productos/ProductForm";
import { createProduct } from "@/app/admin/productos/actions";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Nuevo producto",
  description: "Crear producto en el catálogo Yxane.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  await requireAdmin();

  return (
    <section className="container-page py-14">
      <div className="rounded-lg border border-yxane-line bg-white/85 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
          Catálogo
        </p>
        <h1 className="mt-3 font-serif text-5xl text-yxane-ink">
          Nuevo producto
        </h1>
        <p className="mt-4 text-stone-600">
          Sube una imagen a Supabase Storage o pega una URL pública.
        </p>

        <div className="mt-8">
          <ProductForm action={createProduct} submitLabel="Crear producto" />
        </div>
      </div>
    </section>
  );
}

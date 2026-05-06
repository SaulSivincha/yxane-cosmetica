import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/app/admin/productos/ProductForm";
import { updateProduct } from "@/app/admin/productos/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type EditProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export const metadata: Metadata = {
  title: "Editar producto",
  description: "Editar producto del catálogo Yxane.",
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: EditProductPageProps) {
  await requireAdmin();

  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound();
  }

  const formProduct = {
    id: product.id,
    slug: product.slug,
    title: product.title,
    category: product.category,
    presentation: product.presentation,
    description: product.description,
    price: product.price.toNumber(),
    compareAtPrice: product.compareAtPrice?.toNumber() ?? null,
    imageUrl: product.imageUrl,
    skinNeeds: product.skinNeeds,
    tags: product.tags,
    isActive: product.isActive,
    isVegan: product.isVegan,
    stock: product.stock,
    sortOrder: product.sortOrder,
  };

  return (
    <section className="container-page py-14">
      <div className="rounded-lg border border-yxane-line bg-white/85 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
          Catálogo
        </p>
        <h1 className="mt-3 font-serif text-5xl text-yxane-ink">
          Editar producto
        </h1>
        <p className="mt-4 text-stone-600">
          Los cambios se reflejan en la tienda al guardar.
        </p>

        <div className="mt-8">
          <ProductForm
            action={updateProduct}
            product={formProduct}
            submitLabel="Guardar cambios"
          />
        </div>
      </div>
    </section>
  );
}

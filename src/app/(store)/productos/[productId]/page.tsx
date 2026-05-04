import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/features/product/ProductDetailPage";
import { getProductBySlug, getProductSlugs } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getProductSlugs();

  return slugs.map((slug) => ({
    productId: slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductBySlug(productId);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Page({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await getProductBySlug(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/features/product/ProductDetailPage";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function Page({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = products.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}

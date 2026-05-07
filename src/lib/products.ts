import { unstable_noStore as noStore } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  presentation: string | null;
  description: string;
  price: number;
  compareAtPrice: number | null;
  imageUrl: string;
  skinNeeds: string[];
  tags: string[];
  isActive: boolean;
  isVegan: boolean;
  stock: number | null;
  sortOrder: number;
};

const productOrder = [
  { sortOrder: "asc" },
  { createdAt: "desc" },
] satisfies Prisma.ProductOrderByWithRelationInput[];

function toProduct(product: Awaited<ReturnType<typeof prisma.product.findFirst>>): Product {
  if (!product) {
    throw new Error("Cannot map an empty product.");
  }

  return {
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
}

export async function getProducts(): Promise<Product[]> {
  noStore();

  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: productOrder,
  });

  return products.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  noStore();

  const product = await prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
    },
  });

  return product ? toProduct(product) : null;
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true },
    orderBy: productOrder,
  });

  return products.map((product) => product.slug);
}

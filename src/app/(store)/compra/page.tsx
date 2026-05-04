import type { Metadata } from "next";
import { ShopPage } from "@/features/catalog/ShopPage";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Compra",
  description:
    "Explora el catálogo de productos naturales Yxane y arma tu pedido.",
};

export default async function Page() {
  const products = await getProducts();

  return <ShopPage products={products} />;
}

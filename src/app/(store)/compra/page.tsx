import type { Metadata } from "next";
import { ShopPage } from "@/features/catalog/ShopPage";

export const metadata: Metadata = {
  title: "Compra",
  description:
    "Explora el catálogo de productos naturales Yxane y arma tu pedido.",
};

export default function Page() {
  return <ShopPage />;
}

import { HomePage } from "@/features/catalog/HomePage";
import { getProducts } from "@/lib/products";

export default async function Page() {
  const products = await getProducts();

  return <HomePage products={products} />;
}

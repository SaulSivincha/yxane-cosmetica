import { useState } from "react";
import type { PageId } from "./routes";
import { PageShell } from "../components/layout/PageShell";
import { checkoutProducts, products } from "../data/products";
import type { Product } from "../data/products";
import { FindUsPage } from "../features/find-us/FindUsPage";
import { HomePage } from "../features/catalog/HomePage";
import { ProductDetailPage } from "../features/product/ProductDetailPage";
import { ShopPage } from "../features/catalog/ShopPage";
import { CartDrawer } from "../components/layout/CartDrawer";

export function App() {
  const [page, setPage] = useState<PageId>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [cart, setCart] = useState<Product[]>(checkoutProducts);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function navigate(nextPage: PageId) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    navigate("product");
  }

  function addToCart(product: Product) {
    setCart((current) =>
      current.some((item) => item.id === product.id)
        ? current
        : [...current, product],
    );
    setIsCartOpen(true);
  }

  return (
    <>
      <PageShell activePage={page} onNavigate={navigate} onOpenCart={() => setIsCartOpen(true)}>
        {page === "home" && (
          <HomePage
            onNavigate={navigate}
            onSelectProduct={openProduct}
            onAddToCart={addToCart}
          />
        )}
        {page === "shop" && (
          <ShopPage
            onNavigate={navigate}
            onSelectProduct={openProduct}
            onAddToCart={addToCart}
          />
        )}
        {page === "product" && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        )}
        {page === "find-us" && <FindUsPage />}
      </PageShell>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} />
    </>
  );
}

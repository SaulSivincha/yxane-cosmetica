import { ArrowRight, MapPin } from "lucide-react";
import type { PageId } from "../../app/routes";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { SectionDivider } from "../../components/ui/SectionDivider";
import { products } from "../../data/products";
import type { Product } from "../../data/products";
import { ProductCard } from "./ProductCard";

type HomePageProps = {
  onNavigate: (page: PageId) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export function HomePage({
  onNavigate,
  onSelectProduct,
  onAddToCart,
}: HomePageProps) {
  return (
    <>
      <section className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-12 py-14 lg:grid-cols-[1fr_520px]">
        <Reveal animation="fade-in-left">
          <Reveal animation="fade-in-down">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
              Cosmética natural
            </p>
          </Reveal>
          <Reveal animation="fade-in-up" delay={100}>
            <h1 className="font-serif text-5xl leading-tight text-yxane-ink md:text-7xl">
              Productos 100% naturales para tu cuidado personal
            </h1>
          </Reveal>
          <Reveal animation="fade-in-up" delay={180}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
              Yxane reúne jabones, aceites, sérums y mascarillas de inspiración
              natural con una estética limpia, pausada y funcional.
            </p>
          </Reveal>
          <Reveal animation="fade-in-up" delay={260}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="transition-transform duration-200 active:scale-[0.97]"
                onClick={() => onNavigate("shop")}
              >
                Comprar ahora
                <ArrowRight size={18} />
              </Button>
              <Button
                variant="secondary"
                className="transition-transform duration-200 active:scale-[0.97]"
                onClick={() => onNavigate("find-us")}
              >
                <MapPin size={18} />
                Encuéntranos
              </Button>
            </div>
          </Reveal>
        </Reveal>
        <Reveal
          animation="fade-in-right"
          className="grid grid-cols-2 gap-4"
          delay={180}
        >
          {products.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              onClick={() => onNavigate("shop")}
              className={`cursor-pointer overflow-hidden rounded-lg bg-yxane-surface ${
                index % 2 ? "translate-y-8" : ""
              } transition-transform hover:scale-[1.02] active:scale-[0.98]`}
            >
              <Reveal animation="fade-in-scale" delay={220 + index * 90}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </Reveal>
            </div>
          ))}
        </Reveal>
      </section>

      <Reveal animation="fade-in" delay={120}>
        <SectionDivider />
      </Reveal>

      <section className="container-page py-14">
        <Reveal animation="fade-in-up">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
                Selección
              </p>
              <h2 className="mt-3 font-serif text-4xl text-yxane-ink">
                Productos destacados
              </h2>
            </div>
            <Button
              variant="ghost"
              className="transition-transform duration-200 active:scale-[0.97]"
              onClick={() => onNavigate("shop")}
            >
              Ver catálogo
            </Button>
          </div>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {products.slice(0, 3).map((product, index) => (
            <Reveal
              key={product.id}
              animation="fade-in-up"
              className="transition-transform duration-200 active:scale-[0.98]"
              delay={120 + index * 90}
            >
              <ProductCard
                product={product}
                onOpen={onSelectProduct}
                onAdd={onAddToCart}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

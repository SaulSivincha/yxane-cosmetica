import { MapPin } from "lucide-react";
import type { PageId } from "../../app/routes";
import { Button } from "../../components/ui/Button";
import type { Product } from "../../data/products";
import { CheckoutSteps } from "./CheckoutSteps";
import { OrderSummary } from "./OrderSummary";

type DeliveryStepProps = {
  items: Product[];
  onNavigate: (page: PageId) => void;
};

export function DeliveryStep({ items, onNavigate }: DeliveryStepProps) {
  return (
    <>
      <CheckoutSteps current={3} />
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="font-serif text-3xl text-yxane-ink">Entrega</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-lg border border-yxane-line p-5">
              <MapPin className="text-yxane-ink" />
              <h2 className="mt-4 font-serif text-xl text-yxane-ink">Recojo en tienda</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                José Luis Bustamante y Rivero, Arequipa, Perú, 054.
              </p>
            </article>
            <article className="rounded-lg border border-yxane-line p-5">
              <MapPin className="text-yxane-ink" />
              <h2 className="mt-4 font-serif text-xl text-yxane-ink">Coordinación</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Confirmamos horario y detalle por WhatsApp al 956 580 463.
              </p>
            </article>
          </div>
          <div className="mt-6 rounded-lg bg-yxane-surface p-5">
            <p className="text-sm font-semibold text-yxane-ink">Productos incluidos</p>
            <div className="mt-4 grid gap-3">
              {items.slice(0, 2).map((product) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span>{product.name}</span>
                  <span className="font-semibold">{product.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div>
          <OrderSummary items={items.slice(0, 2)} />
          <Button className="mt-4 w-full" onClick={() => onNavigate("shop")}>
            Confirmar pedido
          </Button>
        </div>
      </div>
    </>
  );
}

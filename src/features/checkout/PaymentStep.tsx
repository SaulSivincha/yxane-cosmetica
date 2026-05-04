import type { PageId } from "../../app/routes";
import { Button } from "../../components/ui/Button";
import type { Product } from "../../data/products";
import { CheckoutSteps } from "./CheckoutSteps";
import { OrderSummary } from "./OrderSummary";

type PaymentStepProps = {
  items: Product[];
  onNavigate: (page: PageId) => void;
};

export function PaymentStep({ items, onNavigate }: PaymentStepProps) {
  return (
    <>
      <CheckoutSteps current={2} />
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="font-serif text-3xl text-yxane-ink">Datos y pago</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Nombre completo" placeholder="Tu nombre" />
            <Field label="Celular" placeholder="956 580 463" />
            <Field label="Correo" placeholder="correo@ejemplo.com" />
            <Field label="Distrito" placeholder="Arequipa" />
          </div>
          <div className="mt-6 rounded-lg border border-yxane-line bg-yxane-surface p-4">
            <p className="text-sm font-semibold text-yxane-ink">Productos del pedido</p>
            <p className="mt-2 text-sm text-stone-600">
              {items
                .slice(0, 3)
                .map((product) => product.name)
                .join(", ")}
            </p>
          </div>
        </form>
        <div>
          <OrderSummary items={items.slice(0, 3)} />
          <Button className="mt-4 w-full" onClick={() => onNavigate("checkout-delivery")}>
            Continuar a entrega
          </Button>
        </div>
      </div>
    </>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-yxane-mauve">
        {label}
      </span>
      <input
        className="focus-ring mt-2 h-12 w-full rounded-lg border border-yxane-line bg-white px-4"
        placeholder={placeholder}
      />
    </label>
  );
}

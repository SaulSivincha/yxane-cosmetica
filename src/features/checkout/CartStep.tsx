import { Minus, Plus, Trash2 } from "lucide-react";
import type { PageId } from "../../app/routes";
import { Button } from "../../components/ui/Button";
import type { Product } from "../../data/products";
import { OrderSummary } from "./OrderSummary";
import { CheckoutSteps } from "./CheckoutSteps";

type CartStepProps = {
  items: Product[];
  onNavigate: (page: PageId) => void;
};

export function CartStep({ items, onNavigate }: CartStepProps) {
  return (
    <>
      <CheckoutSteps current={1} />
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="font-serif text-3xl text-yxane-ink">Mi pedido</h1>
          <div className="mt-6 space-y-4">
            {items.slice(0, 2).map((product) => (
              <article
                key={product.id}
                className="grid gap-4 rounded-lg border border-yxane-line p-4 md:grid-cols-[96px_1fr_auto]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 rounded-md object-cover"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-yxane-mauve">
                    {product.category}
                  </p>
                  <h2 className="mt-2 font-serif text-xl text-yxane-ink">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-stone-500">{product.size}</p>
                  <p className="mt-3 font-semibold text-yxane-ink">
                    {product.price}
                  </p>
                </div>
                <div className="flex items-center gap-2 md:flex-col md:justify-between">
                  <div className="flex items-center rounded-lg border border-yxane-line">
                    <button className="focus-ring p-2">
                      <Minus size={16} />
                    </button>
                    <span className="px-3 text-sm font-semibold">1</span>
                    <button className="focus-ring p-2">
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="focus-ring rounded p-2 text-yxane-mauve">
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div>
          <OrderSummary items={items.slice(0, 2)} />
          <Button className="mt-4 w-full" onClick={() => onNavigate("checkout-payment")}>
            Continuar
          </Button>
        </div>
      </div>
    </>
  );
}

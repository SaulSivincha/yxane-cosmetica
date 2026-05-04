import type { Product } from "../../data/products";
import { formatSoles, priceToNumber } from "../../lib/currency";

type OrderSummaryProps = {
  items: Product[];
};

export function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, product) => sum + priceToNumber(product), 0);
  const delivery = 8;

  return (
    <aside className="h-fit rounded-lg border border-yxane-line/80 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-2xl text-yxane-ink">Resumen</h2>
      <div className="mt-6 space-y-4">
        {items.map((product) => (
          <div key={product.id} className="flex gap-3">
            <img
              src={product.image}
              alt={product.name}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-yxane-ink">{product.name}</p>
              <p className="text-xs text-stone-500">{product.size}</p>
            </div>
            <span className="text-sm font-semibold text-yxane-ink">
              {product.price}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3 border-t border-yxane-line pt-5 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatSoles(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Entrega</span>
          <span>{formatSoles(delivery)}</span>
        </div>
        <div className="flex justify-between pt-2 text-lg font-semibold text-yxane-ink">
          <span>Total</span>
          <span>{formatSoles(subtotal + delivery)}</span>
        </div>
      </div>
    </aside>
  );
}

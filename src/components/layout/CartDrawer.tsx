"use client";

import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  Store,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatSoles, priceToNumber } from "@/lib/currency";
import { useCart } from "@/providers/cart-provider";

type CheckoutStep = 1 | 2 | 3;

export function CartDrawer() {
  const {
    items,
    subtotal,
    shipping,
    total,
    isCartOpen,
    closeCart,
    removeItem,
    increaseItem,
    decreaseItem,
  } = useCart();
  const [step, setStep] = useState<CheckoutStep>(1);

  function handleClose() {
    setStep(1);
    closeCart();
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col bg-[#faf9f8] shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pb-2 pt-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-yxane-ink">
              Mi Pedido
            </h2>
            <p className="mt-1 text-sm text-stone-500">Paso {step} de 3</p>
          </div>
          <button
            className="focus-ring rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-200/50 hover:text-stone-700"
            onClick={handleClose}
            type="button"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-stone-200/60 px-6 py-4">
          <div className="mb-2 flex items-center gap-2">
            <button
              className={`focus-ring flex flex-1 flex-col items-start gap-2 rounded-sm ${
                step >= 1 ? "cursor-pointer hover:opacity-80" : "cursor-default"
              }`}
              onClick={() => step > 1 && setStep(1)}
              disabled={step === 1}
              type="button"
              aria-label="Ir a carrito"
            >
              <div
                className={`w-full rounded-full transition-all duration-300 ${
                  step === 1
                    ? "h-[3.5px] bg-yxane-ink"
                    : step > 1
                      ? "h-[2px] bg-emerald-700/30"
                      : "h-[2px] bg-stone-200"
                }`}
              />
              <span
                className={`text-[12px] font-medium ${
                  step >= 1 ? "text-yxane-ink" : "text-stone-400"
                }`}
              >
                Carrito
              </span>
            </button>

            <button
              className={`focus-ring flex flex-1 flex-col items-center gap-2 rounded-sm ${
                step >= 2 ? "cursor-pointer hover:opacity-80" : "cursor-default"
              }`}
              onClick={() => step > 2 && setStep(2)}
              disabled={step <= 2}
              type="button"
              aria-label="Ir a datos"
            >
              <div
                className={`w-full rounded-full transition-all duration-300 ${
                  step === 2
                    ? "h-[3.5px] bg-yxane-ink"
                    : step > 2
                      ? "h-[2px] bg-emerald-700/30"
                      : "h-[2px] bg-stone-200"
                }`}
              />
              <span
                className={`text-[12px] font-medium ${
                  step >= 2 ? "text-yxane-ink" : "text-stone-400"
                }`}
              >
                Datos
              </span>
            </button>

            <button
              className="focus-ring flex flex-1 cursor-default flex-col items-end gap-2 rounded-sm"
              disabled
              type="button"
              aria-label="Ir a pago"
            >
              <div
                className={`w-full rounded-full transition-all duration-300 ${
                  step === 3 ? "h-[3.5px] bg-yxane-ink" : "h-[2px] bg-stone-200"
                }`}
              />
              <span
                className={`text-[12px] font-medium ${
                  step >= 3 ? "text-yxane-ink" : "text-stone-400"
                }`}
              >
                Pago
              </span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-6">
              {items.length === 0 ? (
                <p className="py-10 text-center text-stone-500">
                  Tu carrito está vacío.
                </p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex gap-4 border-b border-stone-200/60 pb-6 last:border-0 last:pb-0"
                    >
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        width={80}
                        height={96}
                        sizes="80px"
                        className="h-24 w-20 rounded-lg border border-stone-200/50 object-cover"
                      />
                      <div className="flex flex-1 flex-col pt-1">
                        <div className="flex justify-between">
                          <h3 className="pr-4 font-serif text-[15px] font-bold text-yxane-ink">
                            {item.product.title}
                          </h3>
                          <button
                            className="h-fit text-stone-400 transition-colors hover:text-red-500"
                            onClick={() => removeItem(item.product.id)}
                            type="button"
                            aria-label={`Quitar ${item.product.title}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="mb-3 text-xs text-stone-500">
                          {item.product.category}
                          {item.product.presentation
                            ? ` • ${item.product.presentation}`
                            : ""}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="font-medium text-stone-700">
                            {formatSoles(
                              priceToNumber(item.product) * item.quantity,
                            )}
                          </span>
                          <div className="flex items-center gap-3 rounded-full border border-stone-200 px-3 py-1">
                            <button
                              className="cursor-pointer text-stone-400 hover:text-yxane-ink"
                              onClick={() => decreaseItem(item.product.id)}
                              type="button"
                              aria-label={`Disminuir ${item.product.title}`}
                            >
                              -
                            </button>
                            <span className="w-4 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              className="cursor-pointer text-stone-400 hover:text-yxane-ink"
                              onClick={() => increaseItem(item.product.id)}
                              type="button"
                              aria-label={`Aumentar ${item.product.title}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="animate-in space-y-8 duration-300 fade-in">
              <div>
                <h3 className="mb-4 text-[15px] font-medium text-yxane-ink">
                  Datos personales
                </h3>
                <div className="space-y-5">
                  <Field label="Nombre completo" placeholder="Ej. Camila Rojas" />
                  <Field label="DNI / CE" placeholder="Documento de identidad" />
                  <Field label="WhatsApp" placeholder="+51 999 999 999" type="tel" />
                  <Field
                    label="Email"
                    placeholder="tucorreo@ejemplo.com"
                    type="email"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-[15px] font-medium text-yxane-ink">
                  Método de pago
                </h3>
                <div className="rounded-lg border border-yxane-ink bg-white p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard size={18} className="text-yxane-ink" />
                      <span className="text-[14px] font-medium text-yxane-ink">
                        Tarjeta de crédito / débito
                      </span>
                    </div>
                    <div className="h-4 w-4 rounded-full border-4 border-yxane-ink" />
                  </div>

                  <div className="space-y-4 border-t border-stone-100 pt-2">
                    <Field
                      label="Número de tarjeta"
                      placeholder="0000 0000 0000 0000"
                      inputClassName="font-mono text-[14px]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        label="Vencimiento"
                        placeholder="MM/AA"
                        inputClassName="font-mono text-[14px]"
                      />
                      <Field
                        label="CVV"
                        placeholder="123"
                        inputClassName="font-mono text-[14px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in space-y-8 duration-300 fade-in">
              <div>
                <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-yxane-ink">
                  Método de entrega
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-yxane-ink bg-white py-4 text-center transition-colors"
                    type="button"
                  >
                    <MapPin size={22} className="text-yxane-ink" />
                    <span className="text-[13px] font-medium text-yxane-ink">
                      Delivery
                    </span>
                  </button>
                  <button
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-stone-200 bg-transparent py-4 text-center text-stone-400 transition-colors hover:border-yxane-ink/50"
                    type="button"
                  >
                    <Store size={22} />
                    <span className="text-[13px] font-medium">Recojo</span>
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <Field placeholder="Dirección de envío" />
                <div className="grid grid-cols-2 gap-4">
                  <Field placeholder="Distrito" />
                  <Field placeholder="Ciudad" />
                </div>
                <Field placeholder="Instrucciones especiales (Opcional)" />
              </div>

              <div className="rounded-xl bg-[#f2f1f0] p-5">
                <h4 className="mb-4 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                  Resumen del pedido
                </h4>
                <ul className="mb-5 space-y-4 border-b border-stone-200/60 pb-5">
                  {items.map((item) => (
                    <li
                      key={`summary-${item.product.id}`}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-200/50">
                        <CheckCircle2 size={16} className="text-stone-400" />
                      </div>
                      <div className="flex-1">
                        <p className="pr-4 text-[13px] leading-tight text-yxane-ink">
                          {item.product.title}
                        </p>
                        <p className="text-[12px] text-stone-500">
                          {item.quantity} x{" "}
                          {item.product.presentation ?? "producto"}
                        </p>
                      </div>
                      <span className="text-[13px] text-stone-700">
                        {formatSoles(
                          priceToNumber(item.product) * item.quantity,
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 text-[13px] text-stone-500">
                  <SummaryRow label="Subtotal" value={formatSoles(subtotal)} />
                  <SummaryRow label="Envío" value={formatSoles(shipping)} />
                </div>
                <div className="mt-4 flex justify-between border-t border-stone-200/60 pt-4">
                  <span className="font-serif text-xl font-bold text-yxane-ink">
                    Total
                  </span>
                  <span className="font-serif text-xl text-yxane-ink">
                    {formatSoles(total)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="shrink-0 border-t border-stone-200 bg-[#faf9f8] p-6 pb-8">
            {step === 1 && (
              <>
                <div className="mb-6 space-y-3 text-[14px]">
                  <SummaryRow label="Subtotal" value={formatSoles(subtotal)} />
                  <SummaryRow
                    label="Envío estimado"
                    value={formatSoles(shipping)}
                  />
                  <div className="flex justify-between border-t border-stone-200 pt-3">
                    <span className="font-serif text-xl font-bold text-yxane-ink">
                      Total
                    </span>
                    <span className="font-serif text-xl font-bold text-yxane-ink">
                      {formatSoles(total)}
                    </span>
                  </div>
                </div>
                <Button
                  className="flex w-full items-center justify-center gap-2 py-6 text-[15px]"
                  onClick={() => setStep(2)}
                >
                  Continuar con datos
                  <ArrowRight size={18} />
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-6 space-y-2 text-[14px]">
                  <SummaryRow label="Subtotal" value={formatSoles(subtotal)} />
                  <div className="flex justify-between pt-3">
                    <span className="text-[16px] text-yxane-ink">Total</span>
                    <span className="font-serif text-xl font-bold text-yxane-ink">
                      {formatSoles(total)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    className="px-5"
                    onClick={() => setStep(1)}
                  >
                    Regresar
                  </Button>
                  <Button
                    className="flex flex-1 items-center justify-center gap-2 py-6 text-[15px]"
                    onClick={() => setStep(3)}
                  >
                    Siguiente paso
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="px-5"
                  onClick={() => setStep(2)}
                >
                  Regresar
                </Button>
                <Button
                  className="flex flex-1 items-center justify-center gap-2 py-6 text-[15px]"
                  onClick={() => window.alert("Compra finalizada.")}
                >
                  Finalizar compra
                  <CheckCircle2 size={18} />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  inputClassName = "",
}: {
  label?: string;
  placeholder: string;
  type?: "email" | "tel" | "text";
  inputClassName?: string;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-500">
          {label}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border-b border-stone-200 bg-transparent py-2 text-[15px] text-yxane-ink placeholder:text-stone-400 focus:border-yxane-ink focus:outline-none ${inputClassName}`}
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-stone-600">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

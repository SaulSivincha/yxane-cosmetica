"use client";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Smartphone,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatSoles, priceToNumber } from "@/lib/currency";
import { useCart } from "@/providers/cart-provider";

type CheckoutStep = 1 | 2 | 3;

type CheckoutForm = {
  customerName: string;
  customerPhone: string;
  customerDni: string;
  customerEmail: string;
  notes: string;
};

const initialForm: CheckoutForm = {
  customerName: "",
  customerPhone: "",
  customerDni: "",
  customerEmail: "",
  notes: "",
};

const yapeNumber = process.env.NEXT_PUBLIC_YAPE_NUMBER || "993166304";
const igvRate = 0.18;

export function CartDrawer() {
  const {
    items,
    subtotal,
    total,
    isCartOpen,
    closeCart,
    removeItem,
    increaseItem,
    decreaseItem,
    clearCart,
  } = useCart();
  const [step, setStep] = useState<CheckoutStep>(1);
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClose() {
    setStep(1);
    setError("");
    closeCart();
  }

  function updateField(field: keyof CheckoutForm, value: string) {
    setError("");
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validateStepTwo() {
    return (
      form.customerName.trim() &&
      form.customerPhone.trim() &&
      form.customerDni.trim() &&
      form.customerEmail.trim()
    );
  }

  async function createOrder() {
    if (!validateStepTwo()) {
      setError("Completa nombre, WhatsApp, DNI y email.");
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });
      const data = (await response.json()) as {
        error?: string;
        whatsappUrl?: string;
      };

      if (!response.ok || !data.whatsappUrl) {
        throw new Error(data.error || "No se pudo crear el pedido.");
      }

      clearCart();
      setForm(initialForm);
      window.location.href = data.whatsappUrl;
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo crear el pedido.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
            <StepButton
              label="Carrito"
              isActive={step === 1}
              isDone={step > 1}
              align="start"
              onClick={() => step > 1 && setStep(1)}
            />
            <StepButton
              label="Datos"
              isActive={step === 2}
              isDone={step > 2}
              align="center"
              onClick={() => step > 2 && setStep(2)}
            />
            <StepButton
              label="Yape"
              isActive={step === 3}
              isDone={false}
              align="end"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

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
                  <Field
                    label="Nombre completo"
                    placeholder="Ej. Camila Rojas"
                    value={form.customerName}
                    onChange={(value) => updateField("customerName", value)}
                  />
                  <Field
                    label="WhatsApp"
                    placeholder="+51 999 999 999"
                    type="tel"
                    value={form.customerPhone}
                    onChange={(value) => updateField("customerPhone", value)}
                  />
                  <Field
                    label="DNI"
                    placeholder="Documento de identidad"
                    value={form.customerDni}
                    onChange={(value) => updateField("customerDni", value)}
                  />
                  <Field
                    label="Email"
                    placeholder="tucorreo@ejemplo.com"
                    type="email"
                    value={form.customerEmail}
                    onChange={(value) => updateField("customerEmail", value)}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-yxane-line bg-white p-4">
                <div className="flex items-start gap-3">
                  <Smartphone size={18} className="mt-0.5 text-yxane-ink" />
                  <p className="text-sm leading-6 text-stone-600">
                    En el siguiente paso verás el número de Yape y el total.
                    Después de yapear, finalizarás la compra por WhatsApp
                    enviando tu captura para validación manual.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in space-y-8 duration-300 fade-in">
              <div className="rounded-lg border border-yxane-ink bg-white p-5">
                <div className="flex items-start gap-3">
                  <Smartphone size={22} className="mt-0.5 text-yxane-ink" />
                  <div>
                    <h3 className="text-[15px] font-semibold text-yxane-ink">
                      Yapea el total a este número
                    </h3>
                    <p className="mt-3 font-serif text-4xl text-yxane-ink">
                      {yapeNumber}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-stone-600">
                      Realiza el Yape por {formatSoles(total)}. Luego presiona
                      Finalizar compra para abrir WhatsApp con tu pedido y
                      enviar la captura en el mensaje que dirá Captura de Yape.
                    </p>
                  </div>
                </div>
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
                  <SummaryRow
                    label="IGV incluido"
                    value={formatSoles(getIncludedIgv(subtotal))}
                  />
                </div>
                <div className="mt-4 flex justify-between border-t border-stone-200/60 pt-4">
                  <span className="font-serif text-xl font-bold text-yxane-ink">
                    Total a yapear
                  </span>
                  <span className="font-serif text-xl text-yxane-ink">
                    {formatSoles(total)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-yxane-line bg-white p-4">
                <div className="flex items-start gap-3">
                  <MessageCircle size={20} className="mt-0.5 text-yxane-ink" />
                  <p className="text-sm leading-6 text-stone-600">
                    Al confirmar se creará un pedido pendiente y se abrirá
                    WhatsApp con los productos seleccionados y el texto
                    Captura de Yape. Adjunta ahí tu captura para validación
                    manual.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="shrink-0 border-t border-stone-200 bg-[#faf9f8] p-6 pb-8">
            {step === 1 && (
              <>
                <CartTotals subtotal={subtotal} total={total} />
                <Button
                  className="flex w-full items-center justify-center gap-2 py-6 text-[15px]"
                  onClick={() => setStep(2)}
                >
                  Continuar
                  <ArrowRight size={18} />
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <CartTotals subtotal={subtotal} total={total} />
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
                    onClick={() => {
                      if (validateStepTwo()) {
                        setStep(3);
                        setError("");
                      } else {
                        setError("Completa nombre, WhatsApp, DNI y email.");
                      }
                    }}
                  >
                    Revisar pedido
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
                  disabled={isSubmitting}
                >
                  Regresar
                </Button>
                <Button
                  className="flex flex-1 items-center justify-center gap-2 py-6 text-[15px]"
                  onClick={createOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <MessageCircle size={18} />
                  )}
                  Finalizar compra
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function StepButton({
  label,
  isActive,
  isDone,
  align,
  onClick,
}: {
  label: string;
  isActive: boolean;
  isDone: boolean;
  align: "start" | "center" | "end";
  onClick?: () => void;
}) {
  return (
    <button
      className={`focus-ring flex flex-1 flex-col gap-2 rounded-sm ${
        align === "start"
          ? "items-start"
          : align === "center"
            ? "items-center"
            : "items-end"
      } ${onClick ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
      onClick={onClick}
      disabled={!onClick}
      type="button"
      aria-label={`Ir a ${label}`}
    >
      <div
        className={`w-full rounded-full transition-all duration-300 ${
          isActive
            ? "h-[3.5px] bg-yxane-ink"
            : isDone
              ? "h-[2px] bg-emerald-700/30"
              : "h-[2px] bg-stone-200"
        }`}
      />
      <span
        className={`text-[12px] font-medium ${
          isActive || isDone ? "text-yxane-ink" : "text-stone-400"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: "email" | "tel" | "text";
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-stone-200 bg-transparent py-2 text-[15px] text-yxane-ink placeholder:text-stone-400 focus:border-yxane-ink focus:outline-none"
      />
    </label>
  );
}

function CartTotals({
  subtotal,
  total,
}: {
  subtotal: number;
  total: number;
}) {
  return (
    <div className="mb-6 space-y-3 text-[14px]">
      <SummaryRow label="Subtotal" value={formatSoles(subtotal)} />
      <SummaryRow
        label="IGV incluido"
        value={formatSoles(getIncludedIgv(subtotal))}
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
  );
}

function getIncludedIgv(totalWithIgv: number) {
  return totalWithIgv - totalWithIgv / (1 + igvRate);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-stone-600">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

const steps = ["Carrito", "Datos y pago", "Entrega"];

export function CheckoutSteps({ current }: { current: number }) {
  return (
    <div className="mb-8 grid gap-3 rounded-lg bg-white/75 p-3 shadow-sm md:grid-cols-3">
      {steps.map((step, index) => {
        const active = index + 1 === current;
        return (
          <div
            key={step}
            className={`rounded-md px-4 py-3 text-sm font-semibold ${
              active ? "bg-yxane-ink text-white" : "bg-white text-yxane-ink"
            }`}
          >
            Paso {index + 1}: {step}
          </div>
        );
      })}
    </div>
  );
}

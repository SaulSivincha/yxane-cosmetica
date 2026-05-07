import type { Metadata } from "next";
import { Check, Clock, MessageCircle, X } from "lucide-react";
import { approveOrder, rejectOrder } from "@/app/admin/pedidos/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { formatSoles } from "@/lib/currency";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Pedidos admin",
  description: "Validación manual de pedidos por Yape.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

const statusLabels = {
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
};

const statusClasses = {
  PENDING: "bg-amber-50 text-amber-800",
  APPROVED: "bg-emerald-50 text-emerald-800",
  REJECTED: "bg-stone-100 text-stone-600",
};

export default async function Page({ searchParams }: PageProps) {
  await requireAdmin();

  const params = await searchParams;
  const [orders, pendingCount] = await Promise.all([
    prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.order.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <section className="container-page py-14">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
            Administración
          </p>
          <h1 className="mt-3 font-serif text-5xl text-yxane-ink">
            Pedidos por Yape
          </h1>
          <p className="mt-4 text-stone-600">
            Revisa pagos manuales, aprueba pedidos y descuenta stock.
          </p>
        </div>

        <div className="rounded-lg border border-yxane-line bg-white px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
            Pendientes
          </p>
          <p className="mt-1 font-serif text-3xl text-yxane-ink">
            {pendingCount}
          </p>
        </div>
      </div>

      {params?.error && (
        <p className="mt-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {params.error}
        </p>
      )}

      <div className="mt-10 space-y-5">
        {orders.length === 0 ? (
          <div className="rounded-lg border border-yxane-line bg-white/85 p-8 text-center text-stone-500">
            Aún no hay pedidos.
          </div>
        ) : (
          orders.map((order) => (
            <article
              key={order.id}
              className="rounded-lg border border-yxane-line bg-white/85 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-yxane-line pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-serif text-2xl text-yxane-ink">
                      {order.code}
                    </h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusClasses[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-sm text-stone-500">
                    <Clock size={15} />
                    {order.createdAt.toLocaleString("es-PE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                    Total
                  </p>
                  <p className="font-serif text-3xl text-yxane-ink">
                    {formatSoles(order.total.toNumber())}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 py-5 lg:grid-cols-[1fr_1fr]">
                <div>
                  <h3 className="text-sm font-semibold text-yxane-ink">
                    Cliente
                  </h3>
                  <dl className="mt-3 space-y-2 text-sm text-stone-600">
                    <InfoRow label="Nombre" value={order.customerName} />
                    <InfoRow label="WhatsApp" value={order.customerPhone} />
                    <InfoRow label="DNI" value={order.customerDni} />
                    {order.customerEmail && (
                      <InfoRow label="Email" value={order.customerEmail} />
                    )}
                    {order.notes && <InfoRow label="Notas" value={order.notes} />}
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-yxane-ink">
                    Validación Yape
                  </h3>
                  <dl className="mt-3 space-y-2 text-sm text-stone-600">
                    <InfoRow label="Titular" value={order.yapeHolderName} />
                    <InfoRow
                      label="Operación"
                      value={order.yapeOperation || "Pendiente por WhatsApp"}
                    />
                    <InfoRow
                      label="Estado"
                      value={
                        order.status === "APPROVED"
                          ? "Pago aprobado"
                          : order.status === "REJECTED"
                            ? "Pedido rechazado"
                            : "Esperando verificación manual"
                      }
                    />
                  </dl>
                </div>
              </div>

              <div className="border-t border-yxane-line pt-4">
                <h3 className="text-sm font-semibold text-yxane-ink">
                  Productos
                </h3>
                <ul className="mt-3 divide-y divide-yxane-line">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                    >
                      <div>
                        <p className="font-medium text-yxane-ink">
                          {item.title}
                        </p>
                        <p className="text-stone-500">
                          {item.quantity} x {formatSoles(item.unitPrice.toNumber())}
                          {item.presentation ? ` · ${item.presentation}` : ""}
                        </p>
                      </div>
                      <p className="font-semibold text-yxane-ink">
                        {formatSoles(item.lineTotal.toNumber())}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-yxane-line pt-5">
                <a
                  href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-yxane-line px-3 text-sm font-semibold text-yxane-ink transition-colors hover:border-yxane-ink"
                >
                  <MessageCircle size={17} />
                  WhatsApp cliente
                </a>

                {order.status === "PENDING" && (
                  <div className="flex gap-2">
                    <form action={rejectOrder}>
                      <input type="hidden" name="id" value={order.id} />
                      <button
                        type="submit"
                        className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-yxane-line px-3 text-sm font-semibold text-yxane-ink transition-colors hover:border-yxane-ink"
                      >
                        <X size={17} />
                        Rechazar
                      </button>
                    </form>
                    <form action={approveOrder}>
                      <input type="hidden" name="id" value={order.id} />
                      <button
                        type="submit"
                        className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-emerald-800 bg-emerald-800 px-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
                      >
                        <Check size={17} />
                        Aprobar y descontar stock
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[92px_1fr] gap-3">
      <dt className="font-medium text-stone-500">{label}</dt>
      <dd className="text-yxane-ink">{value}</dd>
    </div>
  );
}

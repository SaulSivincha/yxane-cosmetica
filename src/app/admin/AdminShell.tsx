"use client";

import { ArrowLeft, LogOut, Package, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { logoutAdmin } from "@/app/admin/actions";

export function AdminShell({
  children,
  pendingOrderCount = 0,
}: {
  children: ReactNode;
  pendingOrderCount?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isProductList = pathname === "/admin/productos";
  const isAuthRoute =
    pathname === "/admin/login" || pathname === "/admin/registro";

  if (isAuthRoute) {
    return <div className="min-h-screen bg-yxane-paper">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-yxane-paper">
      <header className="sticky top-0 z-40 border-b border-yxane-line bg-white/95 backdrop-blur">
        <div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                isProductList ? router.push("/admin/productos") : router.back()
              }
              className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-yxane-line px-3 text-sm font-semibold text-yxane-ink transition-colors hover:border-yxane-ink"
            >
              <ArrowLeft size={17} />
              Volver
            </button>
            <Link
              href="/admin/productos"
              className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-yxane-ink bg-yxane-ink px-3 text-sm font-semibold text-white transition-colors hover:bg-yxane-hover"
            >
              <Package size={17} />
              CRUD productos
            </Link>
            <Link
              href="/admin/pedidos"
              className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-yxane-line bg-white px-3 text-sm font-semibold text-yxane-ink transition-colors hover:border-yxane-ink"
            >
              <ShoppingBag size={17} />
              Pedidos
              {pendingOrderCount > 0 && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                  {pendingOrderCount}
                </span>
              )}
            </Link>
            <Link
              href="/admin/productos/nuevo"
              className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-yxane-line bg-white px-3 text-sm font-semibold text-yxane-ink transition-colors hover:border-yxane-ink"
            >
              <Plus size={17} />
              Nuevo
            </Link>
          </div>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-yxane-line bg-white px-3 text-sm font-semibold text-yxane-ink transition-colors hover:border-yxane-ink"
            >
              <LogOut size={17} />
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}

"use client";

import { ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getActiveNavigation,
  primaryNavigation,
  routes,
} from "@/config/navigation";
import { useCart } from "@/providers/cart-provider";

export function Navbar() {
  const pathname = usePathname();
  const active = getActiveNavigation(pathname);
  const { itemCount, openCart } = useCart();

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-stone-200 bg-white/90 px-5 font-serif tracking-wide text-emerald-900 shadow-sm backdrop-blur-md md:px-8">
      <Link
        href={routes.home}
        className="focus-ring rounded text-2xl italic text-emerald-950"
      >
        Yxane
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {primaryNavigation.map((item) => {
          const isActive = active === item.key;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`focus-ring rounded pb-1 text-sm transition-colors ${
                isActive
                  ? "border-b border-emerald-900 text-emerald-900"
                  : "text-stone-500 opacity-80 hover:text-emerald-700"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-emerald-900">
        <button
          aria-label="Abrir carrito"
          className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-yxane-surface"
          onClick={openCart}
          type="button"
        >
          <ShoppingCart size={20} />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yxane-ink px-1 text-[11px] font-semibold leading-none text-white">
              {itemCount}
            </span>
          )}
        </button>
        <button
          aria-label="Cuenta"
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full hover:bg-yxane-surface"
          type="button"
        >
          <UserRound size={20} />
        </button>
      </div>
    </nav>
  );
}

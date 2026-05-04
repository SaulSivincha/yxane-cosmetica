import { ShoppingCart, UserRound } from "lucide-react";
import type { PageId } from "../../app/routes";
import { pageGroup, primaryNav } from "../../app/routes";

type NavbarProps = {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenCart?: () => void;
};

export function Navbar({ activePage, onNavigate, onOpenCart }: NavbarProps) {
  const active = pageGroup(activePage);

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-stone-200 bg-white/90 px-5 font-serif tracking-wide text-emerald-900 shadow-sm backdrop-blur-md md:px-8">
      <button
        className="focus-ring rounded text-2xl italic text-emerald-950"
        onClick={() => onNavigate("home")}
      >
        Yxane
      </button>

      <div className="hidden items-center gap-8 md:flex">
        {primaryNav.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              className={`focus-ring rounded pb-1 text-sm transition-colors ${
                isActive
                  ? "border-b border-emerald-900 text-emerald-900"
                  : "text-stone-500 opacity-80 hover:text-emerald-700"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-emerald-900">
        <button
          aria-label="Abrir carrito"
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full hover:bg-yxane-surface"
          onClick={onOpenCart}
        >
          <ShoppingCart size={20} />
        </button>
        <button
          aria-label="Cuenta"
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full hover:bg-yxane-surface"
        >
          <UserRound size={20} />
        </button>
      </div>
    </nav>
  );
}

import type { ReactNode } from "react";
import type { PageId } from "../../app/routes";
import { PageTransition } from "../ui/PageTransition";
import { Navbar } from "./Navbar";

type PageShellProps = {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenCart?: () => void;
  children: ReactNode;
  checkout?: boolean;
};

export function PageShell({
  activePage,
  onNavigate,
  onOpenCart,
  children,
  checkout = false,
}: PageShellProps) {
  return (
    <div
      className={`min-h-screen ${
        checkout ? "bg-yxane-lead" : "bg-yxane-paper"
      }`}
    >
      <Navbar activePage={activePage} onNavigate={onNavigate} onOpenCart={onOpenCart} />
      <main className="pt-16">
        <PageTransition pageKey={activePage}>{children}</PageTransition>
      </main>
    </div>
  );
}

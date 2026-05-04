import type { ReactNode } from "react";
import type { PageId } from "../../app/routes";
import { PageShell } from "../../components/layout/PageShell";

type CheckoutLayoutProps = {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
};

export function CheckoutLayout({
  activePage,
  onNavigate,
  children,
}: CheckoutLayoutProps) {
  return (
    <PageShell activePage={activePage} onNavigate={onNavigate} checkout>
      <section className="container-page py-10">{children}</section>
    </PageShell>
  );
}

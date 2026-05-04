"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Navbar } from "@/components/layout/Navbar";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-yxane-paper">
      <Navbar />
      <main className="pt-16">
        <PageTransition pageKey={pathname}>{children}</PageTransition>
      </main>
      <CartDrawer />
    </div>
  );
}

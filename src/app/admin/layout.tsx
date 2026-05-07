import type { ReactNode } from "react";
import { AdminShell } from "@/app/admin/AdminShell";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const pendingOrderCount = await prisma.order.count({
    where: { status: "PENDING" },
  });

  return (
    <AdminShell pendingOrderCount={pendingOrderCount}>{children}</AdminShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminAuthForm } from "@/app/admin/AdminAuthForm";
import { registerAdmin } from "@/app/admin/actions";
import { canRegisterAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Registro admin",
  description: "Creación de administradores de Yxane.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const allowed = await canRegisterAdmin();
  const adminCount = await prisma.adminUser.count();

  if (!allowed) {
    redirect("/admin/login");
  }

  return (
    <section className="container-page grid min-h-[calc(100vh-4rem)] items-center py-14">
      <div className="mx-auto w-full max-w-md rounded-lg border border-yxane-line bg-white/85 p-8 shadow-ambient">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
          Administración
        </p>
        <h1 className="mt-3 font-serif text-4xl text-yxane-ink">
          Crear administrador
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          {adminCount === 0
            ? "Crea el primer administrador. Después de esto, solo un admin autenticado podrá crear otros admins."
            : "Solo los administradores autenticados pueden crear otros administradores."}
        </p>

        <div className="mt-8">
          <AdminAuthForm action={registerAdmin} mode="register" />
        </div>

        <Link
          href="/admin/login"
          className="focus-ring mt-5 inline-flex rounded text-sm font-semibold text-yxane-ink"
        >
          Volver al login
        </Link>
      </div>
    </section>
  );
}

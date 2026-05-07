import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminAuthForm } from "@/app/admin/AdminAuthForm";
import { loginAdmin } from "@/app/admin/actions";
import { canRegisterAdmin, getCurrentAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin",
  description: "Acceso administrativo de Yxane.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect("/admin/pedidos");
  }

  const showRegisterLink = await canRegisterAdmin();

  return (
    <section className="container-page grid min-h-[calc(100vh-4rem)] items-center py-14">
      <div className="mx-auto w-full max-w-md rounded-lg border border-yxane-line bg-white/85 p-8 shadow-ambient">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yxane-mauve">
          Administración
        </p>
        <h1 className="mt-3 font-serif text-4xl text-yxane-ink">
          Iniciar sesión
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          Acceso exclusivo para administradores del catálogo.
        </p>

        <div className="mt-8">
          <AdminAuthForm action={loginAdmin} mode="login" />
        </div>

        {showRegisterLink && (
          <Link
            href="/admin/registro"
            className="focus-ring mt-5 inline-flex rounded text-sm font-semibold text-yxane-ink"
          >
            Crear administrador
          </Link>
        )}
      </div>
    </section>
  );
}

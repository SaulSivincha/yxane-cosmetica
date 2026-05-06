"use client";

import { useActionState } from "react";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import type { AdminFormState } from "./actions";

type AdminAuthFormProps = {
  action: (
    state: AdminFormState,
    formData: FormData,
  ) => Promise<AdminFormState>;
  mode: "login" | "register";
};

export function AdminAuthForm({ action, mode }: AdminAuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const isRegister = mode === "register";

  return (
    <form action={formAction} className="grid gap-5">
      {isRegister && (
        <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
          Nombre
          <span className="relative">
            <UserRound
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              size={18}
            />
            <input
              name="name"
              autoComplete="name"
              className="focus-ring h-12 w-full rounded-lg border border-yxane-line bg-white pl-10 pr-3 text-stone-700"
              required
            />
          </span>
        </label>
      )}

      <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
        Email
        <span className="relative">
          <Mail
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            size={18}
          />
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="focus-ring h-12 w-full rounded-lg border border-yxane-line bg-white pl-10 pr-3 text-stone-700"
            required
          />
        </span>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-yxane-ink">
        Contraseña
        <span className="relative">
          <LockKeyhole
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            size={18}
          />
          <input
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={isRegister ? 8 : undefined}
            className="focus-ring h-12 w-full rounded-lg border border-yxane-line bg-white pl-10 pr-3 text-stone-700"
            required
          />
        </span>
      </label>

      {state.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="focus-ring inline-flex h-12 items-center justify-center rounded-lg border border-yxane-ink bg-yxane-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-yxane-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending
          ? "Procesando..."
          : isRegister
            ? "Crear administrador"
            : "Ingresar"}
      </button>
    </form>
  );
}

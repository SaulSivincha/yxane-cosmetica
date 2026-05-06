"use server";

import { redirect } from "next/navigation";
import {
  canRegisterAdmin,
  clearAdminSession,
  createAdminSession,
  hashPassword,
  verifyPassword,
} from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export type AdminFormState = {
  error?: string;
};

function readField(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export async function loginAdmin(
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const email = readField(formData, "email").toLowerCase();
  const password = readField(formData, "password");

  if (!email || !password) {
    return { error: "Ingresa email y contraseña." };
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return { error: "Credenciales inválidas." };
  }

  await createAdminSession(admin.id);
  redirect("/admin/productos");
}

export async function registerAdmin(
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const allowed = await canRegisterAdmin();

  if (!allowed) {
    return { error: "Solo un administrador autenticado puede crear admins." };
  }

  const name = readField(formData, "name");
  const email = readField(formData, "email").toLowerCase();
  const password = readField(formData, "password");

  if (!name || !email || !password) {
    return { error: "Completa nombre, email y contraseña." };
  }

  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }

  try {
    const admin = await prisma.adminUser.create({
      data: {
        name,
        email,
        passwordHash: hashPassword(password),
      },
    });

    await createAdminSession(admin.id);
  } catch {
    return { error: "No se pudo crear el admin. Revisa si el email ya existe." };
  }

  redirect("/admin/productos");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function ordersRedirect(error?: string) {
  const path = error
    ? `/admin/pedidos?error=${encodeURIComponent(error)}`
    : "/admin/pedidos";

  redirect(path);
}

export async function approveOrder(formData: FormData) {
  await requireAdmin();

  const id = readString(formData, "id");

  if (!id) {
    ordersRedirect("Pedido inválido.");
  }

  try {
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!order) {
        throw new Error("Pedido no encontrado.");
      }

      if (order.status !== "PENDING") {
        throw new Error("Este pedido ya fue revisado.");
      }

      const stockByProduct = new Map<string, number | null>();

      for (const item of order.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { id: true, title: true, stock: true },
        });

        if (!product) {
          throw new Error(`Producto no encontrado: ${item.title}.`);
        }

        if (product.stock !== null && product.stock < item.quantity) {
          throw new Error(`Stock insuficiente para ${product.title}.`);
        }

        stockByProduct.set(product.id, product.stock);
      }

      for (const item of order.items) {
        if (stockByProduct.get(item.productId) === null) {
          continue;
        }

        const result = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity },
          },
          data: {
            stock: { decrement: item.quantity },
          },
        });

        if (result.count !== 1) {
          throw new Error(`Stock insuficiente para ${item.title}.`);
        }
      }

      await tx.order.update({
        where: { id },
        data: {
          status: "APPROVED",
          approvedAt: new Date(),
        },
      });
    });
  } catch (error) {
    ordersRedirect(
      error instanceof Error ? error.message : "No se pudo aprobar el pedido.",
    );
  }

  revalidatePath("/admin/pedidos");
  revalidatePath("/admin/productos");
  revalidatePath("/");
  revalidatePath("/compra");
  ordersRedirect();
}

export async function rejectOrder(formData: FormData) {
  await requireAdmin();

  const id = readString(formData, "id");

  if (!id) {
    ordersRedirect("Pedido inválido.");
  }

  await prisma.order.update({
    where: { id },
    data: {
      status: "REJECTED",
      rejectedAt: new Date(),
    },
  });

  revalidatePath("/admin/pedidos");
  ordersRedirect();
}

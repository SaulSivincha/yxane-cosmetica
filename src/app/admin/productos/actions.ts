"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { uploadProductImage } from "@/lib/supabase/admin";

export type ProductFormState = {
  error?: string;
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function readOptionalString(formData: FormData, key: string) {
  const value = readString(formData, key);

  return value || null;
}

function readBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function readNumber(formData: FormData, key: string) {
  const value = readString(formData, key);

  if (!value) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function readDecimal(formData: FormData, key: string) {
  const value = readString(formData, key);

  if (!value) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? value : null;
}

function readList(formData: FormData, key: string) {
  return readString(formData, key)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getImageFile(formData: FormData) {
  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo debe ser una imagen.");
  }

  if (file.size > 1024 * 1024 * 5) {
    throw new Error("La imagen no debe superar 5 MB.");
  }

  return file;
}

async function readProductInput(formData: FormData, currentImageUrl?: string) {
  const title = readString(formData, "title");
  const slug = slugify(readString(formData, "slug") || title);
  const category = readString(formData, "category");
  const description = readString(formData, "description");
  const price = readDecimal(formData, "price");
  const compareAtPrice = readDecimal(formData, "compareAtPrice");
  const stock = readNumber(formData, "stock");
  const sortOrder = readNumber(formData, "sortOrder") ?? 0;
  const imageUrlFromForm = readString(formData, "imageUrl");

  if (!title || !slug || !category || !description || !price) {
    throw new Error("Completa título, categoría, descripción y precio.");
  }

  const imageFile = getImageFile(formData);
  const imageUrl = imageFile
    ? await uploadProductImage(imageFile, slug)
    : imageUrlFromForm || currentImageUrl;

  if (!imageUrl) {
    throw new Error("Sube una imagen o pega una URL de imagen.");
  }

  return {
    slug,
    title,
    category,
    presentation: readOptionalString(formData, "presentation"),
    description,
    price: new Prisma.Decimal(price),
    compareAtPrice: compareAtPrice ? new Prisma.Decimal(compareAtPrice) : null,
    imageUrl,
    skinNeeds: readList(formData, "skinNeeds"),
    tags: readList(formData, "tags"),
    isActive: readBoolean(formData, "isActive"),
    isVegan: readBoolean(formData, "isVegan"),
    stock,
    sortOrder,
  };
}

function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/compra");
  revalidatePath("/productos/[productId]", "page");
  revalidatePath("/admin");
  revalidatePath("/admin/productos");
}

export async function createProduct(
  _state: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  try {
    const data = await readProductInput(formData);

    await prisma.product.create({ data });
    revalidateCatalog();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo crear el producto.",
    };
  }

  redirect("/admin/productos");
}

export async function updateProduct(
  _state: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const id = readString(formData, "id");

  if (!id) {
    return { error: "Producto inválido." };
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { imageUrl: true },
    });

    if (!product) {
      return { error: "Producto no encontrado." };
    }

    const data = await readProductInput(formData, product.imageUrl);

    await prisma.product.update({
      where: { id },
      data,
    });
    revalidateCatalog();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el producto.",
    };
  }

  redirect("/admin/productos");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();

  const id = readString(formData, "id");

  if (id) {
    await prisma.product.delete({ where: { id } });
    revalidateCatalog();
  }

  redirect("/admin/productos");
}

export async function toggleProductStatus(formData: FormData) {
  await requireAdmin();

  const id = readString(formData, "id");
  const isActive = readBoolean(formData, "isActive");

  if (id) {
    await prisma.product.update({
      where: { id },
      data: { isActive },
    });
    revalidateCatalog();
  }

  redirect("/admin/productos");
}

import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type OrderRequestItem = {
  productId: string;
  quantity: number;
};

type OrderRequestBody = {
  customerName?: string;
  customerPhone?: string;
  customerDni?: string;
  customerEmail?: string;
  notes?: string;
  items?: OrderRequestItem[];
};

function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function makeOrderCode() {
  const date = new Date();
  const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `YX-${yyyymmdd}-${suffix}`;
}

function buildWhatsAppUrl({
  code,
  body,
  total,
  orderItems,
}: {
  code: string;
  body: OrderRequestBody;
  total: Prisma.Decimal;
  orderItems: {
    title: string;
    quantity: number;
    lineTotal: Prisma.Decimal;
  }[];
}) {
  const phone = (process.env.STORE_WHATSAPP_NUMBER || "51993166304").replace(
    /\D/g,
    "",
  );
  const productLines = orderItems.map(
    (item) =>
      `- ${item.quantity} x ${item.title}: S/ ${item.lineTotal.toFixed(2)}`,
  );
  const message = [
    `Hola, realicé un pedido en Yxané.`,
    ``,
    `Pedido: ${code}`,
    `Nombre: ${readText(body.customerName)}`,
    `Teléfono: ${readText(body.customerPhone)}`,
    `DNI: ${readText(body.customerDni)}`,
    `Email: ${readText(body.customerEmail) || "no indicado"}`,
    ``,
    `Productos:`,
    ...productLines,
    ``,
    `Total: S/ ${total.toFixed(2)}`,
    ``,
    `Captura de Yape:`,
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export async function POST(request: Request) {
  let body: OrderRequestBody;

  try {
    body = (await request.json()) as OrderRequestBody;
  } catch {
    return NextResponse.json(
      { error: "No se pudo leer el pedido." },
      { status: 400 },
    );
  }

  const customerName = readText(body.customerName);
  const customerPhone = readText(body.customerPhone);
  const customerDni = readText(body.customerDni);
  const customerEmail = readText(body.customerEmail) || null;
  const notes = readText(body.notes) || null;
  const items = Array.isArray(body.items) ? body.items : [];

  if (
    !customerName ||
    !customerPhone ||
    !customerDni ||
    !customerEmail
  ) {
    return NextResponse.json(
      { error: "Completa nombre, WhatsApp, DNI y email." },
      { status: 400 },
    );
  }

  const normalizedItems = items
    .map((item) => ({
      productId: readText(item.productId),
      quantity: Number(item.quantity),
    }))
    .filter((item) => item.productId && Number.isInteger(item.quantity));

  if (normalizedItems.length === 0) {
    return NextResponse.json(
      { error: "Agrega al menos un producto al pedido." },
      { status: 400 },
    );
  }

  if (normalizedItems.some((item) => item.quantity < 1 || item.quantity > 99)) {
    return NextResponse.json(
      { error: "La cantidad de productos no es válida." },
      { status: 400 },
    );
  }

  const quantityByProduct = new Map<string, number>();

  for (const item of normalizedItems) {
    quantityByProduct.set(
      item.productId,
      (quantityByProduct.get(item.productId) ?? 0) + item.quantity,
    );
  }

  const products = await prisma.product.findMany({
    where: {
      id: { in: [...quantityByProduct.keys()] },
      isActive: true,
    },
  });

  if (products.length !== quantityByProduct.size) {
    return NextResponse.json(
      { error: "Uno de los productos ya no está disponible." },
      { status: 400 },
    );
  }

  for (const product of products) {
    const quantity = quantityByProduct.get(product.id) ?? 0;

    if (product.stock !== null && product.stock < quantity) {
      return NextResponse.json(
        { error: `Stock insuficiente para ${product.title}.` },
        { status: 400 },
      );
    }
  }

  const subtotal = products.reduce((sum, product) => {
    const quantity = quantityByProduct.get(product.id) ?? 0;

    return sum.plus(product.price.mul(quantity));
  }, new Prisma.Decimal(0));
  const total = subtotal;
  const code = makeOrderCode();
  const orderItems = products.map((product) => {
    const quantity = quantityByProduct.get(product.id) ?? 0;

    return {
      productId: product.id,
      productSlug: product.slug,
      title: product.title,
      category: product.category,
      presentation: product.presentation,
      imageUrl: product.imageUrl,
      quantity,
      unitPrice: product.price,
      lineTotal: product.price.mul(quantity),
    };
  });

  const orderId = randomUUID();
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`
      INSERT INTO "Order" (
        "id",
        "code",
        "customerName",
        "customerPhone",
        "customerDni",
        "customerEmail",
        "notes",
        "yapeHolderName",
        "yapeOperation",
        "status",
        "subtotal",
        "total",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        ${orderId},
        ${code},
        ${customerName},
        ${customerPhone},
        ${customerDni},
        ${customerEmail},
        ${notes},
        ${customerName},
        ${null},
        'PENDING'::"OrderStatus",
        ${subtotal},
        ${total},
        ${now},
        ${now}
      )
    `;

    for (const item of orderItems) {
      await tx.$executeRaw`
        INSERT INTO "OrderItem" (
          "id",
          "orderId",
          "productId",
          "productSlug",
          "title",
          "category",
          "presentation",
          "imageUrl",
          "quantity",
          "unitPrice",
          "lineTotal"
        )
        VALUES (
          ${randomUUID()},
          ${orderId},
          ${item.productId},
          ${item.productSlug},
          ${item.title},
          ${item.category},
          ${item.presentation},
          ${item.imageUrl},
          ${item.quantity},
          ${item.unitPrice},
          ${item.lineTotal}
        )
      `;
    }
  });

  return NextResponse.json({
    orderCode: code,
    whatsappUrl: buildWhatsAppUrl({
      code,
      body,
      total,
      orderItems,
    }),
  });
}

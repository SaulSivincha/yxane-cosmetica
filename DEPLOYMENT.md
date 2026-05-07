# Despliegue

## Variables requeridas

Configura estas variables en el proveedor de despliegue:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
ADMIN_SESSION_SECRET="<valor-largo-aleatorio>"
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
SUPABASE_PRODUCT_IMAGES_BUCKET="product-images"
STORE_WHATSAPP_NUMBER="51993166304"
NEXT_PUBLIC_YAPE_NUMBER="993166304"
```

`STORE_WHATSAPP_NUMBER` debe ir en formato internacional sin `+`.

## Antes de publicar

Ejecuta:

```bash
pnpm install
pnpm prisma:deploy
pnpm build
```

## Seguridad admin

No publiques con una contraseña de prueba. Cambia la contraseña del administrador antes de abrir la tienda al público.

## Flujo de pedidos

Los pedidos entran como pendientes en `/admin/pedidos`. Al aprobar un pedido se valida stock y recién ahí se descuentan unidades. Si no hay stock suficiente, la aprobación falla sin modificar el pedido.

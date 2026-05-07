ALTER TABLE "Order" ADD COLUMN "customerDni" TEXT NOT NULL DEFAULT 'Sin DNI';

UPDATE "Order" SET "shipping" = 0;
UPDATE "Order" SET "total" = "subtotal";

ALTER TABLE "Order" ALTER COLUMN "customerDni" DROP DEFAULT;
ALTER TABLE "Order" DROP COLUMN "deliveryAddress";
ALTER TABLE "Order" DROP COLUMN "deliveryDistrict";
ALTER TABLE "Order" DROP COLUMN "deliveryCity";

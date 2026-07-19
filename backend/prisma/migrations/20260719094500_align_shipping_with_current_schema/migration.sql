-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'FAILED');

-- AlterTable
ALTER TABLE "Shipping"
ADD COLUMN "status" "ShippingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "street" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN "city" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN "state" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN "zipCode" VARCHAR(20) NOT NULL DEFAULT '',
ADD COLUMN "country" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN "estimatedDeliveryDate" TIMESTAMP(3),
ADD COLUMN "actualDeliveryDate" TIMESTAMP(3);

-- Preserve legacy delivery dates before removing superseded columns.
UPDATE "Shipping"
SET
  "estimatedDeliveryDate" = "estimatedDate",
  "actualDeliveryDate" = "actualDate";

ALTER TABLE "Shipping"
ALTER COLUMN "street" DROP DEFAULT,
ALTER COLUMN "city" DROP DEFAULT,
ALTER COLUMN "state" DROP DEFAULT,
ALTER COLUMN "zipCode" DROP DEFAULT,
ALTER COLUMN "country" DROP DEFAULT,
DROP COLUMN "method",
DROP COLUMN "cost",
DROP COLUMN "estimatedDate",
DROP COLUMN "actualDate";

-- CreateIndex
CREATE INDEX "Shipping_status_idx" ON "Shipping"("status");

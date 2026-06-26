/*
  Warnings:

  - Made the column `status` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "has_sizes" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "has_types" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "payment_methods" DROP DEFAULT;

-- AlterTable
ALTER TABLE "site_config" ADD COLUMN     "atendimento1" TEXT NOT NULL DEFAULT 'Seg–Sex · 10h às 19h',
ADD COLUMN     "atendimento2" TEXT NOT NULL DEFAULT 'Sábado · 10h às 14h',
ADD COLUMN     "atendimento3" TEXT NOT NULL DEFAULT 'Resposta em até 30min',
ADD COLUMN     "store_name" TEXT NOT NULL DEFAULT 'Loja',
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "size_configs" ADD COLUMN     "chest" DECIMAL(5,2),
ADD COLUMN     "length" DECIMAL(5,2),
ADD COLUMN     "size_type_id" TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "size_guides" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "type_configs" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "size_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "size_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_size_types" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "size_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_size_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carousel_slides" (
    "id" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "cta" TEXT NOT NULL DEFAULT 'Ver catálogo',
    "cta_hash" TEXT NOT NULL DEFAULT 'catalogo',
    "image_url" TEXT,
    "image_opacity" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carousel_slides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "size_types_slug_key" ON "size_types"("slug");

-- CreateIndex
CREATE INDEX "size_types_is_active_idx" ON "size_types"("is_active");

-- CreateIndex
CREATE INDEX "size_types_order_idx" ON "size_types"("order");

-- CreateIndex
CREATE INDEX "category_size_types_category_id_idx" ON "category_size_types"("category_id");

-- CreateIndex
CREATE INDEX "category_size_types_size_type_id_idx" ON "category_size_types"("size_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_size_types_category_id_size_type_id_key" ON "category_size_types"("category_id", "size_type_id");

-- CreateIndex
CREATE INDEX "carousel_slides_is_active_idx" ON "carousel_slides"("is_active");

-- CreateIndex
CREATE INDEX "carousel_slides_order_idx" ON "carousel_slides"("order");

-- CreateIndex
CREATE INDEX "size_configs_size_type_id_idx" ON "size_configs"("size_type_id");

-- AddForeignKey
ALTER TABLE "size_configs" ADD CONSTRAINT "size_configs_size_type_id_fkey" FOREIGN KEY ("size_type_id") REFERENCES "size_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_size_types" ADD CONSTRAINT "category_size_types_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_size_types" ADD CONSTRAINT "category_size_types_size_type_id_fkey" FOREIGN KEY ("size_type_id") REFERENCES "size_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

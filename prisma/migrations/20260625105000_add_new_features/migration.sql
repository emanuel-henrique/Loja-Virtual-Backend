-- Add new columns to products table
ALTER TABLE "products" ADD COLUMN "status" TEXT DEFAULT 'in_stock';
ALTER TABLE "products" ADD COLUMN "quantity" INTEGER DEFAULT 0;
ALTER TABLE "products" ADD COLUMN "payment_methods" TEXT[] DEFAULT ARRAY['pix', 'credit_card'];
ALTER TABLE "products" ADD COLUMN "category_id" TEXT;
ALTER TABLE "products" ADD COLUMN "updated_at" TIMESTAMP(3);

-- Create categories table
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- Create unique index on categories slug
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- Create index on categories is_active
CREATE INDEX "categories_is_active_idx" ON "categories"("is_active");

-- Create index on categories order
CREATE INDEX "categories_order_idx" ON "categories"("order");

-- Add foreign key constraint to products
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create index on products category_id
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

-- Create index on products status
CREATE INDEX "products_status_idx" ON "products"("status");

-- Create size_configs table
CREATE TABLE "size_configs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "size_configs_pkey" PRIMARY KEY ("id")
);

-- Create unique index on size_configs value
CREATE UNIQUE INDEX "size_configs_value_key" ON "size_configs"("value");

-- Create index on size_configs is_active
CREATE INDEX "size_configs_is_active_idx" ON "size_configs"("is_active");

-- Create index on size_configs order
CREATE INDEX "size_configs_order_idx" ON "size_configs"("order");

-- Create size_guides table
CREATE TABLE "size_guides" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "chest" DECIMAL(5,2) NOT NULL,
    "length" DECIMAL(5,2) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "size_guides_pkey" PRIMARY KEY ("id")
);

-- Create index on size_guides is_active
CREATE INDEX "size_guides_is_active_idx" ON "size_guides"("is_active");

-- Create index on size_guides order
CREATE INDEX "size_guides_order_idx" ON "size_guides"("order");

-- Create type_configs table
CREATE TABLE "type_configs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "type_configs_pkey" PRIMARY KEY ("id")
);

-- Create unique index on type_configs value
CREATE UNIQUE INDEX "type_configs_value_key" ON "type_configs"("value");

-- Create index on type_configs is_active
CREATE INDEX "type_configs_is_active_idx" ON "type_configs"("is_active");

-- Create index on type_configs order
CREATE INDEX "type_configs_order_idx" ON "type_configs"("order");

-- Create site_config table
CREATE TABLE "site_config" (
    "id" TEXT NOT NULL,
    "primary_color" TEXT NOT NULL,
    "secondary_color" TEXT NOT NULL,
    "accent_color" TEXT NOT NULL,
    "logo_url" TEXT,
    "whatsapp_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_config_pkey" PRIMARY KEY ("id")
);

-- Insert default site config
INSERT INTO "site_config" ("id", "primary_color", "secondary_color", "accent_color", "whatsapp_number")
VALUES ('default', '#1a1a1a', '#ffffff', '#3b82f6', '5511999999999');

-- Insert default categories
INSERT INTO "categories" ("id", "name", "slug", "description", "order") VALUES
('cat-1', 'Clubes Europeus', 'clubes-europeus', 'Camisas de clubes europeus', 0),
('cat-2', 'Seleções', 'selecoes', 'Camisas de seleções nacionais', 1),
('cat-3', 'Corta-Ventos', 'corta-ventos', 'Corta-ventos e agasalhos', 2),
('cat-4', 'Nacionais', 'nacionais', 'Camisas de clubes nacionais', 3);

-- Insert default size configs
INSERT INTO "size_configs" ("id", "name", "value", "order") VALUES
('size-1', 'Pequeno', 'P', 0),
('size-2', 'Médio', 'M', 1),
('size-3', 'Grande', 'G', 2),
('size-4', 'Extra Grande', 'GG', 3),
('size-5', 'Extra Extra Grande', 'XGG', 4);

-- Insert default size guides
INSERT INTO "size_guides" ("id", "size", "chest", "length", "order") VALUES
('guide-1', 'P', 50.00, 70.00, 0),
('guide-2', 'M', 53.00, 73.00, 1),
('guide-3', 'G', 56.00, 75.00, 2),
('guide-4', 'GG', 59.00, 77.00, 3),
('guide-5', 'XGG', 62.00, 79.00, 4);

-- Insert default type configs
INSERT INTO "type_configs" ("id", "name", "value", "order") VALUES
('type-1', 'Torcedor', 'torcedor', 0),
('type-2', 'Jogador', 'jogador', 1),
('type-3', 'Retrô', 'retro', 2);

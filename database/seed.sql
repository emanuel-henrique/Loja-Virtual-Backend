-- Seed data for products and coupons
-- Run this in your Neon SQL Editor or via psql

-- First, check if columns exist and add them if needed
DO $$
BEGIN
    -- Add is_featured column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'is_featured'
    ) THEN
        ALTER TABLE products ADD COLUMN "is_featured" BOOLEAN DEFAULT false;
    END IF;

    -- Add badges column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'badges'
    ) THEN
        ALTER TABLE products ADD COLUMN badges TEXT[] DEFAULT ARRAY[]::TEXT[];
    END IF;

    -- Add types column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'types'
    ) THEN
        ALTER TABLE products ADD COLUMN types TEXT[] DEFAULT ARRAY[]::TEXT[];
    END IF;

    -- Add club column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'club'
    ) THEN
        ALTER TABLE products ADD COLUMN club TEXT;
    END IF;

    -- Add slug column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'slug'
    ) THEN
        ALTER TABLE products ADD COLUMN slug TEXT UNIQUE;
    END IF;

    -- Add type column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'type'
    ) THEN
        ALTER TABLE products ADD COLUMN type TEXT;
    END IF;

    -- Add discount_type column to coupons if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'coupons' AND column_name = 'discount_type'
    ) THEN
        ALTER TABLE coupons ADD COLUMN "discount_type" TEXT;
    END IF;

    -- Add discount_value column to coupons if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'coupons' AND column_name = 'discount_value'
    ) THEN
        ALTER TABLE coupons ADD COLUMN "discount_value" DECIMAL(10,2);
    END IF;

    -- Add rating column to products if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'rating'
    ) THEN
        ALTER TABLE products ADD COLUMN rating FLOAT DEFAULT 5.0;
    END IF;

    -- Add reviews column to products if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'reviews'
    ) THEN
        ALTER TABLE products ADD COLUMN reviews INTEGER DEFAULT 0;
    END IF;
END $$;

-- Insert sample products
INSERT INTO products (id, name, slug, club, description, price, "promotionalPrice", "image_url", category, type, types, sizes, "is_featured", badges, rating, reviews, "created_at") VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Camisa Real Madrid 24/25', 'camisa-real-madrid-24-25', 'Real Madrid', 'Camisa oficial do Real Madrid para temporada 24/25', 299.90, 249.90, 'https://placehold.co/400x400/FFFFFF/000000?text=Real+Madrid', 'clubes-europeus', 'torcedor', ARRAY['torcedor']::TEXT[], ARRAY['P', 'M', 'G', 'GG']::TEXT[], true, ARRAY['Mais Vendido']::TEXT[], 5.0, 128, NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'Camisa Brasil 2024', 'camisa-brasil-2024', 'Brasil', 'Camisa oficial da Seleção Brasileira', 349.90, NULL, 'https://placehold.co/400x400/00FF00/FFFFFF?text=Brasil+2024', 'selecoes', 'torcedor', ARRAY['torcedor']::TEXT[], ARRAY['P', 'M', 'G', 'GG']::TEXT[], true, ARRAY['Lançamento']::TEXT[], 5.0, 95, NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Camisa Messi Inter Miami', 'camisa-messi-inter-miami', 'Inter Miami', 'Camisa oficial do Inter Miami com número 10', 399.90, 299.90, 'https://placehold.co/400x400/FF0000/FFFFFF?text=Messi+10', 'nacionais', 'jogador', ARRAY['jogador']::TEXT[], ARRAY['M', 'G', 'GG']::TEXT[], false, ARRAY[]::TEXT[], 5.0, 67, NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', 'Camisa Barcelona Retro 1999', 'camisa-barcelona-retro-1999', 'Barcelona', 'Camisa retrô do Barcelona temporada 1999', 449.90, 399.90, 'https://placehold.co/400x400/0000FF/FF0000?text=Barcelona+1999', 'clubes-europeus', 'retro', ARRAY['retro']::TEXT[], ARRAY['M', 'G', 'GG']::TEXT[], true, ARRAY['Edição Limitada']::TEXT[], 5.0, 43, NOW()),
  ('550e8400-e29b-41d4-a716-446655440005', 'Corta-Vento Flamengo', 'corta-vento-flamengo', 'Flamengo', 'Corta-vento oficial do Flamengo', 149.90, 99.90, 'https://placehold.co/400x400/FF0000/000000?text=Flamengo', 'nacionais', 'torcedor', ARRAY['torcedor']::TEXT[], ARRAY['P', 'M', 'G']::TEXT[], false, ARRAY[]::TEXT[], 5.0, 31, NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample coupons
INSERT INTO coupons (id, code, "discount_type", "discount_value", active, "created_at") VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'BEMVINDO10', 'percentage', 10.00, true, NOW()),
  ('660e8400-e29b-41d4-a716-446655440002', 'PROMO20', 'percentage', 20.00, true, NOW()),
  ('660e8400-e29b-41d4-a716-446655440003', 'FRETE50', 'fixed', 50.00, true, NOW())
ON CONFLICT (id) DO NOTHING;

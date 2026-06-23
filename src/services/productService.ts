import { prisma } from '../config/database';
import { AppError } from '../middlewares/errorHandler';
import { Prisma } from '@prisma/client';

export interface Product {
  id: string;
  name: string;
  slug: string;
  club: string | null;
  description: string;
  price: number;
  promotional_price: number | null;
  image_url: string;
  category: string;
  type: string;
  types: string[];
  sizes: string[];
  is_featured: boolean;
  badges: string[];
  rating: number;
  reviews: number;
  created_at: string;
}

export interface CreateProductInput {
  name: string;
  slug?: string;
  club?: string | null;
  description: string;
  price: number;
  promotional_price?: number | null;
  image_url: string;
  category: string;
  type: string;
  types: string[];
  sizes: string[];
  is_featured?: boolean;
  badges?: string[];
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

export interface ProductQuery {
  category?: string;
  type?: string;
  size?: string;
  search?: string;
  sort_by?: 'price_asc' | 'price_desc' | 'created_at';
}

export class ProductService {
  async getAllProducts(filters: ProductQuery = {}): Promise<Product[]> {
    const where: Prisma.ProductWhereInput = {};

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.size) {
      where.sizes = {
        has: filters.size,
      };
    }

    if (filters.search) {
      where.name = {
        contains: filters.search,
        mode: 'insensitive',
      };
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput;
    switch (filters.sort_by) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      default:
        orderBy = { isFeatured: 'desc' };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      club: p.club,
      description: p.description,
      price: Number(p.price),
      promotional_price: p.promotionalPrice ? Number(p.promotionalPrice) : null,
      image_url: p.imageUrl,
      category: p.category,
      type: p.type,
      types: p.types,
      sizes: p.sizes,
      is_featured: p.isFeatured,
      badges: p.badges,
      rating: p.rating,
      reviews: p.reviews,
      created_at: p.createdAt.toISOString(),
    }));
  }

  async getProductById(id: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      club: product.club,
      description: product.description,
      price: Number(product.price),
      promotional_price: product.promotionalPrice ? Number(product.promotionalPrice) : null,
      image_url: product.imageUrl,
      category: product.category,
      type: product.type,
      types: product.types,
      sizes: product.sizes,
      is_featured: product.isFeatured,
      badges: product.badges,
      rating: product.rating,
      reviews: product.reviews,
      created_at: product.createdAt.toISOString(),
    };
  }

  async createProduct(input: CreateProductInput): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name: input.name,
        slug: input.slug || input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        club: input.club || null,
        description: input.description,
        price: input.price,
        promotionalPrice: input.promotional_price || null,
        imageUrl: input.image_url,
        category: input.category,
        type: input.type,
        types: input.types,
        sizes: input.sizes,
        isFeatured: input.is_featured || false,
        badges: input.badges || [],
      },
    });

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      club: product.club,
      description: product.description,
      price: Number(product.price),
      promotional_price: product.promotionalPrice ? Number(product.promotionalPrice) : null,
      image_url: product.imageUrl,
      category: product.category,
      type: product.type,
      types: product.types,
      sizes: product.sizes,
      is_featured: product.isFeatured,
      badges: product.badges,
      rating: product.rating,
      reviews: product.reviews,
      created_at: product.createdAt.toISOString(),
    };
  }

  async updateProduct(id: string, input: UpdateProductInput): Promise<Product> {
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.price !== undefined && { price: input.price }),
        ...(input.promotional_price !== undefined && { promotionalPrice: input.promotional_price }),
        ...(input.image_url !== undefined && { imageUrl: input.image_url }),
        ...(input.category !== undefined && { category: input.category }),
        ...(input.type !== undefined && { type: input.type }),
        ...(input.sizes !== undefined && { sizes: input.sizes }),
        ...(input.is_featured !== undefined && { isFeatured: input.is_featured }),
      },
    });

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      club: product.club,
      description: product.description,
      price: Number(product.price),
      promotional_price: product.promotionalPrice ? Number(product.promotionalPrice) : null,
      image_url: product.imageUrl,
      category: product.category,
      type: product.type,
      types: product.types,
      sizes: product.sizes,
      is_featured: product.isFeatured,
      badges: product.badges,
      rating: product.rating,
      reviews: product.reviews,
      created_at: product.createdAt.toISOString(),
    };
  }

  async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }
}

import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be >= 0'),
  promotional_price: z.number().min(0, 'Promotional price must be >= 0').optional().nullable(),
  image_url: z.string(),
  category: z.string().min(1, 'Category is required'),
  category_id: z.string().optional(),
  type: z.string().optional().default(''),
  types: z.array(z.string()).optional().default([]),
  sizes: z.array(z.string()).optional().default([]),
  status: z.enum(['in_stock', 'on_order', 'sold_out']).default('in_stock'),
  quantity: z.number().int().min(0).default(0),
  payment_methods: z.array(z.string()).default(['pix', 'credit_card', 'debit_card']),
  is_featured: z.boolean().default(false),
  badges: z.array(z.string()).default([]),
  club: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  category: z.string().optional(),
  category_id: z.string().optional(),
  type: z.string().optional(),
  size: z.string().optional(),
  status: z.enum(['in_stock', 'on_order', 'sold_out']).optional(),
  search: z.string().optional(),
  sort_by: z.enum(['price_asc', 'price_desc', 'created_at']).default('created_at'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;

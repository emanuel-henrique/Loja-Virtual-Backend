import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  promotional_price: z.number().positive('Promotional price must be positive').optional().nullable(),
  image_url: z.string().url('Image URL must be valid'),
  category: z.string().min(1, 'Category is required'),
  type: z.string().min(1, 'Type is required'),
  sizes: z.array(z.string()).min(1, 'At least one size is required'),
  is_featured: z.boolean().default(false),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  category: z.string().optional(),
  type: z.string().optional(),
  size: z.string().optional(),
  search: z.string().optional(),
  sort_by: z.enum(['price_asc', 'price_desc', 'created_at']).default('created_at'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;

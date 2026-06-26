import { z } from 'zod';

export const createSizeTypeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  slug: z.string().min(1, 'Slug is required').max(50),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export const updateSizeTypeSchema = createSizeTypeSchema.partial();

export type CreateSizeTypeInput = z.infer<typeof createSizeTypeSchema>;
export type UpdateSizeTypeInput = z.infer<typeof updateSizeTypeSchema>;

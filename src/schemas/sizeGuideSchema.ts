import { z } from 'zod';

export const createSizeGuideSchema = z.object({
  size: z.string().min(1, 'Size is required').max(50),
  chest: z.number().min(0, 'Chest must be >= 0'),
  length: z.number().min(0, 'Length must be >= 0'),
  is_active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export const updateSizeGuideSchema = createSizeGuideSchema.partial();

export type CreateSizeGuideInput = z.infer<typeof createSizeGuideSchema>;
export type UpdateSizeGuideInput = z.infer<typeof updateSizeGuideSchema>;

import { z } from 'zod';

export const createSizeConfigSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50).optional().default(''),
  value: z.string().min(1, 'Value is required').max(50),
  chest: z.number().optional(),
  length: z.number().optional(),
  is_active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export const updateSizeConfigSchema = createSizeConfigSchema.partial();

export type CreateSizeConfigInput = z.infer<typeof createSizeConfigSchema>;
export type UpdateSizeConfigInput = z.infer<typeof updateSizeConfigSchema>;

import { z } from 'zod';

export const createSizeConfigSchema = z.object({
  name: z.string().max(50).optional(),
  value: z.string().min(1, 'Value is required').max(50),
  chest: z.number().nullable().optional(),
  length: z.number().nullable().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export const updateSizeConfigSchema = createSizeConfigSchema.partial();

export type CreateSizeConfigInput = z.infer<typeof createSizeConfigSchema>;
export type UpdateSizeConfigInput = z.infer<typeof updateSizeConfigSchema>;

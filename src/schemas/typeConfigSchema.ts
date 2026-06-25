import { z } from 'zod';

export const createTypeConfigSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50).optional(),
  value: z.string().min(1, 'Value is required').max(50),
  is_active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export const updateTypeConfigSchema = createTypeConfigSchema.partial();

export type CreateTypeConfigInput = z.infer<typeof createTypeConfigSchema>;
export type UpdateTypeConfigInput = z.infer<typeof updateTypeConfigSchema>;

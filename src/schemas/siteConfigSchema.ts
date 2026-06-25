import { z } from 'zod';

export const createSiteConfigSchema = z.object({
  primary_color: z.string().min(1, 'Primary color is required').max(50),
  secondary_color: z.string().min(1, 'Secondary color is required').max(50),
  accent_color: z.string().min(1, 'Accent color is required').max(50),
  logo_url: z.string().optional().default(''),
  whatsapp_number: z.string().max(50).optional().default(''),
});

export const updateSiteConfigSchema = createSiteConfigSchema.partial();

export type CreateSiteConfigInput = z.infer<typeof createSiteConfigSchema>;
export type UpdateSiteConfigInput = z.infer<typeof updateSiteConfigSchema>;

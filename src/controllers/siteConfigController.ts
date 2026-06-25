import { Request, Response } from 'express';
import { SiteConfigService } from '../services/siteConfigService';
import { asyncHandler } from '../middlewares/errorHandler';

const siteConfigService = new SiteConfigService();

export const getSiteConfig = asyncHandler(async (req: Request, res: Response) => {
  const siteConfig = await siteConfigService.getSiteConfig();
  res.json(siteConfig);
});

export const updateSiteConfig = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const siteConfig = await siteConfigService.updateSiteConfig(id, req.body);
  res.json(siteConfig);
});

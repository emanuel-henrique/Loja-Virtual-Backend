import { Request, Response } from 'express';
import { SizeConfigService } from '../services/sizeConfigService';
import { asyncHandler } from '../middlewares/errorHandler';

const sizeConfigService = new SizeConfigService();

export const getSizeConfigs = asyncHandler(async (req: Request, res: Response) => {
  const sizeConfigs = await sizeConfigService.getAllSizeConfigs();
  res.json(sizeConfigs);
});

export const getSizeConfigById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const sizeConfig = await sizeConfigService.getSizeConfigById(id);
  if (!sizeConfig) {
    res.status(404).json({ error: 'Size config not found' });
    return;
  }
  res.json(sizeConfig);
});

export const createSizeConfig = asyncHandler(async (req: Request, res: Response) => {
  const sizeConfig = await sizeConfigService.createSizeConfig(req.body);
  res.status(201).json(sizeConfig);
});

export const updateSizeConfig = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const sizeConfig = await sizeConfigService.updateSizeConfig(id, req.body);
  res.json(sizeConfig);
});

export const deleteSizeConfig = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await sizeConfigService.deleteSizeConfig(id);
  res.status(204).send();
});

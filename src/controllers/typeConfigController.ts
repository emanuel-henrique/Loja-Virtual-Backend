import { Request, Response } from 'express';
import { TypeConfigService } from '../services/typeConfigService';
import { asyncHandler } from '../middlewares/errorHandler';

const typeConfigService = new TypeConfigService();

export const getTypeConfigs = asyncHandler(async (req: Request, res: Response) => {
  const typeConfigs = await typeConfigService.getAllTypeConfigs();
  res.json(typeConfigs);
});

export const getTypeConfigById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const typeConfig = await typeConfigService.getTypeConfigById(id);
  if (!typeConfig) {
    res.status(404).json({ error: 'Type config not found' });
    return;
  }
  res.json(typeConfig);
});

export const createTypeConfig = asyncHandler(async (req: Request, res: Response) => {
  const typeConfig = await typeConfigService.createTypeConfig(req.body);
  res.status(201).json(typeConfig);
});

export const updateTypeConfig = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const typeConfig = await typeConfigService.updateTypeConfig(id, req.body);
  res.json(typeConfig);
});

export const deleteTypeConfig = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await typeConfigService.deleteTypeConfig(id);
  res.status(204).send();
});

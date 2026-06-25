import { Request, Response } from 'express';
import { SizeGuideService } from '../services/sizeGuideService';
import { asyncHandler } from '../middlewares/errorHandler';

const sizeGuideService = new SizeGuideService();

export const getSizeGuides = asyncHandler(async (req: Request, res: Response) => {
  const sizeGuides = await sizeGuideService.getAllSizeGuides();
  res.json(sizeGuides);
});

export const getSizeGuideById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const sizeGuide = await sizeGuideService.getSizeGuideById(id);
  if (!sizeGuide) {
    res.status(404).json({ error: 'Size guide not found' });
    return;
  }
  res.json(sizeGuide);
});

export const createSizeGuide = asyncHandler(async (req: Request, res: Response) => {
  const sizeGuide = await sizeGuideService.createSizeGuide(req.body);
  res.status(201).json(sizeGuide);
});

export const updateSizeGuide = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const sizeGuide = await sizeGuideService.updateSizeGuide(id, req.body);
  res.json(sizeGuide);
});

export const deleteSizeGuide = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await sizeGuideService.deleteSizeGuide(id);
  res.status(204).send();
});

import { Request, Response } from 'express';
import { SizeTypeService } from '../services/sizeTypeService';
import { asyncHandler } from '../middlewares/errorHandler';

const sizeTypeService = new SizeTypeService();

export const getSizeTypes = asyncHandler(async (req: Request, res: Response) => {
  const sizeTypes = await sizeTypeService.getAllSizeTypes();
  res.json(sizeTypes);
});

export const getSizeTypeById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const sizeType = await sizeTypeService.getSizeTypeById(id);
  if (!sizeType) {
    res.status(404).json({ error: 'Size type not found' });
    return;
  }
  res.json(sizeType);
});

export const createSizeType = asyncHandler(async (req: Request, res: Response) => {
  const sizeType = await sizeTypeService.createSizeType(req.body);
  res.status(201).json(sizeType);
});

export const updateSizeType = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const sizeType = await sizeTypeService.updateSizeType(id, req.body);
  res.json(sizeType);
});

export const deleteSizeType = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await sizeTypeService.deleteSizeType(id);
  res.status(204).send();
});

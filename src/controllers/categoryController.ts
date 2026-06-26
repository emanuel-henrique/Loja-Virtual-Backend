import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';
import { asyncHandler } from '../middlewares/errorHandler';

const categoryService = new CategoryService();

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
});

export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await categoryService.getCategoryById(id);
  if (!category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }
  res.json(category);
});

export const getCategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const category = await categoryService.getCategoryBySlug(slug);
  if (!category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }
  res.json(category);
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await categoryService.updateCategory(id, req.body);
  res.json(category);
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await categoryService.deleteCategory(id);
  res.status(204).send();
});

export const addSizeTypeToCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { sizeTypeId } = req.body;
  const categorySizeType = await categoryService.addSizeTypeToCategory(id, sizeTypeId);
  res.status(201).json(categorySizeType);
});

export const removeSizeTypeFromCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const sizeTypeId = req.params.sizeTypeId as string;
  await categoryService.removeSizeTypeFromCategory(id, sizeTypeId);
  res.status(204).send();
});

export const updateCategorySizeTypes = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { sizeTypeIds } = req.body;
  await categoryService.updateCategorySizeTypes(id, sizeTypeIds);
  res.status(204).send();
});

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

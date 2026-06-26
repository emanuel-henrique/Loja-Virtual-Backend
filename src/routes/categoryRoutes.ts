import { Router } from 'express';
import {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  addSizeTypeToCategory,
  removeSizeTypeFromCategory,
  updateCategorySizeTypes,
} from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createCategorySchema, updateCategorySchema } from '../schemas/categorySchema';

const router = Router();

router.get('/', getCategories);
router.get('/id/:id', getCategoryById);
router.get('/slug/:slug', getCategoryBySlug);
router.post('/', authMiddleware, validate(createCategorySchema), createCategory);
router.put('/:id', authMiddleware, validate(updateCategorySchema), updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);
router.post('/:id/size-types', authMiddleware, addSizeTypeToCategory);
router.delete('/:id/size-types/:sizeTypeId', authMiddleware, removeSizeTypeFromCategory);
router.put('/:id/size-types', authMiddleware, updateCategorySizeTypes);

export default router;

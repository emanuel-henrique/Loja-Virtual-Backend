import { Router } from 'express';
import {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
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

export default router;

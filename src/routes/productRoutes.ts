import { Router } from 'express';
import {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createProductSchema, updateProductSchema, productQuerySchema } from '../schemas/productSchema';
import { validateQuery } from '../middlewares/validateMiddleware';

const router = Router();

// Public routes
router.get('/', validateQuery(productQuerySchema), getProducts);
router.get('/slug/:slug', getProductBySlug); // ← deve vir ANTES de /:id
router.get('/:id', getProductById);

// Admin routes (protected)
router.post('/', authMiddleware, validate(createProductSchema), createProduct);
router.put('/:id', authMiddleware, validate(updateProductSchema), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;

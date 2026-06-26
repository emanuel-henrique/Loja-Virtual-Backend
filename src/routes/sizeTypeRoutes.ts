import { Router } from 'express';
import {
  getSizeTypes,
  getSizeTypeById,
  createSizeType,
  updateSizeType,
  deleteSizeType,
} from '../controllers/sizeTypeController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createSizeTypeSchema, updateSizeTypeSchema } from '../schemas/sizeTypeSchema';

const router = Router();

router.get('/', getSizeTypes);
router.get('/:id', getSizeTypeById);
router.post('/', authMiddleware, validate(createSizeTypeSchema), createSizeType);
router.put('/:id', authMiddleware, validate(updateSizeTypeSchema), updateSizeType);
router.delete('/:id', authMiddleware, deleteSizeType);

export default router;

import { Router } from 'express';
import {
  getSizeGuides,
  getSizeGuideById,
  createSizeGuide,
  updateSizeGuide,
  deleteSizeGuide,
} from '../controllers/sizeGuideController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createSizeGuideSchema, updateSizeGuideSchema } from '../schemas/sizeGuideSchema';

const router = Router();

router.get('/', getSizeGuides);
router.get('/:id', getSizeGuideById);
router.post('/', authMiddleware, validate(createSizeGuideSchema), createSizeGuide);
router.put('/:id', authMiddleware, validate(updateSizeGuideSchema), updateSizeGuide);
router.delete('/:id', authMiddleware, deleteSizeGuide);

export default router;

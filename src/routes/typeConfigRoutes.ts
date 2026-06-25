import { Router } from 'express';
import {
  getTypeConfigs,
  getTypeConfigById,
  createTypeConfig,
  updateTypeConfig,
  deleteTypeConfig,
} from '../controllers/typeConfigController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createTypeConfigSchema, updateTypeConfigSchema } from '../schemas/typeConfigSchema';

const router = Router();

router.get('/', getTypeConfigs);
router.get('/:id', getTypeConfigById);
router.post('/', authMiddleware, validate(createTypeConfigSchema), createTypeConfig);
router.put('/:id', authMiddleware, validate(updateTypeConfigSchema), updateTypeConfig);
router.delete('/:id', authMiddleware, deleteTypeConfig);

export default router;

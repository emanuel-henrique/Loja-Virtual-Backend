import { Router } from 'express';
import {
  getSizeConfigs,
  getSizeConfigById,
  createSizeConfig,
  updateSizeConfig,
  deleteSizeConfig,
} from '../controllers/sizeConfigController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createSizeConfigSchema, updateSizeConfigSchema } from '../schemas/sizeConfigSchema';

const router = Router();

router.get('/', getSizeConfigs);
router.get('/:id', getSizeConfigById);
router.post('/', authMiddleware, validate(createSizeConfigSchema), createSizeConfig);
router.put('/:id', authMiddleware, validate(updateSizeConfigSchema), updateSizeConfig);
router.delete('/:id', authMiddleware, deleteSizeConfig);

export default router;

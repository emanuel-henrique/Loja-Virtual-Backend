import { Router } from 'express';
import {
  getSiteConfig,
  updateSiteConfig,
} from '../controllers/siteConfigController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { updateSiteConfigSchema } from '../schemas/siteConfigSchema';

const router = Router();

router.get('/', getSiteConfig);
router.put('/:id', authMiddleware, validate(updateSiteConfigSchema), updateSiteConfig);

export default router;

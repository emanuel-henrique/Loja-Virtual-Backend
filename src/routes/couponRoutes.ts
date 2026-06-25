import { Router } from 'express';
import {
  validateCoupon,
  createCoupon,
  deleteCoupon,
  getAllCoupons,
} from '../controllers/couponController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createCouponSchema, validateCouponSchema } from '../schemas/couponSchema';

const router = Router();

// Public routes
router.post('/validate', validate(validateCouponSchema), validateCoupon);

// Admin routes (protected)
router.get('/', authMiddleware, getAllCoupons);
router.post('/', authMiddleware, validate(createCouponSchema), createCoupon);
router.delete('/:id', authMiddleware, deleteCoupon);

export default router;

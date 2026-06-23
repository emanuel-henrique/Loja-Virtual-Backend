import { Request, Response } from 'express';
import { CouponService } from '../services/couponService';
import { asyncHandler } from '../middlewares/errorHandler';

const couponService = new CouponService();

export const validateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body as { code: string };
  const coupon = await couponService.validateCoupon(code);
  res.json({
    discount_type: coupon.discount_type,
    discount_value: coupon.discount_value,
  });
});

export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const coupon = await couponService.createCoupon(req.body);
  res.status(201).json(coupon);
});

export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await couponService.deleteCoupon(id);
  res.status(204).send();
});

export const getAllCoupons = asyncHandler(async (req: Request, res: Response) => {
  const coupons = await couponService.getAllCoupons();
  res.json(coupons);
});
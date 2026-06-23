import { prisma } from '../config/database';
import { AppError } from '../middlewares/errorHandler';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  active: boolean;
  created_at: string;
}

export interface CreateCouponInput {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  active?: boolean;
}

export class CouponService {
  async validateCoupon(code: string): Promise<Coupon> {
    const normalizedCode = code.trim().toUpperCase();

    const coupon = await prisma.coupon.findUnique({
      where: { code: normalizedCode },
    });

    if (!coupon || !coupon.active) {
      throw new AppError(404, 'Invalid or inactive coupon');
    }

    return {
      id: coupon.id,
      code: coupon.code,
      discount_type: coupon.discountType as 'percentage' | 'fixed',
      discount_value: Number(coupon.discountValue),
      active: coupon.active,
      created_at: coupon.createdAt.toISOString(),
    };
  }

  async createCoupon(input: CreateCouponInput): Promise<Coupon> {
    try {
      const coupon = await prisma.coupon.create({
        data: {
          code: input.code.toUpperCase(),
          discountType: input.discount_type,
          discountValue: input.discount_value,
          active: input.active !== undefined ? input.active : true,
        },
      });

      return {
        id: coupon.id,
        code: coupon.code,
        discount_type: coupon.discountType as 'percentage' | 'fixed',
        discount_value: Number(coupon.discountValue),
        active: coupon.active,
        created_at: coupon.createdAt.toISOString(),
      };
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AppError(400, 'Coupon code already exists');
        }
      }
      throw new AppError(500, 'Failed to create coupon');
    }
  }

  async deleteCoupon(id: string): Promise<void> {
    await prisma.coupon.delete({
      where: { id },
    });
  }

  async getAllCoupons(): Promise<Coupon[]> {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return coupons.map((c: any) => ({
      id: c.id,
      code: c.code,
      discount_type: c.discountType as 'percentage' | 'fixed',
      discount_value: Number(c.discountValue),
      active: c.active,
      created_at: c.createdAt.toISOString(),
    }));
  }
}

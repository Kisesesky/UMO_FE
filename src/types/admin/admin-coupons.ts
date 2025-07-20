// src/types/admin/admin-coupons.ts
export interface AdminCoupon {
  id: number;
  name: string;
  couponType: string;
  discount: number;
  isUsed: boolean;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCouponDto {
  name: string;
  couponType: string;
  discount: number;
  expiryDate: string;
}

export type UpdateCouponDto = Partial<CreateCouponDto>;

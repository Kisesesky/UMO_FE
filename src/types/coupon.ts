// src/types/coupon.ts
export interface Coupon {
  id: string;
  name: string;
  discount: string;
  expiryDate: string;
  isUsed: boolean;
}
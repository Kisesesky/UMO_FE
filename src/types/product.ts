// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  productType: 'PASS' | 'CATNIP_ITEM' | 'MD'; // 예시 타입
  currencyType: 'CHURU' | 'CATNIP' | 'REAL_MONEY'; // 예시 타입
  durationDays?: number; // 이용권일 경우 유효기간
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
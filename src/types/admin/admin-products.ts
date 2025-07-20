// src/types/admin/admin-products.ts
export interface AdminProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  productType: string;
  currencyType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  productType: string;
  currencyType: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

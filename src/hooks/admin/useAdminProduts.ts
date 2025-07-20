// src/hooks/admin/useAdminProduts.ts
import useSWR from 'swr';
import { AdminProductsService } from '@/services/admin/admin-products.service';
import { AdminProduct } from '@/types/admin/admin-products';

export function useAdminProducts() {
  const { data, error, mutate, isLoading } = useSWR<AdminProduct[]>('/admin/products', AdminProductsService.getAll);
  return { products: data, isLoading, error, refresh: mutate };
}

export function useAdminProductDetail(id: number | string) {
  const { data, error, mutate, isLoading } = useSWR<AdminProduct>(id ? `/admin/products/${id}` : null, () => AdminProductsService.getById(Number(id)));
  return { product: data, isLoading, error, refresh: mutate };
}

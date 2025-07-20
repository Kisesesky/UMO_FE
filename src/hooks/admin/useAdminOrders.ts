// src/hooks/admin/useAdminOrders.ts
import useSWR from 'swr';
import { AdminOrdersService } from '@/services/admin/admin-orders.service';
import { AdminOrder } from '@/types/admin/admin-orders';

export function useAdminOrders() {
  const { data, error, mutate, isLoading } = useSWR<AdminOrder[]>('/admin/orders', AdminOrdersService.getAll);
  return {
    orders: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useAdminOrderDetail(id: number | string) {
  const { data, error, mutate, isLoading } = useSWR<AdminOrder>(id ? `/admin/orders/${id}` : null, () => AdminOrdersService.getById(Number(id)));
  return { order: data, isLoading, error, refresh: mutate };
}

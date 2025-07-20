// src/hooks/admin/useAdminCoupons.ts
import useSWR from 'swr';
import { AdminCouponsService } from '@/services/admin/admin-coupons.service';
import { AdminCoupon } from '@/types/admin/admin-coupons';

export function useAdminCoupons() {
  const { data, error, mutate, isLoading } = useSWR<AdminCoupon[]>('/admin/coupons', AdminCouponsService.getAll);
  return { coupons: data, isLoading, error, refresh: mutate };
}

export function useAdminCouponDetail(id: number | string) {
  const { data, error, mutate, isLoading } = useSWR<AdminCoupon>(id ? `/admin/coupons/${id}` : null, () => AdminCouponsService.getById(Number(id)));
  return { coupon: data, isLoading, error, refresh: mutate };
}

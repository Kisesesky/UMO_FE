// src/app/admin/coupons/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { AdminCouponsService } from '@/services/admin/admin-coupons.service';
import type { AdminCoupon } from '@/types/admin/admin-coupons';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import AdminCouponTable from '@/components/admin/AdminCouponTable';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);

  useEffect(() => {
    AdminCouponsService.getAll().then(setCoupons);
  }, []);

  return (
    <ProtectedAdminRoute>
      <h1>쿠폰 관리</h1>
      <button>신규 쿠폰 발급</button>
      <AdminCouponTable coupons={coupons} />
    </ProtectedAdminRoute>
  );
}

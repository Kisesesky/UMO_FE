// src/app/admin/coupons/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { AdminCouponsService } from '@/services/admin/admin-coupons.service';
import type { AdminCoupon } from '@/types/admin/admin-coupons';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import AdminCouponTable from '@/components/admin/AdminCouponTable';
import { FaPlus } from 'react-icons/fa';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    AdminCouponsService.getAll()
      .then(setCoupons)
      .catch(() => setError('쿠폰 조회에 실패했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  const handleNewCoupon = () => {
    // 신규 쿠폰 발급/폼 열기 등 로직 구현
    alert('신규 쿠폰 발급 폼 오픈!');
  };

  return (
    <ProtectedAdminRoute>
      <section className="max-w-5xl mx-auto py-8 px-4">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">쿠폰 관리</h1>
          <button
            onClick={handleNewCoupon}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors"
          >
            <FaPlus className="mr-2" /> 신규 쿠폰 발급
          </button>
        </header>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12 text-gray-500">
            로딩 중...
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <AdminCouponTable coupons={coupons} />
            {coupons.length === 0 && (
              <div className="py-10 text-center text-gray-400">
                등록된 쿠폰이 없습니다.
              </div>
            )}
          </div>
        )}
      </section>
    </ProtectedAdminRoute>
  );
}

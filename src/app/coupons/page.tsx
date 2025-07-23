// src/app/coupons/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaGift, FaPlus, FaTicketAlt } from 'react-icons/fa';
import { useState } from 'react';
import { Coupon } from '@/types/coupon';

export default function CouponsPage() {
  const router = useRouter();

  // 임시 데이터 (앞으로 API로 교체)
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: '1', name: '신규 가입 할인', discount: '3,000원 할인', expiryDate: '2025-12-31', isUsed: false },
    { id: '2', name: '우천 시 특별 할인', discount: '50% 할인', expiryDate: '2025-08-31', isUsed: false },
    { id: '3', name: '첫 대여 무료', discount: '100% 할인', expiryDate: '2025-07-31', isUsed: true }
  ]);
  const [couponCode, setCouponCode] = useState('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim() === '') return;
    alert(`쿠폰 코드 ${couponCode}가 등록되었습니다.`);
    setCouponCode('');
  };

  return (
    <ProtectedRoute>
      <div className="app-container flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-2 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="뒤로"
          >
            <FaArrowLeft size={18} className="text-gray-700 dark:text-white" />
          </button>
          <h1 className="flex-1 text-lg font-semibold text-gray-800 dark:text-white text-center pr-8">쿠폰</h1>
        </header>
        <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-10 overflow-y-auto">
          <div className="w-full max-w-sm mb-6">
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-6 mb-4">
              <form onSubmit={handleAddCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="쿠폰 코드 입력"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md font-semibold flex items-center gap-1 shadow hover:bg-primary-700 transition"
                >
                  <FaPlus /> 등록
                </button>
              </form>
            </div>

            {coupons.length === 0 ? (
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-6 text-center text-gray-500 dark:text-gray-300">
                <FaGift className="mx-auto text-4xl mb-3 text-gray-400 dark:text-gray-300" />
                <p>사용 가능한 쿠폰이 없습니다.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">내 쿠폰 목록</h3>
                </div>
                <ul>
                  {coupons.map(coupon => (
                    <li key={coupon.id} className="border-b last:border-b-0">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-600 dark:text-gray-300">{coupon.name}</h4>
                          {coupon.isUsed ? (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">사용 완료</span>
                          ) : (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">사용 가능</span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 mb-1">
                          <FaTicketAlt className="mr-1 text-indigo-500" />
                          <span>{coupon.discount}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">
                          {coupon.isUsed
                            ? '사용 완료'
                            : `${coupon.expiryDate}까지 사용 가능`}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

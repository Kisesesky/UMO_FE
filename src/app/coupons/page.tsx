// src/app/coupons/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaGift, FaPlus, FaTicketAlt } from 'react-icons/fa';
import { useState } from 'react';
import { Coupon } from '@/types/coupon';

export default function CouponsPage() {
  const router = useRouter();
  
  // 임시 데이터 (나중에 API로 대체)
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      name: '신규 가입 할인',
      discount: '3,000원 할인',
      expiryDate: '2025-12-31',
      isUsed: false
    },
    {
      id: '2',
      name: '우천 시 특별 할인',
      discount: '50% 할인',
      expiryDate: '2025-08-31',
      isUsed: false
    },
    {
      id: '3',
      name: '첫 대여 무료',
      discount: '100% 할인',
      expiryDate: '2025-07-31',
      isUsed: true
    }
  ]);
  
  const [couponCode, setCouponCode] = useState('');
  
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim() === '') return;
    
    // 여기에 쿠폰 등록 API 호출 로직 추가
    alert(`쿠폰 코드 ${couponCode}가 등록되었습니다.`);
    setCouponCode('');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4"
            >
              <FaArrowLeft />
            </button>
            <h1 className="header-title">쿠폰</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <form onSubmit={handleAddCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="쿠폰 코드 입력"
                className="flex-1 p-3 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-black text-white rounded-md flex items-center gap-1"
              >
                <FaPlus /> 등록
              </button>
            </form>
          </div>
          
          {coupons.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              <FaGift className="mx-auto text-4xl mb-3 text-gray-400" />
              <p>사용 가능한 쿠폰이 없습니다.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-medium">내 쿠폰 목록</h3>
              </div>
              <ul>
                {coupons.map(coupon => (
                  <li key={coupon.id} className="border-b last:border-b-0">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{coupon.name}</h4>
                        {coupon.isUsed ? (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">사용 완료</span>
                        ) : (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">사용 가능</span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <FaTicketAlt className="mr-1 text-indigo-500" />
                        <span>{coupon.discount}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {coupon.isUsed ? '사용 완료' : `${coupon.expiryDate}까지 사용 가능`}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

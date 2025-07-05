// src/app/wallet/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { useWalletStore } from '../../store/wallet.store';
import { useAuthStore } from '../../store/auth.store';
import PaymentButton from '../../components/payment/PaymentButton';

export default function WalletPage() {
  const router = useRouter();
  const { wallet, isLoading, error, fetchWallet, chargeChuru } = useWalletStore();
  const { user } = useAuthStore();
  const [chargeAmount, setChargeAmount] = useState<number>(0);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  const handleChargeChuru = async () => {
    if (chargeAmount <= 0) {
      alert('충전 금액을 입력해주세요.');
      return;
    }
    await chargeChuru(chargeAmount);
    setChargeAmount(0);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">내 지갑</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-indigo-600 hover:text-indigo-900"
            >
              대시보드로 돌아가기
            </button>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {user?.name}님의 지갑 정보
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      현재 보유 중인 츄르와 캣닢 잔액을 확인하세요.
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">츄르 잔액</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {wallet?.churuBalance} 츄르
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">캣닢 잔액</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {wallet?.catnipBalance} 캣닢
                        </dd>
                      </div>
                    </dl>
                  </div>
                  
                  {/* 츄르 충전 섹션 */}
                  <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      츄르 충전
                    </h3>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="0"
                        value={chargeAmount}
                        onChange={(e) => setChargeAmount(parseInt(e.target.value) || 0)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="충전할 금액 (원)"
                      />
                      <PaymentButton 
                        amount={chargeAmount} 
                        onSuccess={() => {
                          fetchWallet();
                          setChargeAmount(0);
                        }}
                        onFailure={(error) => console.error('결제 실패:', error)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      * 충전 금액에 따라 보너스 츄르가 지급됩니다.
                    </p>
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-900">보너스 지급 기준</h4>
                      <ul className="mt-2 text-sm text-gray-500 list-disc pl-5 space-y-1">
                        <li>50,000원 이상: 100% 보너스 (50,000원 → 10,000 츄르)</li>
                        <li>30,000원 이상: 70% 보너스 (30,000원 → 5,100 츄르)</li>
                        <li>10,000원 이상: 50% 보너스 (10,000원 → 1,500 츄르)</li>
                        <li>5,000원 이상: 30% 보너스 (5,000원 → 650 츄르)</li>
                        <li>3,000원 이상: 10% 보너스 (3,000원 → 330 츄르)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

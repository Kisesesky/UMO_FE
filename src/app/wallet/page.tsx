// src/app/wallet/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { useWalletStore } from '../../store/wallet.store';
import { useAuthStore } from '../../store/auth.store';
import PaymentButton from '../../components/payment/PaymentButton';
import { FaArrowLeft } from 'react-icons/fa';

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
      <div className="app-container flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* 상단 헤더 */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-2 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="뒤로"
          >
            <FaArrowLeft className="text-gray-700 dark:text-gray-300" size={18} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex-1 text-center pr-8">
            내 지갑
          </h1>
        </header>

        <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-10 overflow-y-auto justify-start">
          <div className="w-full max-w-sm mt-4">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
              </div>
            ) : error ? (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{user?.name}님의 지갑 정보</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    현재 보유 중인 츄르와 캣닢 잔액을 확인하세요.
                  </p>
                  <dl className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">츄르 잔액</dt>
                      <dd className="text-sm text-gray-900 dark:text-gray-100">{wallet?.churuBalance ?? '-'} 츄르</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">캣닢 잔액</dt>
                      <dd className="text-sm text-gray-900 dark:text-gray-100">{wallet?.catnipBalance ?? '-'} 캣닢</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">츄르 충전</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      value={chargeAmount}
                      onChange={(e) => setChargeAmount(parseInt(e.target.value) || 0)}
                      className="w-2/3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-gray-300 dark:border-gray-600 rounded-md text-right bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="충전할 금액 (원)"
                    />
                    <PaymentButton 
                      amount={chargeAmount} 
                      onSuccess={() => {
                        fetchWallet();
                        setChargeAmount(0);
                      }}
                      onFailure={(error) => alert('결제 실패: '+(error?.message || '에러'))}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    * 충전 금액에 따라 보너스 츄르가 지급됩니다.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">보너스 지급 기준</h4>
                  <ul className="mt-2 text-sm text-gray-500 dark:text-gray-300 list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium text-gray-800 dark:text-gray-100 block">50,000원 이상</span>
                    <span className="font-bold block mt-0.5">
                      100% 보너스 <span className="text-xs text-gray-500 dark:text-gray-300">(50,000원 → 10,000 츄르)</span>
                    </span>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800 dark:text-gray-100 block">30,000원 이상</span>
                    <span className="font-bold block mt-0.5">
                      70% 보너스 <span className="text-xs text-gray-500 dark:text-gray-300">(30,000원 → 5,100 츄르)</span>
                    </span>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800 dark:text-gray-100 block">10,000원 이상</span>
                    <span className="font-bold block mt-0.5">
                      50% 보너스 <span className="text-xs text-gray-500 dark:text-gray-300">(10,000원 → 1,500 츄르)</span>
                    </span>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800 dark:text-gray-100 block">5,000원 이상</span>
                    <span className="font-bold block mt-0.5">
                      30% 보너스 <span className="text-xs text-gray-500 dark:text-gray-300">(5,000원 → 650 츄르)</span>
                    </span>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800 dark:text-gray-100 block">3,000원 이상</span>
                    <span className="font-bold block mt-0.5">
                      10% 보너스 <span className="text-xs text-gray-500 dark:text-gray-300">(3,000원 → 330 츄르)</span>
                    </span>
                  </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// src/app/wallet/page.tsx
'use client';

import ModernScrollbar from '@/components/custom-scrollbar/ModernScrollbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import PaymentButton from '../../components/payment/PaymentButton';
import { useAuthStore } from '../../store/auth.store';
import { useWalletStore } from '../../store/wallet.store';

const amountPresets = [50000, 30000, 10000, 5000, 3000];


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
      <div className="app-container flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
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

        <main className="flex-1 w-full max-w-md mx-auto px-4 pt-6 pb-10 overflow-hidden">
          <ModernScrollbar className="h-full">
            <section className="min-h-full space-y-4">

              {/* 잔액 카드 */}
              <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {user?.name}님의 지갑
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  보유 중인 츄르와 캣닢 잔액
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-200">츄르</p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-200">{wallet?.churuBalance ?? 0} 츄르</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-200">캣닢</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-200">{wallet?.catnipBalance ?? 0} 캣닢</p>
                  </div>
                </div>
              </div>

              {/* 충전 UI */}
              <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">츄르 충전</h2>

                {/* Preset 버튼 */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {amountPresets.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setChargeAmount(amt)}
                      className={`px-3 py-2 rounded-lg font-medium transition
                        ${
                          chargeAmount === amt
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }
                      `}
                    >
                      {amt.toLocaleString()}원
                    </button>
                  ))}
                </div>

                {/* 직접 입력 */}
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="number"
                    min="0"
                    value={chargeAmount || ''}
                    onChange={(e) => setChargeAmount(parseInt(e.target.value) || 0)}
                    placeholder="직접 입력 (원)"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md bg-white dark:bg-gray-700 text-right h-8"
                  />
                  <PaymentButton 
                    amount={chargeAmount} 
                    onSuccess={() => {
                      fetchWallet();
                      setChargeAmount(0);
                    }}
                    onFailure={(error) => alert('결제 실패: ' + (error?.message || '에러'))}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  * 충전 금액에 따라 보너스 츄르가 지급됩니다.
                </p>
              </div>

              {/* 보너스 안내 */}
              <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">보너스 지급 기준</h3>
                <ul className="space-y-3">
                  {[
                    { threshold: 50000, bonus: '100%', example: '10,000 츄르' },
                    { threshold: 30000, bonus: '70%', example: '5,100 츄르' },
                    { threshold: 10000, bonus: '50%', example: '1,500 츄르' },
                    { threshold: 5000, bonus: '30%', example: '650 츄르' },
                    { threshold: 3000, bonus: '10%', example: '330 츄르' },
                  ].map(({ threshold, bonus, example }) => (
                    <li key={threshold} className="flex justify-between text-sm text-gray-700 dark:text-gray-200">
                      <span>{threshold.toLocaleString()}원 이상</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-300">{bonus} 보너스 ({example})</span>
                    </li>
                  ))}
                </ul>
              </div>

            </section>
          </ModernScrollbar>
        </main>
      </div>
    </ProtectedRoute>
  );
}

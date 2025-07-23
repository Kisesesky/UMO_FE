// src/app/payment-methods/add/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { useState } from 'react';

export default function AddPaymentMethodPage() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('결제 수단이 추가되었습니다.');
    router.push('/payment-methods');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2, 4)}` : v;
  };

  return (
    <ProtectedRoute>
      <div className="app-container flex flex-col min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-2 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="뒤로"
          >
            <FaArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="flex-1 text-lg font-semibold text-gray-800 text-center pr-8">
            결제 수단 추가
          </h1>
        </header>

        <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-10 overflow-y-auto">
          <div className="w-full max-w-md bg-white p-8 mt-2 rounded-xl shadow space-y-6">
            <div className="flex items-center gap-2">
              <FaCreditCard className="text-primary-600 text-2xl" />
              <h2 className="text-lg font-bold text-gray-900">카드 정보 입력</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">카드 번호</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                  autoComplete="cc-number"
                  inputMode="numeric"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">만료일</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={e => setExpiryDate(formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                    autoComplete="cc-exp"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="000"
                    maxLength={3}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">카드 소유자 이름</label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={e => setCardholderName(e.target.value)}
                  placeholder="카드에 표시된 이름"
                  required
                  autoComplete="cc-name"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="default"
                  checked={isDefault}
                  onChange={e => setIsDefault(e.target.checked)}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="default" className="text-sm text-gray-700 select-none">
                  기본 결제 수단으로 설정
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold shadow hover:bg-primary-700 transition"
              >
                카드 등록하기
              </button>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

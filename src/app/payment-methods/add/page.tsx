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
    // 여기에 결제 수단 추가 로직 구현 (API 호출 등)
    alert('결제 수단이 추가되었습니다.');
    router.push('/payment-methods');
  };

  // 카드 번호 포맷팅 (4자리마다 공백 추가)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // 만료일 포맷팅 (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
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

        <main className="flex-1 flex flex-col items-center px-6 pt-4 overflow-y-auto justify-start">
          <div className="w-full max-w-sm bg-white mt-2 mb-8 p-8 rounded-xl shadow space-y-8">
            <div className="flex items-center mb-4">
              <FaCreditCard className="text-primary-600 text-2xl mr-2" />
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
                  className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white focus:ring-primary-500 focus:border-primary-500"
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
                    className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white focus:ring-primary-500 focus:border-primary-500"
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
                    className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white focus:ring-primary-500 focus:border-primary-500"
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
                  className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white focus:ring-primary-500 focus:border-primary-500"
                  required
                  autoComplete="cc-name"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="default"
                  checked={isDefault}
                  onChange={e => setIsDefault(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="default" className="text-sm text-gray-700 select-none">기본 결제 수단으로 설정</label>
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

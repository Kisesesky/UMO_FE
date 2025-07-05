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
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4"
            >
              <FaArrowLeft />
            </button>
            <h1 className="header-title">결제 수단 추가</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <FaCreditCard className="text-2xl text-gray-700 mr-2" />
              <h2 className="text-lg font-medium">카드 정보 입력</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">카드 번호</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">만료일</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="000"
                    maxLength={3}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">카드 소유자 이름</label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="카드에 표시된 이름"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="default"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="default" className="text-sm text-gray-700">기본 결제 수단으로 설정</label>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg"
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

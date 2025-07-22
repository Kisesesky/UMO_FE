// src/app/payment-methods/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaCreditCard, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { PaymentMethod } from '@/types/payment';

export default function PaymentMethodsPage() {
  const router = useRouter();

  // 임시 데이터 (나중에 API로 대체)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: '신한카드',
      last4: '1234',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      name: '국민카드',
      last4: '5678',
      isDefault: false
    }
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 이 결제 수단을 삭제하시겠습니까?')) {
      setPaymentMethods(methods => methods.filter(method => method.id !== id));
    }
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
          <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center pr-8">결제 수단 관리</h1>
        </header>

        <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-10 overflow-y-auto">
          <div className="w-full max-w-sm">
            <button
              className="w-full py-3 mb-4 bg-primary-600 text-white rounded-lg flex items-center justify-center gap-2 font-semibold shadow transition hover:bg-primary-700"
              onClick={() => router.push('/payment-methods/add')}
            >
              <FaPlus /> 결제 수단 추가
            </button>

            {paymentMethods.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                <FaCreditCard className="mx-auto text-4xl mb-3 text-gray-400" />
                <p>등록된 결제 수단이 없습니다.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-medium">등록된 결제 수단</h3>
                </div>
                <ul>
                  {paymentMethods.map(method => (
                    <li key={method.id} className="border-b last:border-b-0">
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <FaCreditCard className="text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-500">•••• {method.last4}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {method.isDefault ? (
                            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">기본</span>
                          ) : (
                            <button
                              className="text-xs text-indigo-600 font-semibold"
                              onClick={() => handleSetDefault(method.id)}
                            >
                              기본으로 설정
                            </button>
                          )}
                          <button
                            className="text-red-500 hover:bg-red-50 p-1 rounded"
                            onClick={() => handleDelete(method.id)}
                            aria-label="삭제"
                          >
                            <FaTrash />
                          </button>
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

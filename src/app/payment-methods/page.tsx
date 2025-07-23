// src/app/payment-methods/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaCreditCard, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { PaymentMethod } from '@/types/payment';

export default function PaymentMethodsPage() {
  const router = useRouter();

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'card', name: '신한카드', last4: '1234', isDefault: true },
    { id: '2', type: 'card', name: '국민카드', last4: '5678', isDefault: false },
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id,
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
          <div className="w-full max-w-md">
            <button
              onClick={() => router.push('/payment-methods/add')}
              className="w-full py-3 mb-6 bg-primary-600 text-white rounded-lg flex items-center justify-center gap-2 font-semibold shadow hover:bg-primary-700 transition"
            >
              <FaPlus /> 결제 수단 추가
            </button>

            {paymentMethods.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                <FaCreditCard className="mx-auto text-4xl mb-3 text-gray-400" />
                <p>등록된 결제 수단이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div key={method.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FaCreditCard className="text-gray-500" />
                      <div>
                        <p className="font-semibold">{method.name}</p>
                        <p className="text-sm text-gray-500">•••• {method.last4}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault ? (
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">기본</span>
                      ) : (
                        <button
                          className="text-xs text-indigo-600 hover:underline font-medium"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          기본으로
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(method.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1 rounded"
                        aria-label="삭제"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

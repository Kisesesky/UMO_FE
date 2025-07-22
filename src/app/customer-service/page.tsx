// src/app/customer-service/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaHeadset } from 'react-icons/fa';

export default function CustomerServicePage() {
  const router = useRouter();

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
          <h1 className="flex-1 text-lg font-semibold text-gray-800 text-center pr-8">고객센터</h1>
        </header>
        <main className="flex-1 flex flex-col items-center px-6 pt-4 overflow-y-auto">
          <div className="w-full max-w-sm space-y-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <FaHeadset className="text-primary-600 text-3xl mr-2" />
                <h2 className="text-lg font-bold text-gray-900">무엇을 도와드릴까요?</h2>
              </div>
              <p className="text-gray-600 mb-4">
                평일 오전 9시부터 오후 6시까지 운영합니다.
              </p>
              <button className="w-full py-3 rounded-lg font-semibold shadow bg-primary-600 text-white hover:bg-primary-700 transition">
                1:1 문의하기
              </button>
            </div>
            <div className="bg-white rounded-xl shadow">
              <div className="p-4 border-b">
                <h3 className="font-medium">자주 묻는 질문</h3>
              </div>
              <ul>
                <li className="border-b last:border-b-0">
                  <button className="w-full p-4 text-left hover:bg-gray-50 rounded-md transition">
                    우산은 어떻게 대여하나요?
                  </button>
                </li>
                <li className="border-b last:border-b-0">
                  <button className="w-full p-4 text-left hover:bg-gray-50 rounded-md transition">
                    대여 요금은 어떻게 되나요?
                  </button>
                </li>
                <li className="border-b last:border-b-0">
                  <button className="w-full p-4 text-left hover:bg-gray-50 rounded-md transition">
                    우산을 분실했어요.
                  </button>
                </li>
                <li>
                  <button className="w-full p-4 text-left hover:bg-gray-50 rounded-md transition">
                    이용권은 어떻게 구매하나요?
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// src/app/customer-service/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaHeadset } from 'react-icons/fa';

export default function CustomerServicePage() {
  const router = useRouter();
  
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
            <h1 className="header-title">고객센터</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <div className="flex items-center mb-4">
              <FaHeadset className="text-2xl text-gray-700 mr-2" />
              <h2 className="text-lg font-medium">무엇을 도와드릴까요?</h2>
            </div>
            <p className="text-gray-600 mb-4">
              평일 오전 9시부터 오후 6시까지 운영합니다.
            </p>
            <button className="w-full py-3 bg-black text-white rounded-lg">
              1:1 문의하기
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">자주 묻는 질문</h3>
            </div>
            <ul>
              <li className="border-b">
                <button className="w-full p-4 text-left">
                  우산은 어떻게 대여하나요?
                </button>
              </li>
              <li className="border-b">
                <button className="w-full p-4 text-left">
                  대여 요금은 어떻게 되나요?
                </button>
              </li>
              <li className="border-b">
                <button className="w-full p-4 text-left">
                  우산을 분실했어요.
                </button>
              </li>
              <li>
                <button className="w-full p-4 text-left">
                  이용권은 어떻게 구매하나요?
                </button>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
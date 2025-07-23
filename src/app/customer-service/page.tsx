// src/app/customer-service/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaHeadset, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function CustomerServicePage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const faqItems = [
    {
      question: '우산은 어떻게 대여하나요?',
      answer: '앱에서 가까운 대여소를 확인하고, QR코드를 스캔하면 우산을 대여할 수 있어요.',
    },
    {
      question: '대여 요금은 어떻게 되나요?',
      answer: '기본 1시간은 무료이며, 이후에는 30분당 500원이 부과됩니다.',
    },
    {
      question: '우산을 분실했어요.',
      answer: '앱 내 고객센터를 통해 분실 신고를 해주세요. 상황에 따라 보상금이 청구될 수 있습니다.',
    },
    {
      question: '이용권은 어떻게 구매하나요?',
      answer: '마이페이지 > 이용권 메뉴에서 원하는 이용권을 선택해 구매할 수 있어요.',
    },
  ];

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

        <main className="flex-1 flex flex-col items-center px-6 py-6 overflow-y-auto">
          <div className="w-full max-w-md space-y-6">
            {/* 상담 박스 */}
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <div className="flex flex-col items-center mb-4">
                <FaHeadset className="text-indigo-600 text-4xl mb-2" />
                <h2 className="text-xl font-bold text-gray-900">무엇을 도와드릴까요?</h2>
                <p className="text-gray-600 mt-1 text-sm">운영시간: 평일 오전 9시 ~ 오후 6시</p>
              </div>
              <button className="mt-4 w-full py-3 rounded-lg font-semibold shadow bg-indigo-600 text-white hover:bg-indigo-700 transition">
                1:1 문의하기
              </button>
            </div>

            {/* FAQ 박스 */}
            <div className="bg-white rounded-2xl shadow">
              <div className="p-5 border-b">
                <h3 className="text-base font-semibold text-gray-800">자주 묻는 질문</h3>
              </div>
              <ul>
                {faqItems.map((item, index) => (
                  <li key={index} className="border-b last:border-b-0">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-50 text-left transition"
                    >
                      <span className="font-medium text-gray-800">{item.question}</span>
                      {openIndex === index ? (
                        <FaChevronUp className="text-gray-500" />
                      ) : (
                        <FaChevronDown className="text-gray-500" />
                      )}
                    </button>
                    {openIndex === index && (
                      <div className="px-5 pb-4 text-sm text-gray-600">
                        {item.answer}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// src/app/guide/slider/page.tsx
'use client';

import { GuideItem } from '@/types/guide';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  FaCreditCard, FaMapMarkerAlt, FaUmbrella
} from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

const guides: GuideItem[] = [
  {
    id: '1',
    title: '우산 대여 방법',
    icon: FaUmbrella,
    steps: [
      '앱에서 가까운 대여소를 찾으세요.',
      '대여소에서 대여 가능한 우산을 선택하세요.',
      '앱에서 대여 버튼을 눌러 우산을 대여합니다.',
      '우산 잠금 해제 후 사용하세요.',
    ],
    summary: '앱에서 가까운 대여소를 찾아 우산을 선택하고 대여 버튼을 눌러 간편하게 우산을 대여할 수 있습니다.',
  },
  {
    id: '2',
    title: '우산 반납 방법',
    icon: FaMapMarkerAlt,
    steps: [
      '앱에서 반납 가능한 대여소를 찾으세요.',
      '대여소에 우산을 반납합니다.',
      '앱에서 반납 버튼을 눌러 반납을 완료합니다.',
      '요금이 정산되고 보증금이 반환됩니다.',
    ],
    summary: '대여소에 우산을 반납하고 앱에서 반납 버튼을 누르면 요금 정산과 보증금 반환이 자동으로 이루어집니다.',
  },
  {
    id: '3',
    title: '결제 및 요금 안내',
    icon: FaCreditCard,
    steps: [
      '우모는 츄르를 사용하여 요금을 지불합니다.',
      '츄르는 지갑 페이지에서 충전할 수 있습니다.',
      '1일 대여료는 150 츄르, 보증금은 500 츄르입니다.',
      '이용권 구매 시 정해진 기간 동안 무제한으로 이용 가능합니다.',
    ],
    summary: '츄르로 요금을 지불하며, 1일 대여료는 150 츄르, 보증금은 500 츄르입니다. 이용권 구매 시 무제한 이용이 가능합니다.',
  },
];

export default function GuideSliderPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const totalPages = guides.length;

  // 닫기 버튼 클릭 시 홈으로 이동
  const handleClose = () => router.push('/');

  // 이전 페이지로 이동
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((idx) => idx - 1);
  };

  // 다음 페이지로 이동 또는 완료 시 홈으로 이동
  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex((idx) => idx + 1);
    } else {
      router.push('/');
    }
  };

  // 특정 점 클릭 시 해당 인덱스로 이동
  const handleDotClick = (index: number) => setCurrentIndex(index);

  // 터치 및 마우스 스와이프 핸들러 설정
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true, // 데스크탑 마우스 드래그도 지원
  });

  const currentGuide = guides[currentIndex];

  return (
    <div className="app-container flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div
        {...swipeHandlers}
        className="slide-card flex flex-col w-full max-w-xl h-full rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800"
        style={{ touchAction: 'pan-y' }} // 스와이프 시 수직 스크롤 방해 최소화
      >
        {/* 헤더: 닫기 버튼 */}
        <header className="flex justify-end p-4 shrink-0 border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handleClose}
            aria-label="닫기"
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition font-semibold text-sm"
          >
            닫기
          </button>
        </header>

        {/* 본문 콘텐츠 */}
        <main className="flex-grow overflow-auto px-6 pb-6 pt-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-20 flex items-center gap-3">
            {currentGuide.icon && (
              <span className="text-primary-600 dark:text-primary-400 text-3xl">
                {React.createElement(currentGuide.icon)}
              </span>
            )}
            {currentGuide.title}
          </h2>

          {/* 단계별 안내 */}
          <div className="space-y-10">
            {currentGuide.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-lg shadow-sm dark:bg-primary-900 dark:text-primary-300">
                  {idx + 1}
                </div>
                <p className="flex-grow text-gray-700 dark:text-gray-300 text-base leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </main>

        {/* 푸터: 페이지 점 표시 및 다음/완료 버튼 */}
        <footer className="py-6 px-6 flex flex-col items-center gap-4 shrink-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-md">
          {/* 인디케이터 점 */}
          <nav className="flex gap-3">
            {guides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`페이지 ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-primary-600 dark:bg-primary-400 w-5'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => handleDotClick(idx)}
              />
            ))}
          </nav>

          {/* 다음 / 완료 버튼 */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-primary-600 dark:bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 active:bg-primary-800 dark:active:bg-primary-700 transition shadow-button"
          >
            {currentIndex === totalPages - 1 ? '완료' : '다음'}
          </button>
        </footer>
      </div>
    </div>
  );
}
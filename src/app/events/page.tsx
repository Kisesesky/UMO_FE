// src/app/events/page.tsx
'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeft, FaCalendarAlt, FaGift } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { Event } from '@/types/event';
import EventCard from '@/components/events/page';

export default function EventsPage() {
  const router = useRouter();
  
  const [events] = useState<Event[]>([
    { 
      id: 'free-rental', 
      title: '첫 대여 무료 이벤트!', 
      period: '2025.07.01 ~ 2025.07.31', 
      imageUrl: '/assets/events/firstrental.png', 
      status: '진행중',
      description: '우모 서비스를 처음 이용하시는 분들에게 첫 대여를 무료로 제공합니다. 이벤트 기간 내 앱에서 대여하시면 자동으로 적용됩니다. 보증금은 정상적으로 결제되며 반납 시 전액 환불됩니다.'
    },
    { 
      id: 'return-challenge', 
      title: '우산 반납 챌린지', 
      period: '2025.06.01 ~ 2025.06.30', 
      imageUrl: '/assets/events/returnevent.png', 
      status: '종료',
      description: '우산을 빠른 시간 내에 반납하고 츄르 보너스를 받아가세요! 24시간 이내 반납 시 50 츄르, 12시간 이내 반납 시 100 츄르가 자동으로 지급됩니다.'
    },
    { 
      id: 'invite-friends', 
      title: '친구 초대 보너스', 
      period: '상시 진행', 
      imageUrl: '/assets/events/invite2.png', 
      status: '진행중',
      description: '친구를 초대하고 보너스 츄르를 받으세요! 초대한 친구가 회원가입 후 첫 대여를 완료하면 초대한 사람과 초대받은 사람 모두에게 300 츄르를 드립니다.'
    }
  ]);

  // 이벤트 카드 클릭 시 상세 페이지로 이동
  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  return (
    <ProtectedRoute checkAuth={false}>
      <div className="app-container flex flex-col bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
        <header className="page-header border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4">
          <button onClick={() => router.push('/')} className="page-back-button mr-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
            <FaArrowLeft size={18} />
          </button>
          <h1 className="page-header-title text-gray-900 dark:text-gray-100">이벤트</h1>
          <div className="w-10" />
        </header>

        <main className="page-main-content bg-white dark:bg-gray-800">
          {events.length === 0 ? (
            <div className="card-item p-8 text-center">
              <FaGift className="mx-auto text-4xl mb-3 text-gray-300 dark:text-gray-300" />
              <p className="text-gray-500 dark:text-gray-400">진행 중인 이벤트가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {events.map(event => (
                <EventCard key={event.id} event={event} onClick={handleEventClick} />
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

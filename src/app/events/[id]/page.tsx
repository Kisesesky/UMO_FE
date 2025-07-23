// src/app/events/[id]/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaGift } from 'react-icons/fa';
import { useState, useEffect } from 'react';

// 이벤트 데이터 타입
interface EventDetail {
  id: string;
  title: string;
  period: string;
  imageUrl: string;
  status: '진행중' | '종료';
  description: string;
  location?: string;
  howToParticipate?: string;
  rewards?: string;
  terms?: string[];
}

// 임시 이벤트 데이터 (실제로는 API에서 가져올 것)
const eventData: Record<string, EventDetail> = {
  'free-rental': {
    id: 'free-rental',
    title: '첫 대여 무료 이벤트!',
    period: '2025.07.01 ~ 2025.07.31',
    imageUrl: '/assets/events/firstrental.png',
    status: '진행중',
    description: '우모 서비스를 처음 이용하시는 분들에게 첫 대여를 무료로 제공합니다. 이벤트 기간 내 앱에서 대여하시면 자동으로 적용됩니다. 보증금은 정상적으로 결제되며 반납 시 전액 환불됩니다.',
    location: '전국 모든 우모 대여소',
    howToParticipate: '앱에서 회원가입 후 첫 대여 시 자동으로 적용됩니다. 별도의 쿠폰 입력이나 신청 절차가 필요하지 않습니다.',
    rewards: '첫 대여 시 대여료 100% 할인 (최대 24시간)',
    terms: [
      '본 이벤트는 신규 회원에 한해 1회만 적용됩니다.',
      '보증금은 정상 결제 후 반납 시 환불됩니다.',
      '24시간 이상 이용 시 초과 시간에 대한 요금은 정상 부과됩니다.',
      '이벤트 내용은 사전 고지 없이 변경될 수 있습니다.'
    ]
  },
  'return-challenge': {
    id: 'return-challenge',
    title: '우산 반납 챌린지',
    period: '2025.06.01 ~ 2025.06.30',
    imageUrl: '/assets/events/returnevent.png',
    status: '종료',
    description: '우산을 빠른 시간 내에 반납하고 츄르 보너스를 받아가세요! 24시간 이내 반납 시 50 츄르, 12시간 이내 반납 시 100 츄르가 자동으로 지급됩니다.',
    location: '전국 모든 우모 대여소',
    howToParticipate: '이벤트 기간 내 우산을 대여하고 지정된 시간 내에 반납하면 자동으로 보너스가 지급됩니다.',
    rewards: '24시간 이내 반납: 50 츄르 보너스\n12시간 이내 반납: 100 츄르 보너스',
    terms: [
      '본 이벤트는 이벤트 기간 내 대여한 우산에 한해 적용됩니다.',
      '보너스 츄르는 반납 완료 후 24시간 이내에 자동 지급됩니다.',
      '부정 이용이 확인될 경우 보너스 지급이 취소될 수 있습니다.',
      '이벤트 내용은 사전 고지 없이 변경될 수 있습니다.'
    ]
  },
  'invite-friends': {
    id: 'invite-friends',
    title: '친구 초대 보너스',
    period: '상시 진행',
    imageUrl: '/assets/events/invite2.png',
    status: '진행중',
    description: '친구를 초대하고 보너스 츄르를 받으세요! 초대한 친구가 회원가입 후 첫 대여를 완료하면 초대한 사람과 초대받은 사람 모두에게 300 츄르를 드립니다.',
    howToParticipate: '마이페이지 > 친구 초대하기 메뉴에서 초대 코드를 공유하세요. 친구가 회원가입 시 초대 코드를 입력하면 됩니다.',
    rewards: '초대한 사람: 300 츄르\n초대받은 사람: 300 츄르 + 첫 대여 무료',
    terms: [
      '초대받은 친구가 회원가입 후 30일 이내에 첫 대여를 완료해야 보너스가 지급됩니다.',
      '보너스 츄르는 친구의 첫 대여 완료 후 24시간 이내에 자동 지급됩니다.',
      '한 계정당 최대 10명까지 친구 초대 보너스를 받을 수 있습니다.',
      '부정 이용이 확인될 경우 보너스 지급이 취소될 수 있습니다.'
    ]
  }
};

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제로는 API 호출로 대체될 부분
    if (eventId && eventData[eventId]) {
      setEvent(eventData[eventId]);
    }
    setLoading(false);
  }, [eventId]);

  if (loading) {
    return (
      <div className="app-container flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-500">이벤트 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <ProtectedRoute checkAuth={false}>
        <div className="app-container flex flex-col">
          <header className="page-header">
            <button onClick={() => router.push('/events')} className="page-back-button">
              <FaArrowLeft size={18} />
            </button>
            <h1 className="page-header-title">이벤트</h1>
            <div className="w-10"></div>
          </header>
          
          <main className="page-main-content flex flex-col items-center justify-center">
            <FaGift className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500">존재하지 않는 이벤트입니다.</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md"
              onClick={() => router.push('/events')}
            >
              이벤트 목록으로 돌아가기
            </button>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute checkAuth={false}>
      <div className="app-container flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="page-header border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 p-4">
          <button onClick={() => router.push('/events')} className="page-back-button">
            <FaArrowLeft size={18} />
          </button>
          <h1 className="page-header-title text-gray-900 dark:text-gray-100">이벤트</h1>
          <div className="w-10"></div>
        </header>
        
        <main className="page-main-content bg-white dark:bg-gray-900">
          <div className="event-detail-container">
            {/* 이벤트 이미지 */}
            <div className="relative w-full h-48 md:h-64 overflow-hidden">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full pb-[56.25%] object-cover"
              />
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  event.status === '진행중' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {event.status}
                </span>
              </div>
            </div>
            
            {/* 이벤트 정보 */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{event.title}</h2>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-100 mb-4">
                <FaCalendarAlt className="mr-2 text-gray-400 dark:text-gray-600" />
                <span>{event.period}</span>
              </div>
              
              {event.location && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-100 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-gray-400 dark:text-gray-600" />
                  <span>{event.location}</span>
                </div>
              )}
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">이벤트 내용</h3>
                <p className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed">{event.description}</p>
              </div>
              
              {event.howToParticipate && (
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">참여 방법</h3>
                  <p className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed">{event.howToParticipate}</p>
                </div>
              )}
              
              {event.rewards && (
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">혜택</h3>
                  <p className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed whitespace-pre-line">{event.rewards}</p>
                </div>
              )}
              
              {event.terms && event.terms.length > 0 && (
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">유의사항</h3>
                  <ul className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed list-disc pl-5">
                    {event.terms.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {event.status === '진행중' && (
                <button className="w-full py-3 bg-primary-500 text-white rounded-lg font-medium mt-4 hover:bg-primary-600 transition-colors">
                  이벤트 참여하기
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

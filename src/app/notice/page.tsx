// src/app/notice/page.tsx
'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import NoticeCard from '@/components/notice/page';
import { Notice } from '@/types/notice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeft, FaBullhorn } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function NoticePage() {
  const router = useRouter();
  
  const [notices] = useState<Notice[]>([
    {
      id: '1',
      title: '서비스 오픈 안내',
      date: '2025-06-30',
      isNew: true,
      content: "안녕하세요, UMO 서비스팀입니다.\n고객 여러분의 많은 기대와 관심 속에 UMO 서비스가 공식적으로 오픈하였음을 알려드립니다.\n저희 UMO는 혁신적인 서비스와 차별화된 고객 경험을 제공하기 위해 오랜 기간 준비해왔으며, 앞으로도 고객님의 소중한 의견을 반영하여 지속적으로 발전하는 서비스가 되겠습니다.\n 다시 한번 많은 관심과 이용 부탁드립니다. 감사합니다.",
      description: "UMO 서비스가 공식적으로 오픈하였습니다. 많은 이용 부탁드립니다."
    },
    {
      id: '2',
      title: '7월 이벤트 안내',
      date: '2025-07-01',
      isNew: true, 
      content: "UMO 서비스 오픈을 기념하여, 7월 한 달간 신규 회원을 대상으로 첫 대여 시 50% 할인 혜택을 제공하는 특별 프로모션을 진행합니다.\n이번 이벤트는 더 많은 고객님께서 UMO의 서비스를 경험하실 수 있도록 마련된 기회입니다.\n자세한 참여 방법과 유의사항은 이벤트 페이지를 참고해주시기 바라며, 앞으로도 다양한 혜택으로 보답하는 UMO가 되겠습니다.",
      description: "7월 한 달간 신규 회원을 대상으로 첫 대여 시 50% 할인 혜택을 제공합니다."
    },
    { 
      id: '3', 
      title: '앱 업데이트 안내', 
      date: '2025-07-03', 
      isNew: true, 
      content: "UMO 앱이 v1.0.1로 업데이트되었습니다.\n이번 버전에서는 고객님들께서 제보해주신 주요 버그가 수정되었으며, 앱의 전반적인 안정성과 성능이 대폭 향상되었습니다.\n보다 쾌적하고 안정적인 서비스 이용을 위해 최신 버전으로 업데이트해주시기 바랍니다.\n앞으로도 지속적인 개선을 통해 최고의 서비스를 제공하겠습니다.",
      description: "UMO 앱이 v1.0.1로 업데이트되었습니다. 버그 수정 및 성능 향상."
    },
    { 
      id: '4', 
      title: '개인정보처리방침 변경 안내', 
      date: '2025-07-05', 
      isNew: true, 
      content: "UMO는 고객님의 개인정보 보호를 최우선으로 생각합니다.\n최근 개인정보처리방침 일부 내용이 개정되어 안내드립니다.\n변경된 주요 사항 및 세부 내용은 공지사항 및 홈페이지 내 ‘개인정보처리방침’ 페이지에서 확인하실 수 있습니다.\nUMO는 앞으로도 고객님의 개인정보를 안전하게 보호하기 위해 최선을 다하겠습니다.",
      description: "개인정보처리방침 일부 내용이 개정되어 안내드립니다."
    },
    { 
      id: '5', 
      title: '시스템 점검 안내', 
      date: '2025-07-01', 
      isNew: false, 
      content: "더욱 안정적이고 원활한 서비스 제공을 위해 아래와 같이 시스템 점검이 예정되어 있습니다.\n\n- 점검 일시: 2025년 7월 01일(화) 02:00~04:00\n- 점검 내용: 서버 안정화 및 성능 개선 작업\n\n점검 시간 동안 서비스 이용이 일시적으로 제한될 수 있으니, 고객님의 양해 부탁드립니다.\nUMO는 앞으로도 최고의 서비스 품질을 제공하기 위해 최선을 다하겠습니다.\n이용에 불편을 드려 죄송합니다.",
      description: "시스템 점검이 예정되어 있습니다. 서비스 이용이 일시적으로 제한될 수 있습니다."
    },
  ]);
  
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  
  const handleCardClick = (id: string) => {
    if (selectedNoticeId === id) {
      setSelectedNoticeId(null);
    } else {
      setSelectedNoticeId(id);
    }
  };

  return (
    <ProtectedRoute checkAuth={false}>
      {/* 다크모드 배경 및 텍스트 컬러 */}
      <div className="app-container flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <header className="page-header flex items-center border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={() => router.push('/')}
            className="page-back-button mr-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            <FaArrowLeft size={18} />
          </button>
          <h1 className="page-header-title text-xl font-semibold text-gray-900 dark:text-gray-100">공지사항</h1>
          <div className="flex-1" />
        </header>

        <main className="page-main-content flex-1 p-4 bg-white dark:bg-gray-900">
          {notices.length === 0 ? (
            <div className="card-item p-8 text-center">
              <FaBullhorn className="mx-auto text-4xl mb-3 text-gray-400 dark:text-gray-600" />
              <p className="text-gray-500 dark:text-gray-400">등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            notices.map(
              (notice) =>
                (selectedNoticeId === null || selectedNoticeId === notice.id) && (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    isExpanded={selectedNoticeId === notice.id}
                    onToggle={handleCardClick}
                  />
                )
            )
          )}
          {/* Tooltip에 다크 모드 커스텀 스타일 적용 */}
          <Tooltip
            id="notice-tooltip"
            place="top"
            className="tooltip-custom bg-gray-800 text-gray-100 border border-gray-700 shadow-lg"
            events={['hover']}
            delayHide={0}
            clickable={false}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
}

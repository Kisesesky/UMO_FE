// src/app/invite-friends/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaUserFriends, FaShare, FaCopy } from 'react-icons/fa';
import { useState } from 'react';

export default function InviteFriendsPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  
  // 임시 초대 코드 (실제로는 API에서 가져와야 함)
  const inviteCode = 'UMBRELLA2025';
  const inviteLink = `https://umo-app.com/invite/${inviteCode}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '우모 - 우산 대여 서비스',
          text: '우모 서비스에 가입하고 첫 대여 무료 쿠폰을 받아보세요!',
          url: inviteLink,
        });
      } catch (error) {
        console.error('공유하기 실패:', error);
      }
    } else {
      handleCopyLink();
    }
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
            <h1 className="header-title">친구 초대</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow p-6 mb-4 text-center">
            <FaUserFriends className="mx-auto text-5xl text-indigo-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">친구를 초대하고 혜택을 받으세요!</h2>
            <p className="text-gray-600 mb-6">
              친구가 가입하면 친구도, 나도 첫 대여 무료 쿠폰을 드려요.
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">초대 코드</p>
              <div className="flex items-center justify-center">
                <span className="text-xl font-bold tracking-wider">{inviteCode}</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(inviteCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="ml-2 text-indigo-600"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopyLink}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <FaCopy /> {copied ? '복사 완료!' : '초대 링크 복사하기'}
              </button>
              
              <button
                onClick={handleShare}
                className="w-full py-3 bg-black text-white rounded-lg flex items-center justify-center gap-2"
              >
                <FaShare /> 공유하기
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">초대 혜택</h3>
            </div>
            <ul className="p-4">
              <li className="flex items-start mb-3">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <p>친구에게 초대 코드나 링크를 공유하세요.</p>
              </li>
              <li className="flex items-start mb-3">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <p>친구가 회원가입 시 초대 코드를 입력하면 친구에게 첫 대여 무료 쿠폰이 지급됩니다.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <p>친구가 가입 완료하면 나에게도 첫 대여 무료 쿠폰이 지급됩니다.</p>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

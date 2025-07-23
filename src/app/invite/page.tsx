// src/app/invite/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaUserFriends, FaShare, FaCopy } from 'react-icons/fa';
import { useState } from 'react';
import Toast from '@/components/toast/Toast';

export default function InviteFriendsPage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inviteCode = 'UMBRELLA2025';
  const inviteLink = `https://eveyday-umo.site/invite/${inviteCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setToastMessage('초대 링크가 복사되었습니다!');
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode).then(() => {
      setToastMessage('초대 코드가 복사되었습니다!');
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
      } catch {
        setToastMessage('공유에 실패했습니다. 초대 링크를 복사했습니다.');
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <ProtectedRoute>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      <div className="app-container flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-3 flex items-center">
          <button
            onClick={() => router.back()}
            aria-label="뒤로"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaArrowLeft size={18} className="text-gray-700 dark:text-white" />
          </button>
          <h1 className="flex-1 text-lg font-semibold text-gray-800 dark:text-white text-center pr-8">
            친구 초대
          </h1>
        </header>

        {/* Main */}
        <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-10 overflow-y-auto">
          <div className="w-full max-w-sm mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-4 text-center">
              <FaUserFriends className="mx-auto text-5xl text-indigo-500 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                친구를 초대하고 혜택을 받으세요!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                친구가 가입하면 친구도, 나도 첫 대여 무료 쿠폰을 드려요.
              </p>

              {/* Invite Code */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">초대 코드</p>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold tracking-wider text-gray-800 dark:text-white">
                    {inviteCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    aria-label="초대 코드 복사"
                    className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 active:bg-indigo-800 transition"
                >
                  <FaCopy /> 초대 링크 복사하기
                </button>
                <button
                  onClick={handleShare}
                  className="w-full py-3 bg-black text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 active:bg-gray-950 transition"
                >
                  <FaShare /> 공유하기
                </button>
              </div>
            </div>

            {/* 혜택 안내 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white">초대 혜택</h3>
              </div>
              <ul className="p-4 text-sm text-gray-700 dark:text-gray-300">
                {[1, 2, 3].map((step, idx) => (
                  <li key={idx} className="flex items-start mb-3 last:mb-0">
                    <span className="bg-indigo-100 dark:bg-indigo-400 text-indigo-800 dark:text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 font-bold">
                      {step}
                    </span>
                    <p>
                      {[
                        '친구에게 초대 코드나 링크를 공유하세요.',
                        '친구가 회원가입 시 초대 코드를 입력하면 친구에게 첫 대여 무료 쿠폰이 지급됩니다.',
                        '친구가 가입 완료하면 나에게도 첫 대여 무료 쿠폰이 지급됩니다.',
                      ][idx]}
                    </p>
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

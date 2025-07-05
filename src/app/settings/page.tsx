// src/app/settings/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaCog, FaUser, FaLock, FaBell, FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    // 로그아웃 처리 로직 (useAuthStore의 logout 함수 호출 등)
    alert('로그아웃 되었습니다.');
    router.push('/login');
  };

  const handleDeleteAccount = () => {
    if (confirm('정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      // 계정 삭제 처리 로직 (API 호출 등)
      alert('계정이 삭제되었습니다.');
      router.push('/register'); // 또는 로그인 페이지
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
            <h1 className="header-title">설정</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
            <div className="p-4 border-b">
              <h3 className="font-medium">계정 설정</h3>
            </div>
            <ul>
              <li className="border-b last:border-b-0">
                <button className="w-full text-left p-4 flex items-center gap-3" onClick={() => router.push('/profile')}>
                  <FaUser className="text-gray-500" />
                  <span>프로필 편집</span>
                </button>
              </li>
              <li className="border-b last:border-b-0">
                <button className="w-full text-left p-4 flex items-center gap-3" onClick={() => router.push('/change-password')}>
                  <FaLock className="text-gray-500" />
                  <span>비밀번호 변경</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
            <div className="p-4 border-b">
              <h3 className="font-medium">알림 설정</h3>
            </div>
            <ul>
              <li className="border-b last:border-b-0">
                <div className="w-full text-left p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaBell className="text-gray-500" />
                    <span>푸시 알림</span>
                  </div>
                  <label htmlFor="toggle-notifications" className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="toggle-notifications"
                        className="sr-only"
                        checked={notificationsEnabled}
                        onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      />
                      <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${notificationsEnabled ? 'translate-x-full bg-indigo-600' : ''}`}></div>
                    </div>
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
            <div className="p-4 border-b">
              <h3 className="font-medium">앱 정보</h3>
            </div>
            <ul>
              <li className="border-b last:border-b-0">
                <button className="w-full text-left p-4 flex items-center gap-3" onClick={() => router.push('/about')}>
                  <FaInfoCircle className="text-gray-500" />
                  <span>앱 정보</span>
                </button>
              </li>
              <li className="border-b last:border-b-0">
                <div className="w-full text-left p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>버전 정보</span>
                  </div>
                  <span className="text-sm text-gray-500">1.0.0</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul>
              <li className="border-b last:border-b-0">
                <button className="w-full text-left p-4 text-red-500 font-medium" onClick={handleLogout}>
                  로그아웃
                </button>
              </li>
              <li className="border-b last:border-b-0">
                <button className="w-full text-left p-4 text-red-500 font-medium" onClick={handleDeleteAccount}>
                  계정 삭제
                </button>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
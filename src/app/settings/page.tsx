// src/app/settings/page.tsx
'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaUser, FaLock, FaBell, FaInfoCircle, FaSignOutAlt, FaTrashAlt, FaPalette } from 'react-icons/fa';
import { SettingsSection } from './components/SettingsSection';
import { SettingsItem } from './components/SettingsItem';
import { ThemeToggle } from './components/ThemeToggle';
import { NotificationToggle } from './components/NotificationToggle';
import { AuthService } from '@/services/auth.service';
import { userService } from '@/services/user.service';

const toast = {
  success: (message: string) => alert(message),
  error: (message: string) => alert(message)
};

export default function SettingsPage() {
  const router = useRouter();
  const [showAppInfo, setShowAppInfo] = useState(false);

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      try {
        await AuthService.logout();
        toast.success('로그아웃 되었습니다.');
        router.push('/login');
      } catch (error) {
        toast.error('로그아웃 실패');
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        await userService.deleteAccount();
        toast.success('계정이 삭제되었습니다.');
        router.push('/register');
      } catch (error) {
        toast.error('계정 삭제 실패');
      }
    }
  };

  const currentUserId = 'user123';

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        {/* 상단 헤더 */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-xl mx-auto flex items-center px-6 py-4">
            <button
              onClick={() => router.back()}
              className="mr-3 flex items-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 transition"
              aria-label="뒤로"
            >
              <FaArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">설정</h1>
          </div>
        </header>

        {/* 본문 (max-w-xl 제한) */}
        <main className="flex-1 max-w-xl w-full mx-auto px-4 py-8">
          <div className="space-y-7">
            <SettingsSection title="계정 설정">
              <SettingsItem
                icon={<FaUser />}
                label="프로필 편집"
                onClick={() => router.push('/profile')}
              />
              <SettingsItem
                icon={<FaLock />}
                label="비밀번호 변경"
                onClick={() => router.push('/change-password')}
              />
            </SettingsSection>

            <SettingsSection title="화면 설정">
              <SettingsItem icon={<FaPalette />} label="다크 모드" isButton={false}>
                <ThemeToggle />
              </SettingsItem>
            </SettingsSection>

            <SettingsSection title="알림 설정">
              <SettingsItem icon={<FaBell />} label="푸시 알림" isButton={false}>
                <NotificationToggle userId={currentUserId} />
              </SettingsItem>
            </SettingsSection>

            <SettingsSection title="앱 정보">
              <SettingsItem
                icon={<FaInfoCircle />}
                label="앱 정보"
                onClick={() => setShowAppInfo(true)}
              />
              <SettingsItem label="버전 정보" isButton={false}>
                <span className="text-xs text-gray-500 dark:text-gray-400">1.0.0</span>
              </SettingsItem>
            </SettingsSection>

            <SettingsSection title="기타">
              <SettingsItem
                icon={<FaSignOutAlt />}
                label="로그아웃"
                onClick={handleLogout}
                isDestructive={true}
              />
              <SettingsItem
                icon={<FaTrashAlt />}
                label="계정 삭제"
                onClick={handleDeleteAccount}
                isDestructive={true}
              />
            </SettingsSection>
          </div>
        </main>

        {/* ------ 앱 정보 모달 ------ */}
        {showAppInfo && (
          <AppInfoModal onClose={() => setShowAppInfo(false)} />
        )}
      </section>
    </ProtectedRoute>
  );
}

// ---- 앱 정보 모달 ----
function AppInfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-xs w-full relative">
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-100"
        >✕</button>
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
          <FaInfoCircle className="mr-2" /> 앱 정보
        </h2>
        <dl className="space-y-2">
          <div>
            <dt className="text-xs text-gray-500">버전</dt>
            <dd>1.0.0</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">제작사</dt>
            <dd>UMO Company</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">고객센터</dt>
            <dd>support@umo.site</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

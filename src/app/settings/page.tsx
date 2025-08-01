// src/app/settings/page.tsx
'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { userService } from '@/services/user.service';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import {
  FaArrowLeft, FaBell, FaInfoCircle, FaLock, FaSun, FaMoon, FaSignOutAlt, FaTrashAlt, FaUser
} from 'react-icons/fa';
import { NotificationToggle } from './components/NotificationToggle';
import { SettingsItem } from './components/SettingsItem';
import { SettingsSection } from './components/SettingsSection';
import { ThemeToggle } from './components/ThemeToggle';
import { AppInfoModal } from "./utils/appInfoModal";
import toast from "react-hot-toast";
import { useTheme } from '@/context/ThemeContext';
import ModernScrollbar from '@/components/custom-scrollbar/ModernScrollbar';

export default function SettingsPage() {
  const router = useRouter();
  const [showAppInfo, setShowAppInfo] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; 

  const currentUserId = user?.id || ''; 

  const handleLogout = async () => {
    if (!confirm('로그아웃 하시겠습니까?')) return;
    try {
      await useAuthStore.getState().logout();
      toast.success('로그아웃 되었습니다.');
      window.location.href = '/login';
    } catch {
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
    try {
      await userService.deleteAccount();
      await useAuthStore.getState().logout();
      toast.success('계정이 삭제되었습니다.');
      window.location.href = '/login';
    } catch {
      toast.error('계정 삭제에 실패했습니다.');
    }
  };

  return (
    <ProtectedRoute>
      <div className="app-container flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm p-3 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="뒤로"
          >
            <FaArrowLeft size={18} className="text-gray-700 dark:text-gray-200" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white flex-1 text-center pr-8">
            설정
          </h1>
        </header>

        {/* Main */}
        <main className=
          "flex-1 w-full max-w-xl mx-auto px-4 pt-4 pb-10 space-y-5 relative"
          style={{ minHeight: 0 }}
        >
          <ModernScrollbar className="w-full h-full">
          <SettingsSection title="계정 설정">
            <SettingsItem
              icon={<FaUser />}
              label="프로필 편집"
              onClick={() => router.push('/profile')}
            />
            <SettingsItem
              icon={<FaLock />}
              label="비밀번호 변경"
              onClick={() => router.push('/profile/change-password')}
            />
            <SettingsItem
              icon={<FaSignOutAlt />}
              label="로그아웃"
              onClick={handleLogout}
              isDestructive
            />
            <SettingsItem
              icon={<FaTrashAlt />}
              label="계정 삭제"
              onClick={handleDeleteAccount}
              isDestructive
            />
          </SettingsSection>

          <SettingsSection title="화면 설정">
            <SettingsItem
              icon={theme === 'dark'
                ? <FaSun className="text-yellow-400" />
                : <FaMoon className="text-indigo-500" />}
              label={theme === 'dark' ? "라이트 모드" : "다크 모드"}
              isButton={false}
            >
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
          </ModernScrollbar>
        </main>

        {showAppInfo && <AppInfoModal onClose={() => setShowAppInfo(false)} />}
      </div>
    </ProtectedRoute>
  );
}

// src/app/settings/page.tsx
'use client';

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
  success: (message: string) => alert('SUCCESS: ' + message),
  error: (message: string) => alert('ERROR: ' + message),
};

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      try {
        await AuthService.logout(); // useAuth 훅의 logout 함수 호출
        toast.success('로그아웃 되었습니다.');
        router.push('/login');
      } catch (error) {
        toast.error('로그아웃 실패');
        console.error('Logout error:', error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        await userService.deleteAccount(); // useAuth 훅의 deleteAccount 함수 호출
        toast.success('계정이 삭제되었습니다.');
        router.push('/register');
      } catch (error) {
        toast.error('계정 삭제 실패');
        console.error('Delete account error:', error);
      }
    }
  };

  // 현재 로그인한 사용자 ID (예시, 실제로는 인증 컨텍스트/훅에서 가져와야 함)
  const currentUserId = 'user123'; // 실제 사용자 ID로 대체

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 text-gray-600 dark:text-gray-300"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold">설정</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4">
          {/* 계정 설정 섹션 */}
          <SettingsSection title="계정 설정">
            <SettingsItem icon={<FaUser />} label="프로필 편집" onClick={() => router.push('/profile')} />
            <SettingsItem icon={<FaLock />} label="비밀번호 변경" onClick={() => router.push('/change-password')} />
            {/* <SettingsItem icon={<FaLink />} label="연결된 계정" onClick={() => router.push('/linked-accounts')} /> */}
          </SettingsSection>

          {/* 화면 설정 섹션 (다크 모드) */}
          <SettingsSection title="화면 설정">
            <SettingsItem icon={<FaPalette />} label="다크 모드" isButton={false}>
              <ThemeToggle />
            </SettingsItem>
          </SettingsSection>

          {/* 알림 설정 섹션 */}
          <SettingsSection title="알림 설정">
            <SettingsItem icon={<FaBell />} label="푸시 알림" isButton={false}>
              <NotificationToggle userId={currentUserId} />
            </SettingsItem>
            {/* <SettingsItem icon={<FaEnvelope />} label="이메일 알림" isButton={false}>
              <EmailNotificationToggle userId={currentUserId} />
            </SettingsItem> */}
          </SettingsSection>

          {/* 앱 정보 섹션 */}
          <SettingsSection title="앱 정보">
            <SettingsItem icon={<FaInfoCircle />} label="앱 정보" onClick={() => router.push('/about')} />
            <SettingsItem label="버전 정보" isButton={false}>
              <span className="text-sm text-gray-500 dark:text-gray-400">1.0.0</span> {/* 실제 버전 정보로 대체 */}
            </SettingsItem>
            {/* <SettingsItem icon={<FaFileAlt />} label="개인정보 처리방침" onClick={() => router.push('/privacy-policy')} />
            <SettingsItem icon={<FaFileContract />} label="이용 약관" onClick={() => router.push('/terms-of-service')} /> */}
          </SettingsSection>

          {/* 기타 섹션 (로그아웃, 계정 삭제) */}
          <SettingsSection title="기타">
            <SettingsItem icon={<FaSignOutAlt />} label="로그아웃" onClick={handleLogout} isDestructive={true} />
            <SettingsItem icon={<FaTrashAlt />} label="계정 삭제" onClick={handleDeleteAccount} isDestructive={true} />
          </SettingsSection>
        </main>
      </div>
    </ProtectedRoute>
  );
}
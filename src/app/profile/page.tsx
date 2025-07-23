// src/app/profile/page.tsx
'use client';

import ProfileImageUploader from '@/components/auth/ProfileImageUploader';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { userService } from '@/services/user.service';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const { user, getProfile } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(user?.profileImage || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPreviewUrl(user.profileImage || '');
      setProfileImageFile(null);
    }
  }, [user]);

  useEffect(() => {
    if (profileImageFile) {
      setPreviewUrl(URL.createObjectURL(profileImageFile));
    } else if (user?.profileImage) {
      setPreviewUrl(user.profileImage);
    }
  }, [profileImageFile, user?.profileImage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await userService.updateMe({
        name,
        profileImage: profileImageFile || '',
      });
      toast.success('프로필이 성공적으로 저장되었습니다.');
      await getProfile?.();
      router.replace('/settings');
    } catch (error: any) {
      toast.error(error.message || '프로필 수정 실패');
    } finally {
      setIsLoading(false);
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
            프로필 편집
          </h1>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto min-h-0 flex justify-center px-4 pt-6 pb-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            autoComplete="off"
          >
            {/* 이미지 업로더 */}
            <div className="flex justify-center">
              <ProfileImageUploader
                profileImageFile={profileImageFile}
                setProfileImageFile={setProfileImageFile}
                previewUrl={previewUrl}
              />
            </div>

            {/* 이름 입력 */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                이름
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500"
                placeholder="이름 입력"
              />
            </div>

            {/* 이메일 (읽기 전용) */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                이메일
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              />
            </div>

            {/* 저장 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-3 rounded-lg font-medium text-white shadow-button transition-colors ${
                isLoading
                  ? 'bg-primary-300 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-700 active:bg-primary-800'
              }`}
              aria-busy={isLoading}
            >
              {isLoading ? '저장 중...' : '저장하기'}
            </button>

            {/* 비밀번호 변경 버튼 */}
            <button
              type="button"
              onClick={() => router.push('/profile/change-password')}
              className="w-full py-2 px-3 rounded-lg border mt-2 font-medium bg-white dark:bg-gray-900 text-primary-700 dark:text-primary-400 border-primary-200 dark:border-primary-400 shadow-button hover:bg-primary-50 dark:hover:bg-gray-800 transition"
            >
              비밀번호 변경
            </button>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}

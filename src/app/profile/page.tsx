// src/app/profile/page.tsx
'use client';

import ProfileImageUploader from '@/components/auth/ProfileImageUploader';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { userService } from '@/services/user.service';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, getProfile } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImageFile, setProfileImageFile] = useState<File|null>(null);
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

  // 이미지 파일 미리보기
  useEffect(() => {
    if (profileImageFile) {
      setPreviewUrl(URL.createObjectURL(profileImageFile));
    } else if (user?.profileImage) {
      setPreviewUrl(user.profileImage);
    }
  }, [profileImageFile, user?.profileImage]);

  // 프로필 수정
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <main className="w-full max-w-md p-4">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white p-8 rounded-2xl shadow-lg"
            autoComplete="off"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">프로필 편집</h2>
            {/* 프로필 이미지 업로더 */}
            <div className="flex flex-col items-center mb-1">
              <ProfileImageUploader
                profileImageFile={profileImageFile}
                setProfileImageFile={setProfileImageFile}
                previewUrl={previewUrl}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">이름</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500"
                placeholder="이름 입력"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">이메일</label>
              <input
                type="email"
                value={email}
                disabled
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-400"
              />
            </div>
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

            <button
              type="button"
              className="w-full py-2 px-3 rounded-lg border mt-4 font-medium bg-white text-primary-700 shadow-button hover:bg-primary-50 transition"
              onClick={() => router.push('/profile/change-password')}
            >
              비밀번호 변경
            </button>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// src/app/profile/change-password/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/user.service';
import toast from 'react-hot-toast';
import PasswordInput from '@/components/auth/PasswordInput';
import PasswordConfirmInput from '@/components/auth/PasswordConfirmInput';
import { validatePassword } from '@/utils/validation';
import { FaArrowLeft } from 'react-icons/fa';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');

  const [showPw, setShowPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showNewPwConfirm, setShowNewPwConfirm] = useState(false);

  const [newPwError, setNewPwError] = useState('');
  const [newPwConfirmError, setNewPwConfirmError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // 새 비밀번호 정책/형식 검사
  useEffect(() => {
    if (newPw.length > 0 && !validatePassword(newPw)) {
      setNewPwError('영문 대/소문자, 숫자, 특수문자 포함 9~20자');
    } else {
      setNewPwError('');
    }
  }, [newPw]);

  // 새 비밀번호-일치 여부 검사
  useEffect(() => {
    if (newPwConfirm.length > 0 && newPw !== newPwConfirm) {
      setNewPwConfirmError('새 비밀번호가 일치하지 않습니다.');
    } else {
      setNewPwConfirmError('');
    }
  }, [newPw, newPwConfirm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!currentPw || !newPw || !newPwConfirm) {
      setApiError('모든 항목을 입력해주세요.');
      return;
    }
    if (newPw !== newPwConfirm) {
      setApiError('비밀번호 입력 조건을 확인해주세요.');
      return;
    }
    setLoading(true);
    try {
      await userService.changePassword({
        currentPassword: currentPw,
        newPassword: newPw,
        confirmPassword: newPwConfirm,
      });
      toast.success('비밀번호가 성공적으로 변경되었습니다.');
      router.replace('/profile');
    } catch (err: any) {
      setApiError(err?.response?.data?.message || err.message || '비밀번호 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-2 flex items-center">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="뒤로"
        >
          <FaArrowLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center pr-8">비밀번호 변경</h1>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-4 overflow-y-auto justify-start">
        <div className="w-full max-w-sm mt-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-7 bg-white p-8 rounded-2xl shadow-lg"
            autoComplete="off"
          >
            <PasswordInput
              value={currentPw}
              onChange={setCurrentPw}
              showPassword={showPw}
              setShowPassword={setShowPw}
              error={undefined}
            />
            <PasswordInput
              value={newPw}
              onChange={setNewPw}
              showPassword={showNewPw}
              setShowPassword={setShowNewPw}
              error={newPwError}
            />
            <PasswordConfirmInput
              value={newPwConfirm}
              onChange={setNewPwConfirm}
              showPassword={showNewPwConfirm}
              setShowPassword={setShowNewPwConfirm}
              error={newPwConfirmError}
            />

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                {apiError}
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2 px-3 rounded-lg font-medium text-white shadow-button transition-colors ${
                loading ? 'bg-primary-300 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-700 active:bg-primary-800'
              }`}
              disabled={loading || !!newPwError || !!newPwConfirmError}
              aria-busy={loading}
            >
              {loading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

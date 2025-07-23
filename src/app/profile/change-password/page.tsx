// src/app/profile/change-password/page.tsx
'use client';

import PasswordConfirmInput from '@/components/auth/PasswordConfirmInput';
import PasswordInput from '@/components/auth/PasswordInput';
import { userService } from '@/services/user.service';
import { validatePassword } from '@/utils/validation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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

  useEffect(() => {
    if (newPw.length > 0 && !validatePassword(newPw)) {
      setNewPwError('영문 대/소문자, 숫자, 특수문자 포함 9~20자');
    } else {
      setNewPwError('');
    }
  }, [newPw]);

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
          비밀번호 변경
        </h1>
      </header>

      {/* Main */}
      <main
        className="flex-1 overflow-y-auto min-h-0 flex justify-center px-4 pt-6 pb-10"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-7 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          autoComplete="off"
        >
          <PasswordConfirmInput
            value={currentPw}
            onChange={setCurrentPw}
            showPassword={showPw}
            setShowPassword={setShowPw}
            error={undefined}
            label={<b>현재 비밀번호</b>}
            placeholder="현재 비밀번호 입력"
          />
          <PasswordInput
            value={newPw}
            onChange={setNewPw}
            showPassword={showNewPw}
            setShowPassword={setShowNewPw}
            error={newPwError}
            label={<b>새 비밀번호</b>}
            placeholder="새 비밀번호 입력"
          />
          <PasswordConfirmInput
            value={newPwConfirm}
            onChange={setNewPwConfirm}
            showPassword={showNewPwConfirm}
            setShowPassword={setShowNewPwConfirm}
            error={newPwConfirmError}
            label={<b>새 비밀번호 확인</b>}
            placeholder="새 비밀번호 재입력"
          />

          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm dark:bg-red-100 dark:border-red-300">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-3 rounded-lg font-medium text-white shadow-button transition-colors ${
              loading || newPwError || newPwConfirmError
                ? 'bg-primary-300 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-700 active:bg-primary-800'
            }`}
            disabled={loading || !!newPwError || !!newPwConfirmError}
            aria-busy={loading}
          >
            {loading ? '변경 중...' : '비밀번호 변경'}
          </button>
        </form>
      </main>
    </div>
  );
}

// src/app/profile/change-password/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/user.service';
import toast from 'react-hot-toast';
import PasswordInput from '@/components/auth/PasswordInput';
import PasswordConfirmInput from '@/components/auth/PasswordConfirmInput';
import { validatePassword } from '@/utils/validation';

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
      setApiError('새 비밀번호가 일치하지 않습니다.');
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 md:space-y-7 lg:space-y-8 xl:space-y-9 max-w-md w-full bg-white rounded-lg shadow p-8 mx-auto mt-10"
      autoComplete="off"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-900">비밀번호 변경</h2>
      
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
          loading
            ? 'bg-primary-300 cursor-not-allowed'
            : 'bg-primary-500 hover:bg-primary-700 active:bg-primary-800'
        }`}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? '변경 중...' : '비밀번호 변경'}
      </button>
    </form>
  );
}

// src/app/find-password/ResetStep.tsx
'use client';
import PasswordConfirmInput from '@/components/auth/PasswordConfirmInput';
import PasswordInput from '@/components/auth/PasswordInput';
import api from '@/lib/api';
import { validatePassword } from '@/utils/validation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  email: string;
}

export default function ResetStep({ email }: Props) {
  const router = useRouter();

  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [error, setError] = useState('');
  const [pw1Error, setPw1Error] = useState('');
  const [pw2Error, setPw2Error] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // 실시간 검증
  const handlePw1Change = (val: string) => {
    setPw1(val);
    setPw1Error(
      val.length > 0 && !validatePassword(val)
        ? '비밀번호는 9~20자, 영문 대소/숫자/특수문자를 모두 포함해야 합니다.'
        : ''
    );

    // 비번1이 바뀌면 비번2도 재검증 필요
    setPw2Error(
      pw2.length > 0 && val !== pw2
        ? '비밀번호가 일치하지 않습니다.'
        : ''
    );
  };

  const handlePw2Change = (val: string) => {
    setPw2(val);
    setPw2Error(
      val.length > 0 && val !== pw1
        ? '비밀번호가 일치하지 않습니다.'
        : ''
    );
  };

  const handleReset = async () => {
    setError('');
    setLoading(true);
    try {
      await api.patch('/auth/service/password/find/reset', {
        email,
        newPassword: pw1,
        confirmPassword: pw2,
      });
      setToastMsg('비밀번호가 성공적으로 변경되었습니다!');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (e: any) {
      setError(e.response?.data?.message || '비밀번호 변경 실패');
    }
    setLoading(false);
  };

  // 토스트 자동 사라지기
  if (toastMsg) {
    setTimeout(() => setToastMsg(''), 1400); // 1.4초 후 안보임
  }

  return (
    <div className="space-y-8 pt-2">
      {/* 토스트 메시지 */}
      {toastMsg && (
        <div className="
          fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900/90
          text-white font-bold py-2 px-5 rounded-lg shadow
        ">
          {toastMsg}
        </div>
      )}

      <PasswordInput
        value={pw1}
        onChange={handlePw1Change}
        showPassword={showPw1}
        setShowPassword={setShowPw1}
        error={pw1Error}
      />
      <PasswordConfirmInput
        value={pw2}
        onChange={handlePw2Change}
        showPassword={showPw2}
        setShowPassword={setShowPw2}
        error={pw2Error}
      />
      <button
        className={`
          mt-8 w-full py-2 rounded-lg font-bold text-white transition-colors border
          border-l-0 border-gray-300
          ${!pw1 || !pw2 || pw1 !== pw2 || pw1Error || pw2Error || loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary-600 hover:bg-primary-700'
          }`}
        onClick={handleReset}
        disabled={
          !pw1 || !pw2 ||
          pw1 !== pw2 ||
          !!pw1Error || !!pw2Error ||
          loading
        }
        type="button"
      >
        비밀번호 변경
      </button>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

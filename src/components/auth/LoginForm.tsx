// src/components/auth/LoginForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { useEmailAutocomplete } from '@/hooks/useEmailAutocomplete';
import { useAuthStore } from '@/store/auth.store';
import SocialLoginButtons from './SocialLoginButtons';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const {
    email,
    hint,
    handleEmailChange,
    handleEmailKeyDown,
    handleHintClick,
  } = useEmailAutocomplete();

  const { login, error, isLoading, clearError, getProfile } = useAuthStore();

  // 로그인 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    clearError();

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    try {
      await login({ email, password });
      await getProfile();
      onLoginSuccess();
    } catch {
      // 에러는 상태에서 관리
    }
  };

  const handleSocialLogin = (provider: 'google' | 'kakao' | 'naver') => {
    // 백엔드 소셜 로그인 엔드포인트로 이동
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${provider}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7 lg:space-y-8 xl:space-y-9">
      <div className="space-y-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            이메일
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleEmailKeyDown}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="이메일 주소"
            />
            {hint && hint !== email && (
              <span
                className="absolute left-10 top-0 h-full flex items-center text-gray-400 dark:text-gray-500 select-none cursor-pointer"
                style={{
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onMouseDown={handleHintClick}
                tabIndex={-1}
              >
                <span style={{ opacity: 0 }}>{email}</span>
                <span style={{ color: '#bbb' }}>{hint.slice(email.length)}</span>
              </span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            비밀번호
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="비밀번호"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div />
          <Link
            href="/find-password"
            className="text-sm font-medium text-primary-600 hover:underline transition dark:text-primary-400"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mt-5">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-3 rounded-lg font-medium text-white shadow-button transition-colors ${
            isLoading
              ? 'bg-primary-400 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-700 active:bg-primary-800'
          }`}
          aria-busy={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </div>
      <SocialLoginButtons onSocialLogin={handleSocialLogin} />
    </form>
  );
}

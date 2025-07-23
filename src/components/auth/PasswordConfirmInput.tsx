// src/components/auth/PasswordConfirmInput.tsx
import { PasswordConfirmInputProps } from '@/types/components/auth';
import React, { useRef } from 'react';
import { FaLock, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';

export default function PasswordConfirmInput({ value, onChange, showPassword, setShowPassword, error }: PasswordConfirmInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div>
      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        <b>비밀번호 확인</b>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaLock className="text-gray-400 dark:text-gray-500" />
        </div>
        <input
          id="confirm-password"
          name="confirm-password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          required
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => {
            // 모바일에서만 동작
            if (window.innerWidth < 768) {
              inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="비밀번호 재입력"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FaExclamationCircle />{error}</p>}
    </div>
  );
}

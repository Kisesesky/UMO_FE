// src/components/auth/PasswordInput.tsx
import { PasswordInputProps } from '@/types/components/auth';
import React, { useRef } from 'react';
import { FaLock, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';

export default function PasswordInput({ value, onChange, showPassword, setShowPassword, error }: PasswordInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaLock className="text-gray-400" />
        </div>
        <input
          id="password"
          name="password"
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
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
          placeholder="최소 8자, 영문/숫자 포함"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FaExclamationCircle />{error}</p>}
    </div>
  );
}

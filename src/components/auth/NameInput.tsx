// src/components/auth/NameInput.tsx
import { NameInputProps } from '@/types/components/auth';
import React, { useRef } from 'react';
import { FaUser, FaExclamationCircle } from 'react-icons/fa';

export default function NameInput({ value, onChange, error }: NameInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        이름
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaUser className="text-gray-400 dark:text-gray-500" />
        </div>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => {
            // 모바일에서만 동작
            if (window.innerWidth < 768) {
              inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="이름"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <FaExclamationCircle />{error}
        </p>
      )}
    </div>
  );
}

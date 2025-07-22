// src/app/settings/components/ThemeToggle.tsx

'use client';

import { useTheme } from '@/context/TemeContext';
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // 아이콘 추가

// UI 라이브러리의 Switch 컴포넌트를 사용한다고 가정
// import { Switch } from '@/components/ui/Switch'; // 예시

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label htmlFor="toggle-dark-mode" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id="toggle-dark-mode"
          className="sr-only" // 시각적으로 숨기기
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        {/* 커스텀 토글 UI (Tailwind CSS) */}
        <div className="block bg-gray-300 dark:bg-gray-600 w-10 h-6 rounded-full"></div>
        <div
          className={`dot absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform duration-300
  ease-in-out
            ${theme === 'dark' ? 'translate-x-full bg-indigo-600 dark:bg-indigo-500' : ''}`}
        ></div>
      </div>
      {/* 아이콘 추가 (선택 사항) */}
      {/* {theme === 'dark' ? <FaMoon className="ml-2 text-yellow-400" /> : <FaSun className="ml-2 text-orange-400" />} */}
    </label>
  );
};
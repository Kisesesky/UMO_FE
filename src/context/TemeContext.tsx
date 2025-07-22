// src/context/ThemeContext.tsx
 
'use client';
 
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void; // 필요시 외부에서 테마 설정 가능하도록 추가
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light'); // 내부 상태

  useEffect(() => {
    // 로컬 스토리지에서 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('theme') as Theme;
    // 시스템 설정 (prefers-color-scheme) 확인
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialTheme: Theme;
    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      // 저장된 테마가 없으면 시스템 설정을 따르거나 기본값 (light)
      initialTheme = systemPrefersDark ? 'dark' : 'light';
    }

  setThemeState(initialTheme);
   // HTML 요소에 'dark' 클래스 적용/제거
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
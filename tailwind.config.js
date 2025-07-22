// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 기본 색상 팔레트 확장
        primary: {
          DEFAULT: '#4F46E5', // 기존 indigo-600
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1', // 새로운 primary-500
          600: '#4F46E5', // 기존 primary
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        secondary: {
          DEFAULT: '#10B981', // 예시로 에메랄드 그린 계열
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#059669',
          800: '#047857',
          900: '#065F46',
          950: '#022C22',
        },
        gray: { // 중립색 팔레트 확장 (기존 Tailwind gray 사용)
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        // 기타 강조색 등 필요에 따라 추가
        danger: '#EF4444', // red-500
        warning: '#F59E0B', // amber-500
        success: '#22C55E', // green-500
        info: '#3B82F6', // blue-500
      },
      boxShadow: {
        // 더 깊이감 있는 그림자 정의
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'app': '0 0 25px rgba(0, 0, 0, 0.15)', // 앱 컨테이너용
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)', // 카드 컴포넌트용
        'button': '0 4px 12px rgba(0, 0, 0, 0.15)', // 버튼 컴포넌트용
      },
      spacing: { // 간격 시스템 확장 (Tailwind 기본 간격에 추가)
        0: '0px',
        0.5: '0.125rem',   // 2px
        1: '0.25rem',       // 4px
        1.5: '0.375rem',    // 6px
        2: '0.5rem',        // 8px
        2.5: '0.625rem',    // 10px 🔥
        3: '0.75rem',       // 12px
        3.5: '0.875rem',    // 14px 🔥
        4: '1rem',          // 16px
        4.5: '1.125rem',    // 18px
        5: '1.25rem',       // 20px
        5.5: '1.375rem',    // 22px
        6: '1.5rem',        // 24px
        6.5: '1.625rem',    // 26px
        7: '1.75rem',       // 28px
        7.5: '1.875rem',    // 30px
        8: '2rem',          // 32px 🔥
        9: '2.25rem',       // 36px 🔥
        10: '2.5rem',       // 40px
        11: '2.75rem',      // 44px
        12: '3rem',         // 48px
        13: '3.25rem',      // 52px
        14: '3.5rem',       // 56px
        16: '4rem',         // 64px
      },
      borderRadius: {
        'xl': '0.75rem', // 12px
        '2xl': '1rem',   // 16px
        '3xl': '1.5rem', // 24px
      },
    },
  },
  plugins: [],
};
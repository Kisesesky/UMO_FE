/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
          colors: {
            primary: '#007AFF',
            secondary: '#F2F2F7',
            // 기타 색상 정의
          },
          fontFamily: {
            sans: ['Pretendard', 'sans-serif'],
            // 기타 폰트 정의
          },
          // 기타 확장 설정
        },
      },
    plugins: [],
  };
  
// src/components/auth/SocialLoginButtons.tsx
import React from 'react';

interface Props {
  onSocialLogin: (provider: 'google' | 'kakao' | 'naver') => void;
}

export default function SocialLoginButtons({ onSocialLogin }: Props) {
  return (
    <div className="mt-6 flex flex-col gap-3 w-full max-w-sm mx-auto">
      {/* Google Button (Material guideline) */}
      <button
        type="button"
        onClick={() => onSocialLogin('google')}
        className="
          gsi-material-button w-full flex items-center gap-4 py-3 px-4
          rounded-lg shadow-sm border border-gray-200 bg-white
          hover:bg-gray-50 transition
          focus:outline-none focus:ring-2 focus:ring-primary-300"
        style={{ minHeight: 48 }}
      >
        <span className="gsi-material-button-icon shrink-0">
          {/* 공식 Google SVG, 유지해야함 */}
          <svg viewBox="0 0 48 48" width={28} height={28}>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </span>
        <span className="flex-1 text-center font-medium text-gray-700 text-base tracking-tight">Google로 로그인</span>
      </button>

      {/* Kakao Button, 공식 가이드 컬러/폰트/아이콘 */}
      <button
        type="button"
        onClick={() => onSocialLogin('kakao')}
        className="
          w-full flex items-center gap-4 py-3 px-4 rounded-lg
          border-none
          text-[15px] font-semibold
          shadow-sm
          transition
        "
        style={{
          backgroundColor: "#FEE500",
          color: "#191600",
          minHeight: 48,
        }}
      >
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
          alt="Kakao"
          className="w-7 h-7 shrink-0"
          style={{background: 'none'}}
        />
        <span className="flex-1 text-center">카카오로 로그인</span>
      </button>

      {/* Naver Button, 공식 가이드 컬러/폰트/아이콘 */}
      <button
        type="button"
        onClick={() => onSocialLogin('naver')}
        className="
          w-full flex items-center gap-4 py-3 px-4 rounded-lg
          border-none
          text-[15px] font-bold
          shadow-sm
          transition
        "
        style={{
          backgroundColor: '#03C75A',
          color: '#fff',
          minHeight: 48,
        }}
      >
        <img
          src="/icons/oauth/naver.svg"
          alt="Naver"
          className="w-7 h-7 shrink-0"
          style={{background: 'none'}}
        />
        <span className="flex-1 text-center">네이버로 로그인</span>
      </button>
    </div>
  );
}

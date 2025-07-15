// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '../../store/auth.store';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    
    if (useAuthStore.getState().isAuthenticated) {
      router.push('/');
    }
  };

  const handleSocialLogin = (provider: 'google' | 'kakao' | 'naver') => {
    // 백엔드 소셜 로그인 엔드포인트로 이동
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${provider}`;
  };

  return (
    <div className="app-container flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button 
          onClick={() => router.push('/')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaArrowLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center pr-8">로그인</h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center
        p-6 overflow-y-auto
        pt-8
        md:pt-8
        lg:pt-10
        justify-center
        md:justify-start">
        <div className="w-full max-w-sm">
          {/* 로고 또는 앱 이름 및 캐릭터 이미지 */}
          <div className="text-center mb-8">
            <div className="mb-4"> {/* 이미지와 텍스트 사이 간격 */}
              <Image
                src="/assets/character/umo-body.png" // 이미지 경로
                alt="우모 캐릭터"
                width={120} // 이미지 너비 (조절 가능)
                height={120} // 이미지 높이 (조절 가능)
                priority // 로딩 우선순위 높게 설정
                className="mx-auto" // 중앙 정렬
              />
            </div>
            <h2 className="text-2xl font-bold text-primary-600">UMO</h2>
            <p className="text-gray-600 mt-2">우산 대여 서비스</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
                    placeholder="이메일 주소"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
                    placeholder="비밀번호"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-button transition-colors ${
                  isLoading 
                    ? 'bg-primary-400 cursor-not-allowed' 
                    : 'bg-primary-500 hover:bg-primary-700 active:bg-primary-800'
                }`}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </div>
            <SocialLoginButtons onSocialLogin={handleSocialLogin} />
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              아직 계정이 없으신가요?{' '}
              <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                회원가입하기
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
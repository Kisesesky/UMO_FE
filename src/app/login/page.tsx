// src/app/login/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuthStore } from '@/store/auth.store';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const handleLoginSuccess = () => {
    router.push('/');
  };

  return (
    <div className="app-container flex flex-col bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-sm p-2 flex items-center border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="뒤로가기"
        >
          <FaArrowLeft size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center pr-8 text-gray-800 dark:text-gray-100">로그인</h1>
      </header>

      <main
        className="flex-1 flex flex-col items-center
        px-6 pt-4 md:pt-8 lg:pt-10
        overflow-y-auto justify-start"
      >
        <div className="w-full max-w-sm text-center">
          <Image
            src="/assets/character/umo-body.png"
            alt="우모 캐릭터"
            width={80}
            height={80}
            priority
            className="mx-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div className="w-full max-w-sm mt-6">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
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

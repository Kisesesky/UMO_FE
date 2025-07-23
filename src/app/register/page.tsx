// src/app/register/page.tsx
'use client';

import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="app-container flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm p-2 flex items-center">
        <button
          onClick={() => router.push('/login')}
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors p-2"
        >
          <FaArrowLeft size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex-1 text-center pr-8">회원가입</h1>
      </header>

      <main 
        className="
          flex-1 flex flex-col items-center
          px-6 pt-4 md:pt-8 lg:pt-10
          overflow-y-auto justify-start
          text-gray-900 dark:text-gray-100
        "
      >
        <div className="w-full max-w-sm">
          <div className="text-center">
          </div>
      <RegisterForm />
      <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              이미 계정이 있으신가요?{' '}
              <Link
                href="/login"
                className="
                  font-medium text-primary-600 hover:text-primary-500 
                  dark:text-primary-400 dark:hover:text-primary-300
                "
              >
                로그인하기
              </Link>
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}

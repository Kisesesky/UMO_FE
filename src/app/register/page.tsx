// src/app/register/page.tsx
'use client';

import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="app-container flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button
          onClick={() => router.push('/login')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaArrowLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center pr-8">회원가입</h1>
      </header>

      <main className="flex-1 flex flex-col items-center
        p-6 overflow-y-auto
        pt-8
        md:pt-8
        lg:pt-10
        justify-center
        md:justify-start">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
          </div>
      <RegisterForm />
      <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                로그인하기
              </Link>
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}

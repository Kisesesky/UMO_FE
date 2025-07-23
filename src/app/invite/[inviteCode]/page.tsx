// src/app/invite/[inviteCode]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';

export default function InviteLandingPage() {
  const params = useParams();
  const router = useRouter();
  const inviteCode = params?.inviteCode as string | undefined;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">
          우모에 오신 걸 환영합니다!
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          {inviteCode ? (
            <>
              <span className="font-semibold">
                초대 코드 <span className="text-indigo-700 dark:text-indigo-400">{inviteCode}</span>를 통해 가입 시, <br />
                최초 대여 무료 쿠폰 지급!
              </span>
            </>
          ) : (
            '초대받으신 분께 특별한 혜택이 제공됩니다.'
          )}
        </p>
        <button
          onClick={() => router.push(`/register?invite=${inviteCode || ''}`)}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg mt-4 font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition"
        >
          회원가입하고 혜택 받기
        </button>
        <button
          onClick={() => router.push('/login')}
          className="w-full py-3 mt-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          이미 계정이 있으신가요? 로그인
        </button>
      </div>
    </div>
  );
}


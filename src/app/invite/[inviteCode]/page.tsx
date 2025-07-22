// src/app/invite/[inviteCode]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';

export default function InviteLandingPage() {
  const params = useParams();
  const router = useRouter();
  const inviteCode = params?.inviteCode as string | undefined;

  // 가입/로그인 시 초대코드를 자동 적용시키려면 상태/서버에전달
  // 또는 로그인/가입 Form에 초대코드 프리셋 필드
  // ex) /register?invite=코드 이동, 혹은 직접 가입창에 깔끔하게 표시

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">우모에 오신 걸 환영합니다!</h2>
        <p className="mb-4">
          {inviteCode ? (
            <>
              <span className="font-semibold text-gray-800">초대 코드 <span className="text-indigo-700">{inviteCode}</span>를 통해 가입 시,  
                <br />최초 대여 무료 쿠폰 지급!</span>
            </>
          ) : '초대받으신 분께 특별한 혜택이 제공됩니다.'}
        </p>
        <button
          onClick={() => router.push(`/register?invite=${inviteCode || ''}`)}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg mt-4 font-semibold hover:bg-indigo-700 transition"
        >
          회원가입하고 혜택 받기
        </button>
        <button
          onClick={() => router.push('/login')}
          className="w-full py-3 mt-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          이미 계정이 있으신가요? 로그인
        </button>
      </div>
    </div>
  );
}

// src/app/find-password/SuccessStep.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessStep() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 1800); // 1.8초 후 자동 이동
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="space-y-7 text-center pt-16">
      <div className="text-green-600 font-bold text-xl">
        비밀번호가 성공적으로 변경되었습니다!
      </div>
      <button
        onClick={() => router.push('/login')}
        className="inline-block w-full py-2 rounded-lg bg-primary-600 text-white font-bold mt-3"
      >
        로그인 페이지로 이동
      </button>
    </div>
  );
}

// src/app/find-password/SuccessStep.tsx
'use client';
import Link from 'next/link';

export default function SuccessStep() {
  return (
    <div className="space-y-5 text-center">
      <div className="text-green-600 font-bold text-lg">
        비밀번호가 성공적으로 변경되었습니다!
      </div>
      <Link href="/login" className="inline-block w-full py-2 rounded-lg bg-primary-600 text-white font-bold">
        로그인하러 가기
      </Link>
    </div>
  );
}

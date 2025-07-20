// src/app/auth/social-callback/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import Toast from '@/components/Toast';

export default function SocialCallbackPage() {
  const router = useRouter();
  const { getProfile } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then(() => {
        const redirectTo = sessionStorage.getItem('postLoginRedirect') || '/';
        sessionStorage.removeItem('postLoginRedirect');
        router.replace(redirectTo);
      })
      .catch(() => {
        setError('로그인에 실패했습니다. 3초 후 로그인 페이지로 이동합니다.');
        setTimeout(() => router.replace('/login'), 3000);
      });
  }, [getProfile, router]);

  return (
    <>
      {error && (
        <Toast
          message={error}
          type="error"
          onClose={() => {
            setError(null);
            router.replace('/login');
          }}
        />
      )}
      {!error && <div>로그인 처리 중입니다...</div>}
    </>
  );
}

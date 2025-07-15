// src/components/auth/ProtectedRoute.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/auth.store';
import { ProtectedRouteProps } from '@/types/components/auth';

export default function ProtectedRoute({ children, checkAuth = true }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, getProfile, isLoading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(checkAuth);

  useEffect(() => {
    // 인증 체크가 필요한 경우에만 실행
    if (checkAuth) {
      const checkAuth = async () => {
        if (!isAuthenticated) {
          await getProfile();
        }
        setIsChecking(false);
      };
      
      checkAuth();
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, getProfile, checkAuth]);

  // 인증 체크 중이면 로딩 표시
  if (isChecking && checkAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // 인증 체크가 필요하고, 로딩이 끝났는데 인증되지 않았으면 로그인 페이지로 리디렉션
  if (checkAuth && !isLoading && !isAuthenticated) {
    router.push('/login');
    return null;
  }

  // 그 외의 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
}

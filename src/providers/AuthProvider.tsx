// src/providers/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import LoadingScreen from 'components/custom-loading/LoadingScreen';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { getProfile, isLoading, error } = useAuthStore();

  useEffect(() => {
    getProfile(); // 앱 시작 시 사용자 정보 불러오기
  }, []);

  if (isLoading) return <LoadingScreen />;

  if (error) return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;

  return <>{children}</>;
}

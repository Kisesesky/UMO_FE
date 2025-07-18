// src/components/layout/ClientLayout.tsx
'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const getProfile = useAuthStore(s => s.getProfile);

  useEffect(() => {
    getProfile();
    // []: 페이지 처음 로드될 때(앱이 마운트될 때) 딱 1번 호출
  }, [getProfile]);

  return <>{children}</>;
}

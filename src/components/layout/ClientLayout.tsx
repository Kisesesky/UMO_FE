// src/components/layout/ClientLayout.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const getProfile = useAuthStore(state => state.getProfile);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return <>{children}</>;
}

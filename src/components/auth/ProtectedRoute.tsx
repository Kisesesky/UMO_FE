// src/components/auth/ProtectedRoute.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/auth.store';
import { ProtectedRouteProps } from '@/types/components/auth';

export default function ProtectedRoute({ children, checkAuth = true }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, getProfile, isLoading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(checkAuth);
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (checkAuth && !isAuthenticated && !attemptedRef.current) {
      attemptedRef.current = true;
      getProfile().finally(() => setIsChecking(false));
    } else {
      setIsChecking(false);
    }
  }, [checkAuth, isAuthenticated, getProfile]);

  useEffect(() => {
    if (checkAuth && !isLoading && !isAuthenticated && !isChecking) {
      router.push('/login');
    }
  }, [checkAuth, isAuthenticated, isLoading, isChecking, router]);

  if (isChecking && checkAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}

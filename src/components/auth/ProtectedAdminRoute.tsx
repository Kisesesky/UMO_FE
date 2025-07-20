// src/components/auth/ProtectedAdminRoute.tsx

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 예시: 관리자 인증 상태를 zustand, recoil, context, 또는 react-query 등으로 받아온다고 가정
import { useAdminAuthStore } from '@/store/admin-auth.store';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({ children }: Props) {
  const router = useRouter();
  const { isAuthenticated, admin, loading } = useAdminAuthStore();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/admin/login');
      } else if (admin && !['ADMIN', 'SUPER_ADMIN', 'GENERAL_ADMIN'].includes(admin.role)) {
        // 관리자가 아닌 경우
        router.replace('/403'); // 권한 없음 페이지
      }
    }
  }, [isAuthenticated, admin, loading, router]);

  if (loading) {
    return <div>관리자 인증 확인 중...</div>;
  }

  // 조건 충족 시만 admin children 렌더
  return <>{children}</>;
}

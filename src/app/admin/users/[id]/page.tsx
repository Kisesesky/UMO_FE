// src/app/admin/users/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminUsersService } from '@/services/admin/admin-users.service';
import type { AdminUser } from '@/types/admin/admin-users';

export default function AdminUserDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id = idParam ? Number(idParam) : null;
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    if (id === null || isNaN(id)) {
      setLoading(false);
      setUser(null);
      return;
    }
    setLoading(true);
    AdminUsersService.getById(id)
      .then(setUser)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUser();
  }, [idParam]);

  if (loading) return <div>로딩...</div>;
  if (!user) return <div>회원 정보를 찾을 수 없습니다.</div>;

  return (
    <ProtectedAdminRoute>
      <h2>회원상세 #{user.id}</h2>
      <div>이름: {user.name}</div>
      <div>이메일: {user.email}</div>
      <div>역할: {user.role}</div>
      <div>상태: {user.isActive ? '활성' : '비활성'}</div>
      {/* 비밀번호 초기화, 상태 변경 등 액션 버튼 */}
    </ProtectedAdminRoute>
  );
}

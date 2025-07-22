// src/app/admin/users/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminUsersService } from '@/services/admin/admin-users.service';
import type { AdminUser } from '@/types/admin/admin-users';
import { roleLabel } from '../../utils/userRoleLabel';

export default function AdminUserDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id = idParam ? Number(idParam) : null;
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === null || isNaN(id)) {
      setLoading(false);
      setUser(null);
      return;
    }
    setLoading(true);
    AdminUsersService.getById(id)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [idParam]);

  if (loading) return <div>로딩...</div>;
  if (!user) return <div>회원 정보를 찾을 수 없습니다.</div>;

  return (
    <ProtectedAdminRoute>
      <section className="max-w-md mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-bold mb-8 text-primary-700">회원 상세 #{user.id}</h2>
        <ul className="divide-y text-sm mb-8">
          <li className="py-2 flex justify-between"><b className="text-gray-600">이름</b><span>{user.name}</span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">이메일</b><span>{user.email}</span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">권한</b><span>{roleLabel(user.role)}</span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">상태</b>
            <span className={
              user.isActive
                ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700'
                : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500'
            }>
              {user.isActive ? '활성' : '비활성'}
            </span>
          </li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">가입일</b>
            <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</span></li>
        </ul>
        {/* 비밀번호 초기화, 상태 변경 등 상위 관리자용 버튼 필요시 추가 */}
      </section>
    </ProtectedAdminRoute>
  );
}
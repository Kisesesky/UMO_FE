// src/app/admin/users/page.tsx
'use client';
import AdminUserTable from '@/components/admin/AdminUserTable';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminUsersService } from '@/services/admin/admin-users.service';
import type { AdminUser } from '@/types/admin/admin-users';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const router = useRouter();

  useEffect(() => {
    AdminUsersService.getAll().then(setUsers);
  }, []);

  return (
    <ProtectedAdminRoute>
      <section className="max-w-5xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-8">회원 관리</h1>
        <div className="bg-white rounded-xl shadow p-5">
          <AdminUserTable
            users={users}
            onDetail={id => router.push(`/admin/users/${id}`)}
            onEdit={id => router.push(`/admin/users/${id}/edit`)}
          />
        </div>
      </section>
    </ProtectedAdminRoute>
  );
}

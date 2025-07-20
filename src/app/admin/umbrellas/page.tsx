// src/app/admin/umbrellas/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import AdminUmbrellaTable from '@/components/admin/AdminUmbrellaTable';
import { AdminUmbrellasService } from '@/services/admin/admin-umbrellas.service';
import type { AdminUmbrella } from '@/types/admin/admin-umbrellas';

export default function AdminUmbrellasPage() {
  const [umbrellas, setUmbrellas] = useState<AdminUmbrella[]>([]);
  const router = useRouter();

  useEffect(() => {
    AdminUmbrellasService.getAll().then(setUmbrellas);
  }, []);

  return (
    <ProtectedAdminRoute>
      <h1>우산 관리</h1>
      <button onClick={() => router.push('/admin/umbrellas/new')}>신규 우산 등록</button>
      <AdminUmbrellaTable
        umbrellas={umbrellas}
        onDetail={id => router.push(`/admin/umbrellas/${id}`)}
        onEdit={id => router.push(`/admin/umbrellas/${id}/edit`)}
        onMarkLost={id => {
          AdminUmbrellasService.markAsLost(id).then(() => {
            alert('분실 처리 되었습니다.');
            // 다시 목록 refetch
            AdminUmbrellasService.getAll().then(setUmbrellas);
          });
        }}
      />
    </ProtectedAdminRoute>
  );
}

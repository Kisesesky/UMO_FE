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
      <section className="max-w-5xl mx-auto py-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">우산 관리</h1>
          <button
            onClick={() => router.push('/admin/umbrellas/new')}
            className="px-4 py-2 bg-primary-700 text-white rounded-lg font-semibold shadow hover:bg-primary-800 transition-colors"
          >
            신규 우산 등록
          </button>
        </header>
        <div className="bg-white rounded-xl shadow p-5">
          <AdminUmbrellaTable
            umbrellas={umbrellas}
            onDetail={id => router.push(`/admin/umbrellas/${id}`)}
            onEdit={id => router.push(`/admin/umbrellas/${id}/edit`)}
            onMarkLost={id => {
              AdminUmbrellasService.markAsLost(id).then(() => {
                alert('분실 처리 되었습니다.');
                AdminUmbrellasService.getAll().then(setUmbrellas);
              });
            }}
          />
        </div>
      </section>
    </ProtectedAdminRoute>
  );
}

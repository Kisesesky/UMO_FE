// src/app/admin/stations/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import AdminStationTable from '@/components/admin/AdminStationTable';
import { AdminStationsService } from '@/services/admin/admin-stations.service';
import type { AdminStation } from '@/types/admin/admin-stations';

export default function AdminStationsPage() {
  const [stations, setStations] = useState<AdminStation[]>([]);
  const router = useRouter();

  useEffect(() => {
    AdminStationsService.getAll().then(setStations);
  }, []);

  return (
    <ProtectedAdminRoute>
      <section className="max-w-5xl mx-auto py-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">대여소 관리</h1>
          <button
            onClick={() => router.push('/admin/stations/new')}
            className="px-4 py-2 bg-primary-700 text-white rounded-lg font-semibold shadow hover:bg-primary-800 transition-colors"
          >
            신규 대여소 등록
          </button>
        </header>
        <div className="bg-white rounded-xl shadow p-5">
          <AdminStationTable
            stations={stations}
            onDetail={id => router.push(`/admin/stations/${id}`)}
            onEdit={id => router.push(`/admin/stations/${id}/edit`)}
          />
        </div>
      </section>
    </ProtectedAdminRoute>
  );
}

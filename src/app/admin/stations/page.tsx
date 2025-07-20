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
      <h1>대여소 관리</h1>
      <button onClick={() => router.push('/admin/stations/new')}>신규 대여소 등록</button>
      <AdminStationTable
        stations={stations}
        onDetail={id => router.push(`/admin/stations/${id}`)}
        onEdit={id => router.push(`/admin/stations/${id}/edit`)}
      />
    </ProtectedAdminRoute>
  );
}

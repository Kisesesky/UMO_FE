// src/app/admin/stations/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminStationsService } from '@/services/admin/admin-stations.service';
import { AdminUmbrellasService } from '@/services/admin/admin-umbrellas.service';
import type { AdminStation } from '@/types/admin/admin-stations';
import type { AdminUmbrella } from '@/types/admin/admin-umbrellas';
import AdminUmbrellaTable from '@/components/admin/AdminUmbrellaTable';

export default function AdminStationDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id = idParam ? Number(idParam) : null;
  const router = useRouter();

  const [station, setStation] = useState<AdminStation | null>(null);
  const [umbrellas, setUmbrellas] = useState<AdminUmbrella[]>([]);
  const [loading, setLoading] = useState(true);
  const [uLoading, setULoading] = useState(true);

  const fetchStation = () => {
    if (id === null || isNaN(id)) {
      setLoading(false);
      setStation(null);
      setUmbrellas([]);
      setULoading(false);
      return;
    }
    setLoading(true);
    AdminStationsService.getById(id)
      .then(setStation)
      .finally(() => setLoading(false));
    setULoading(true);
    AdminStationsService.getUmbrellas(id)
      .then(setUmbrellas)
      .finally(() => setULoading(false));
  };

  useEffect(() => {
    fetchStation();
  }, [idParam]);

  const handleDelete = async () => {
    if (id === null) return;
    await AdminStationsService.remove(id);
    alert('삭제되었습니다.');
    router.push('/admin/stations');
  };

  // 🟢 "분실 처리" 콜백:
  const handleMarkLost = async (umbrellaId: number) => {
    await AdminUmbrellasService.markAsLost(umbrellaId);
    alert('해당 우산이 분실 처리되었습니다.');
    // 우산 목록 다시 불러오기
    if (id) {
      setULoading(true);
      AdminStationsService.getUmbrellas(id)
        .then(setUmbrellas)
        .finally(() => setULoading(false));
    }
  };

  if (loading) return <div>로딩...</div>;
  if (!station) return <div>대여소 정보가 없습니다.</div>;

  return (
    <ProtectedAdminRoute>
      <h2>대여소상세 #{station.id}</h2>
      <div>이름: {station.name}</div>
      <div>위치: {station.latitude}, {station.longitude}</div>
      <div>상태: {station.isActive ? '활성' : '비활성'}</div>
      <button onClick={() => router.push(`/admin/stations/${id}/edit`)}>수정</button>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={() => router.push('/admin/stations')}>목록</button>

      <h3 style={{ marginTop: '2rem' }}>이 대여소의 우산 목록</h3>
      {uLoading
        ? <div>로딩 중…</div>
        : (
          <AdminUmbrellaTable
            umbrellas={umbrellas}
            onDetail={umbrellaId => router.push(`/admin/umbrellas/${umbrellaId}`)}
            onEdit={umbrellaId => router.push(`/admin/umbrellas/${umbrellaId}/edit`)}
            onMarkLost={handleMarkLost}
          />
        )
      }
    </ProtectedAdminRoute>
  );
}

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
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await AdminStationsService.remove(id);
    alert('삭제되었습니다.');
    router.push('/admin/stations');
  };

  const handleMarkLost = async (umbrellaId: number) => {
    await AdminUmbrellasService.markAsLost(umbrellaId);
    alert('해당 우산이 분실 처리되었습니다.');
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
      <section className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-bold mb-8 text-primary-700">대여소 상세 #{station.id}</h2>
        <ul className="divide-y text-sm mb-8">
          <li className="py-2 flex justify-between"><b className="text-gray-600">이름</b><span>{station.name}</span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">위치</b><span>{station.latitude}, {station.longitude}</span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">상태</b>
            <span className={
              station.isActive
                ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700'
                : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500'
            }>
              {station.isActive ? '활성' : '비활성'}
            </span>
          </li>
        </ul>
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => router.push(`/admin/stations/${id}/edit`)}
            className="px-4 py-2 rounded font-medium text-white bg-primary-600 hover:bg-primary-700"
          >수정</button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded font-medium text-white bg-red-600 hover:bg-red-700"
          >삭제</button>
          <button
            onClick={() => router.push('/admin/stations')}
            className="ml-auto px-4 py-2 rounded font-medium text-primary-700 border border-primary-300 bg-white hover:bg-primary-50"
          >목록</button>
        </div>
        <h3 className="mb-4 text-lg font-semibold">이 대여소의 우산 목록</h3>
        {uLoading ? (
          <div className="text-gray-400 py-4">우산 목록 로딩 중…</div>
        ) : (
          <AdminUmbrellaTable
            umbrellas={umbrellas}
            onDetail={umbrellaId => router.push(`/admin/umbrellas/${umbrellaId}`)}
            onEdit={umbrellaId => router.push(`/admin/umbrellas/${umbrellaId}/edit`)}
            onMarkLost={handleMarkLost}
          />
        )}
      </section>
    </ProtectedAdminRoute>
  );
}

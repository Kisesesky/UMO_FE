// src/app/admin/umbrellas/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminUmbrellasService } from '@/services/admin/admin-umbrellas.service';
import type { AdminUmbrella } from '@/types/admin/admin-umbrellas';
import { UmbrellaStatusBadge } from '../../utils/umbrellaStatusBadge';

export default function AdminUmbrellaDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id = idParam ? Number(idParam) : null;
  const router = useRouter();
  const [umbrella, setUmbrella] = useState<AdminUmbrella | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUmbrella = () => {
    if (id === null || isNaN(id)) {
      setUmbrella(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    AdminUmbrellasService.getById(id)
      .then(setUmbrella)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUmbrella(); }, [idParam]);

  const handleMarkLost = async () => {
    if (id === null) return;
    if (!window.confirm("정말 분실 처리 하시겠습니까?")) return;
    await AdminUmbrellasService.markAsLost(id);
    alert('분실 처리 되었습니다.');
    fetchUmbrella();
  };

  if (loading) return <div>로딩...</div>;
  if (!umbrella) return <div>우산 정보를 찾을 수 없습니다.</div>;

  return (
    <ProtectedAdminRoute>
      <section className="max-w-md mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-bold mb-8 text-primary-700">우산 상세 #{umbrella.id}</h2>
        <ul className="divide-y text-sm mb-8">
          <li className="py-2 flex justify-between"><b className="text-gray-600">코드</b><span className="font-mono">{umbrella.code}</span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">상태</b><UmbrellaStatusBadge status={umbrella.status} /></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">대여소</b><span>{umbrella.station?.name || '-'}</span></li>
        </ul>
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/umbrellas/${id}/edit`)}
            className="px-4 py-2 rounded font-medium text-white bg-primary-600 hover:bg-primary-700"
          >수정</button>
          <button
            onClick={handleMarkLost}
            disabled={umbrella.status === 'LOST'}
            className={`px-4 py-2 rounded font-medium text-white ${
              umbrella.status === 'LOST'
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >분실</button>
          <button
            onClick={() => router.push('/admin/umbrellas')}
            className="ml-auto px-4 py-2 rounded font-medium text-primary-700 border border-primary-300 bg-white hover:bg-primary-50"
          >목록</button>
        </div>
      </section>
    </ProtectedAdminRoute>
  );
}

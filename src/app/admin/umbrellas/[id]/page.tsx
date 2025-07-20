// src/app/admin/umbrellas/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminUmbrellasService } from '@/services/admin/admin-umbrellas.service';
import type { AdminUmbrella } from '@/types/admin/admin-umbrellas';

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

  useEffect(() => {
    fetchUmbrella();
  }, [idParam]);

  const handleMarkLost = async () => {
    if (id === null) return;
    await AdminUmbrellasService.markAsLost(id);
    alert('분실 처리 되었습니다.');
    fetchUmbrella();
  };

  if (loading) return <div>로딩...</div>;
  if (!umbrella) return <div>우산 정보를 찾을 수 없습니다.</div>;

  return (
    <ProtectedAdminRoute>
      <h2>우산상세 #{umbrella.id}</h2>
      <div>코드: {umbrella.code}</div>
      <div>상태: {umbrella.status}</div>
      <div>대여소: {umbrella.station?.name || '-'}</div>
      {/* 위치 이동, 상태 변경 등의 액션 UI */}
      <button onClick={() => router.push(`/admin/umbrellas/${id}/edit`)}>수정</button>
      <button onClick={handleMarkLost} disabled={umbrella.status === 'LOST'}>분실 처리</button>
      <button onClick={() => router.push('/admin/umbrellas')}>목록</button>
    </ProtectedAdminRoute>
  );
}

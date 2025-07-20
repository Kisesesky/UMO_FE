// src/app/admin/order/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminOrdersService } from '@/services/admin/admin-orders.service';
import type { AdminOrder } from '@/types/admin/admin-orders';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const idParam = params?.id; // string | undefined
  const router = useRouter();

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);

  // id 유효성 체크 및 parseInt (or Number)
  const id = idParam ? Number(idParam) : null;

  const fetchOrder = () => {
    if (id === null || isNaN(id)) {
      setLoading(false);
      setOrder(null);
      return;
    }
    setLoading(true);
    AdminOrdersService.getById(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrder();
  }, [idParam]);

  const handleComplete = async () => {
    if (id === null) return;
    await AdminOrdersService.complete(id);
    fetchOrder();
  };
  const handleCancel = async () => {
    if (id === null) return;
    await AdminOrdersService.cancel(id);
    fetchOrder();
  };

  if (loading) return <div>로딩...</div>;
  if (!order) return <div>잘못된 주문 ID거나 주문을 찾을 수 없습니다.</div>;

  return (
    <ProtectedAdminRoute>
      <h2>주문상세 #{order.id}</h2>
      <div>유저: {order.user?.name}</div>
      <div>상품: {order.product?.name}</div>
      <div>상태: {order.status}</div>
      <div>주문일: {new Date(order.createdAt).toLocaleString()}</div>
      <button onClick={handleComplete} disabled={order.status === 'COMPLETE'}>주문 완료 처리</button>
      <button onClick={handleCancel} disabled={order.status === 'CANCELED'}>주문 취소</button>
      <button onClick={() => router.push('/admin/orders')}>목록으로</button>
    </ProtectedAdminRoute>
  );
}

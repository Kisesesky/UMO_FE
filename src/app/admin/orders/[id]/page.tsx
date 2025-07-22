// src/app/admin/order/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminOrdersService } from '@/services/admin/admin-orders.service';
import type { AdminOrder } from '@/types/admin/admin-orders';
import { OrderStatusBadge } from '../../utils/orderStatusBadge';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id = idParam ? Number(idParam) : null;
  const router = useRouter();

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchOrder = () => {
    if (id === null || isNaN(id)) {
      setError('잘못된 주문 ID');
      setLoading(false);
      setOrder(null);
      return;
    }
    setLoading(true);
    setError('');
    AdminOrdersService.getById(id)
      .then(setOrder)
      .catch(() => setError('주문을 찾을 수 없습니다.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrder(); }, [idParam]);

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

  return (
    <ProtectedAdminRoute>
      <section className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-bold mb-6">
          주문 상세 <span className="text-primary-600">#{order?.id ?? id}</span>
        </h2>
        {loading && <div className="text-gray-400 py-10">로딩 중...</div>}
        {error && !loading ? (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded mb-6">{error}</div>
        ) : null}
        {(!order || error) ? null : (
          <ul className="divide-y text-sm mb-8">
            <li className="py-2 flex justify-between">
              <span className="font-semibold text-gray-600">유저</span>
              <span>{order.user?.name ?? '-'}</span>
            </li>
            <li className="py-2 flex justify-between">
              <span className="font-semibold text-gray-600">상품</span>
              <span>{order.product?.name ?? '-'}</span>
            </li>
            <li className="py-2 flex justify-between">
              <span className="font-semibold text-gray-600">상태</span>
              <span>
                <OrderStatusBadge status={order.status} />
              </span>
            </li>
            <li className="py-2 flex justify-between">
              <span className="font-semibold text-gray-600">금액</span>
              <span>{order.amount?.toLocaleString()}원</span>
            </li>
            <li className="py-2 flex justify-between">
              <span className="font-semibold text-gray-600">주문일</span>
              <span>{order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</span>
            </li>
          </ul>
        )}
        {/* 버튼 영역 */}
        <div className="flex gap-2">
          <button
            onClick={handleComplete}
            disabled={order?.status === 'COMPLETE'}
            className={`px-4 py-2 rounded font-medium text-white transition
              ${order?.status === 'COMPLETE'
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'}
              `}
          >주문 완료</button>
          <button
            onClick={handleCancel}
            disabled={order?.status === 'CANCELED'}
            className={`px-4 py-2 rounded font-medium text-white transition
              ${order?.status === 'CANCELED'
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'}
              `}
          >취소</button>
          <button
            onClick={() => router.push('/admin/orders')}
            className="ml-auto px-4 py-2 rounded font-medium text-primary-700 border border-primary-300 bg-white hover:bg-primary-50"
          >목록</button>
        </div>
      </section>
    </ProtectedAdminRoute>
  );
}

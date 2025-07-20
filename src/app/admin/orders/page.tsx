// src/app/admin/orders/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import AdminOrderTable from '@/components/admin/AdminOrderTable';
import { AdminOrdersService } from '@/services/admin/admin-orders.service';
import type { AdminOrder } from '@/types/admin/admin-orders';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    AdminOrdersService.getAll()
      .then(setOrders)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProtectedAdminRoute>
      <h1>주문 관리</h1>
      <AdminOrderTable
        orders={orders}
        onDetail={id => router.push(`/admin/orders/${id}`)}
      />
      {isLoading && <div>로딩 중...</div>}
    </ProtectedAdminRoute>
  );
}

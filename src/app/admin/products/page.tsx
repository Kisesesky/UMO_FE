// src/app/admin/products/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import AdminProductTable from '@/components/admin/AdminProductTable';
import { AdminProductsService } from '@/services/admin/admin-products.service';
import type { AdminProduct } from '@/types/admin/admin-products';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    AdminProductsService.getAll().then(setProducts);
  }, []);

  return (
    <ProtectedAdminRoute>
      <h1>상품 관리</h1>
      <button onClick={() => router.push('/admin/products/new')}>신규 상품 등록</button>
      <AdminProductTable
        products={products}
        onEdit={id => router.push(`/admin/products/${id}`)}
        // onDelete나 기타 액션 필요시 props로 넘기세요.
      />
    </ProtectedAdminRoute>
  );
}

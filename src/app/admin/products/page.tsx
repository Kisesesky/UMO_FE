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
      <section className="max-w-5xl mx-auto py-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">상품 관리</h1>
          <button
            onClick={() => router.push('/admin/products/new')}
            className="px-4 py-2 bg-primary-700 text-white rounded-lg font-semibold shadow hover:bg-primary-800 transition-colors"
          >
            신규 상품 등록
          </button>
        </header>
        <div className="bg-white rounded-xl shadow p-5">
          <AdminProductTable
            products={products}
            onEdit={id => router.push(`/admin/products/${id}`)}
            onDelete={id => {
              // 삭제 전에 confirm(예: JS confirm) 사용하는 것 권장
              if (!confirm('정말로 삭제하시겠습니까?')) return;
              AdminProductsService.remove(id)
                .then(() => setProducts(prev => prev.filter(p => p.id !== id)));
            }}
          />
        </div>
      </section>
    </ProtectedAdminRoute>
  );
}

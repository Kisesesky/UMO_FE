// src/app/admin/products/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminProductsService } from '@/services/admin/admin-products.service';
import type { AdminProduct } from '@/types/admin/admin-products';
import { productTypeLabel } from '../../utils/productTypeLabel';

export default function AdminProductDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id = idParam ? Number(idParam) : null;
  const router = useRouter();
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = () => {
    if (id === null || isNaN(id)) {
      setProduct(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    AdminProductsService.getById(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchProduct(); }, [idParam]);

  const handleDelete = async () => {
    if (id === null) return;
    if (!confirm('정말로 삭제하시겠습니까?')) return;
    await AdminProductsService.remove(id);
    alert('삭제 완료');
    router.push('/admin/products');
  };

  if (loading) return <div>로딩...</div>;
  if (!product) return <div>상품이 없습니다.</div>;

  return (
    <ProtectedAdminRoute>
      <section className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-bold mb-6">
          상품 상세 <span className="text-primary-600">#{product.id}</span>
        </h2>
        <ul className="divide-y text-sm mb-8">
          <li className="py-2 flex justify-between"><b className="text-gray-600">이름</b><span>{product.name}</span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">설명</b><span>{product.description ?? '-'}</span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">타입</b><span>{productTypeLabel(product.productType)}</span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">가격</b>
            <span>{Number(product.price).toLocaleString()} <span className="text-gray-500">{product.currencyType}</span></span></li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">상태</b>
            <span className={
              product.isActive
                ? 'inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-700'
                : 'inline-block rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500'
            }>
              {product.isActive ? '활성' : '비활성'}
            </span>
          </li>
          <li className="py-2 flex justify-between"><b className="text-gray-600">수정일</b>
            <span>{product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : '-'}</span></li>
        </ul>
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/products/${id}/edit`)}
            className="px-4 py-2 rounded font-medium text-white bg-primary-600 hover:bg-primary-700"
          >수정</button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded font-medium text-white bg-red-600 hover:bg-red-700"
          >삭제</button>
          <button
            onClick={() => router.push('/admin/products')}
            className="ml-auto px-4 py-2 rounded font-medium text-primary-700 border border-primary-300 bg-white hover:bg-primary-50"
          >목록으로</button>
        </div>
      </section>
    </ProtectedAdminRoute>
  );
}

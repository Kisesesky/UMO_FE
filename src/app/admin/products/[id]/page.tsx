// src/app/admin/products/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import { AdminProductsService } from '@/services/admin/admin-products.service';
import type { AdminProduct } from '@/types/admin/admin-products';

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

  useEffect(() => {
    fetchProduct();
  }, [idParam]);

  const handleDelete = async () => {
    if (id === null) return;
    await AdminProductsService.remove(id);
    alert('삭제 완료');
    router.push('/admin/products');
  };

  if (loading) return <div>로딩...</div>;
  if (!product) return <div>상품이 없습니다.</div>;

  return (
    <ProtectedAdminRoute>
      <h2>상품상세 #{product.id}</h2>
      <div>이름: {product.name}</div>
      <div>설명: {product.description}</div>
      <div>가격: {product.price} {product.currencyType}</div>
      <div>상태: {product.isActive ? '활성' : '비활성'}</div>
      <button onClick={() => router.push(`/admin/products/${id}/edit`)}>수정</button>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={() => router.push('/admin/products')}>목록으로</button>
    </ProtectedAdminRoute>
  );
}

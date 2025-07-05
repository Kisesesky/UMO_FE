import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">상품 정보를 불러오는 중...</div>}>
      <ProductsClient />
    </Suspense>
  );
}

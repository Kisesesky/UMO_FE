// src/app/products/page.tsx
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">로딩 중...</div>}>
      <ProductsClient />
    </Suspense>
  );
}

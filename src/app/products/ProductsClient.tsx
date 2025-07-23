// src/app/products/ProductsClient.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ProductService } from '@/services/product.service';
import { Product } from '@/types/product';
import { FaArrowLeft, FaShoppingCart, FaTicketAlt } from 'react-icons/fa';
import ModernScrollbar from '@/components/custom-scrollbar/ModernScrollbar';

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productType = searchParams.get('type');

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetched = productType
          ? await ProductService.getProductsByType(productType)
          : await ProductService.getAllProducts();
        setProducts(fetched);
      } catch (err: any) {
        setError(err.response?.data?.message || '상품 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [productType]);

  return (
    <ProtectedRoute>
      <div className="app-container flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-2 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:bg-gray-800 transition-colors"
            aria-label="뒤로"
          >
            <FaArrowLeft size={18} className="text-gray-700 dark:text-white" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white flex-1 text-center pr-8">
            {productType === 'PASS' ? '이용권 구매' : '상품 둘러보기'}
          </h1>
        </header>

        <main className="flex-1 flex flex-col items-center px-4 pt-4 pb-10 w-full max-w-md mx-auto relative">
          <ModernScrollbar className="w-full h-full">
            <div className="w-full max-w-md">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500" />
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center">
                  {error}
                </div>
              ) : products.length === 0 ? (
                <div className="bg-white shadow rounded-lg text-center p-6 text-gray-500 dark:text-white">
                  표시할 상품이 없습니다.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-5 space-y-2">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-white">{product.description}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xl font-bold text-indigo-600">
                            {product.price} {product.currencyType}
                          </span>
                          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
                            <FaShoppingCart size={14} />
                            구매하기
                          </button>
                        </div>
                        {product.productType === 'PASS' && product.durationDays && (
                          <div className="mt-2 text-sm text-gray-500 dark:text-white flex items-center gap-1">
                            <FaTicketAlt className="text-indigo-500" />
                            <span>{product.durationDays}일 이용권</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ModernScrollbar>
        </main>
      </div>
    </ProtectedRoute>
  );
}

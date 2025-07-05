// src/app/products/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaShoppingCart, FaTicketAlt, FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { ProductService } from '@/services/product.service';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productType = searchParams.get('type'); // URL 쿼리 파라미터에서 상품 타입 가져오기

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let fetchedProducts: Product[] = [];
        if (productType) {
          fetchedProducts = await ProductService.getProductsByType(productType);
        } else {
          fetchedProducts = await ProductService.getAllProducts();
        }
        setProducts(fetchedProducts);
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
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4"
            >
              <FaArrowLeft />
            </button>
            <h1 className="header-title">{productType === 'PASS' ? '이용권 구매' : '상품 둘러보기'}</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>표시할 상품이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-indigo-600">
                        {product.price} {product.currencyType}
                      </span>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-1">
                        <FaShoppingCart /> 구매하기
                      </button>
                    </div>
                    {product.productType === 'PASS' && product.durationDays && (
                      <div className="mt-3 text-sm text-gray-500 flex items-center gap-1">
                        <FaTicketAlt className="text-indigo-500" />
                        <span>{product.durationDays}일 이용권</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
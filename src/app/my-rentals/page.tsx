// src/app/my-rentals/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaHistory, FaUmbrella, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Rental } from '@/types/rental';
import { RentalService } from '@/services/rental.service';

export default function MyRentalsPage() {
  const router = useRouter();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedRentals = await RentalService.getMyRentals();
        setRentals(fetchedRentals);
      } catch (err: any) {
        setError(err.response?.data?.message || '대여 내역을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRentals();
  }, []);

  // 대여 상태에 따른 배지 색상 및 텍스트
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return { color: 'bg-yellow-100 text-yellow-800', text: '대여 요청 중' };
      case 'RENTED':
        return { color: 'bg-blue-100 text-blue-800', text: '대여 중' };
      case 'RETURNED':
        return { color: 'bg-green-100 text-green-800', text: '반납 완료' };
      case 'LOST':
        return { color: 'bg-red-100 text-red-800', text: '분실' };
      case 'CANCELED':
        return { color: 'bg-gray-100 text-gray-800', text: '취소됨' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: status };
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
            <h1 className="header-title">이용 내역</h1>
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
          ) : rentals.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              <FaHistory className="mx-auto text-4xl mb-3 text-gray-400" />
              <p>이용 내역이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {rentals.map(rental => {
                const statusBadge = getStatusBadge(rental.status);
                return (
                  <div key={rental.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <FaUmbrella className="text-indigo-500" />
                          <h3 className="font-semibold">
                            우산 {rental.umbrella?.code || `#${rental.umbrellaId}`}
                          </h3>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${statusBadge.color}`}>
                          {statusBadge.text}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>대여: {rental.rentalStationId} 대여소</span>
                        </div>
                        {rental.returnStationId && (
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gray-400" />
                            <span>반납: {rental.returnStationId} 대여소</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          <span>대여 시작: {formatDate(rental.rentalStart)}</span>
                        </div>
                        {rental.rentalEnd && (
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400" />
                            <span>대여 종료: {formatDate(rental.rentalEnd)}</span>
                          </div>
                        )}
                        {rental.status === 'RETURNED' && (
                          <div className="flex items-center gap-2">
                            <FaClock className="text-gray-400" />
                            <span>요금: {rental.totalFee} 츄르</span>
                          </div>
                        )}
                      </div>
                      
                      {rental.status === 'RENTED' && (
                        <div className="mt-3 flex justify-end gap-2">
                          <button 
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded"
                            onClick={() => router.push(`/return?rentalId=${rental.id}`)}
                          >
                            반납하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

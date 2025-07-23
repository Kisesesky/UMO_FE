// src/app/my-rentals/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import {
  FaArrowLeft,
  FaHistory,
  FaUmbrella,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock
} from 'react-icons/fa';
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
        return { color: 'bg-gray-100 text-gray-600', text: '취소됨' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: status };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProtectedRoute>
      <div className="app-container flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-2 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="뒤로"
          >
            <FaArrowLeft size={18} className="text-gray-700 dark:text-white" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white flex-1 text-center pr-8">이용 내역</h1>
        </header>

        <main className="flex-1 flex flex-col items-center px-6 py-6 overflow-y-auto">
          <div className="w-full max-w-md">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded text-center">
                {error}
              </div>
            ) : rentals.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500 dark:text-gray-300">
                <FaHistory className="mx-auto text-4xl mb-3 text-gray-400" />
                <p className="text-sm">이용 내역이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {rentals.map((rental) => {
                  const statusBadge = getStatusBadge(rental.status);
                  return (
                    <div key={rental.id} className="bg-white dark:bg-gray-700 rounded-2xl shadow p-5">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <FaUmbrella className="text-indigo-700" />
                          <span className="font-semibold text-gray-800 dark:text-white">
                            우산 {rental.umbrella?.code || `#${rental.umbrellaId}`}
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${statusBadge.color}`}
                        >
                          {statusBadge.text}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-700 dark:text-white">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>대여소: {rental.rentalStationId}</span>
                        </div>
                        {rental.returnStationId && (
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gray-400" />
                            <span>반납소: {rental.returnStationId}</span>
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
                        <div className="mt-4 text-right">
                          <button
                            onClick={() => router.push(`/return?rentalId=${rental.id}`)}
                            className="inline-block px-4 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition"
                          >
                            반납하기
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

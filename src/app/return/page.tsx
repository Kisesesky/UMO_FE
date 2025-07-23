// src/app/return/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useRentalStore } from '../../store/rental.store';
import { Station } from '../../types/rental';
import { FaArrowLeft } from 'react-icons/fa';

export default function ReturnPage() {
  const router = useRouter();
  const {
    stations, activeRental, isLoading, error,
    fetchStations, fetchActiveRental, returnUmbrella
  } = useRentalStore();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  useEffect(() => {
    fetchStations();
    fetchActiveRental();
  }, [fetchStations, fetchActiveRental]);

  const handleReturnUmbrella = async () => {
    if (!activeRental || !selectedStation) return;

    try {
      await returnUmbrella(activeRental.id, selectedStation.id);
      alert('우산 반납이 완료되었습니다!');
      router.push('/dashboard');
    } catch (error: any) {
      alert(`우산 반납 실패: ${error.message || '알 수 없는 오류가 발생했습니다.'}`);
    }
  };

  // 대여 중인 우산이 없는 경우
  if (!activeRental || activeRental.status !== 'RENTED') {
    return (
      <ProtectedRoute>
        <div className="app-container flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* 헤더 */}
          <header className="bg-white dark:bg-gray-800 shadow-sm p-2 flex items-center">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="뒤로"
              type="button"
            >
              <FaArrowLeft size={18} className="text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex-1 text-center pr-8">
              우산 반납
            </h1>
          </header>
          <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-10 overflow-y-auto">
            <div className="w-full max-w-sm mt-4">
              <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-lg mb-4 shadow">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-yellow-400 dark:text-yellow-300 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                    현재 대여 중인 우산이 없습니다.
                  </span>
                </div>
                <button
                  onClick={() => router.push('/rent')}
                  className="mt-4 w-full py-2 px-3 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
                  type="button"
                >
                  우산 대여하기
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="mt-2 w-full py-2 px-3 rounded-lg border font-medium text-yellow-900 dark:text-yellow-400 bg-white dark:bg-gray-800 shadow hover:bg-yellow-100 dark:hover:bg-yellow-900 transition"
                  type="button"
                >
                  대시보드로 돌아가기
                </button>
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="app-container flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* 헤더 */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-2 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="뒤로"
            type="button"
          >
            <FaArrowLeft size={18} className="text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex-1 text-center pr-8">
            우산 반납
          </h1>
        </header>

        <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-10 overflow-y-auto">
          <div className="w-full max-w-sm mt-4 space-y-6">
            {/* 현재 대여 정보 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">현재 대여 중인 우산</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">반납할 우산 정보입니다.</div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500 dark:text-gray-400">우산 코드</span>
                  <span className="text-gray-900 dark:text-gray-100">{activeRental.umbrella?.code || '정보 없음'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500 dark:text-gray-400">대여 시작</span>
                  <span className="text-gray-900 dark:text-gray-100">{new Date(activeRental.rentalStart).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500 dark:text-gray-400">대여소</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {stations.find(s => s.id === activeRental.rentalStationId)?.name || '정보 없음'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500 dark:text-gray-400">보증금</span>
                  <span className="text-gray-900 dark:text-gray-100">{activeRental.depositAmount} 츄르</span>
                </div>
              </div>
            </div>

            {/* 반납할 대여소 선택 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">반납할 대여소 선택</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">우산을 반납할 대여소를 선택하세요.</div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-y-auto">
                {stations.map((station) => (
                  <li key={station.id}>
                    <button
                      onClick={() => setSelectedStation(station)}
                      className={`w-full flex flex-col text-left px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-700 rounded-md ${
                        selectedStation?.id === station.id ? 'bg-indigo-100 dark:bg-indigo-900' : ''
                      }`}
                      type="button"
                    >
                      <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">{station.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{station.address}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 반납 버튼 */}
            <div className="flex justify-end">
              <button
                onClick={handleReturnUmbrella}
                disabled={!selectedStation || isLoading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow text-white ${
                  isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-800'
                }`}
                type="button"
              >
                {isLoading ? '반납 처리 중...' : '반납하기'}
              </button>
            </div>

            {/* 에러 및 로딩 */}
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-300"></div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mt-3 text-sm">
                {error}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

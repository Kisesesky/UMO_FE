// src/app/return/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { useRentalStore } from '../../store/rental.store';
import { Station } from '../../types/rental';

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
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">우산 반납</h1>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-indigo-600 hover:text-indigo-900"
              >
                대시보드로 돌아가기
              </button>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        현재 대여 중인 우산이 없습니다.
                      </p>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            onClick={() => router.push('/rent')}
                            className="bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
                          >
                            우산 대여하기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">우산 반납</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-indigo-600 hover:text-indigo-900"
            >
              대시보드로 돌아가기
            </button>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              ) : (
                <>
                  {/* 현재 대여 정보 */}
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        현재 대여 중인 우산
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        반납할 우산 정보입니다.
                      </p>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">우산 코드</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {activeRental.umbrella?.code || '정보 없음'}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">대여 시작</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {new Date(activeRental.rentalStart).toLocaleString()}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">대여소</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {stations.find(s => s.id === activeRental.rentalStationId)?.name || '정보 없음'}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">보증금</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {activeRental.depositAmount} 츄르
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* 반납할 대여소 선택 */}
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        반납할 대여소 선택
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        우산을 반납할 대여소를 선택하세요.
                      </p>
                    </div>
                    <div className="border-t border-gray-200">
                      <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                        {stations.map((station) => (
                          <li key={station.id}>
                            <button
                              onClick={() => setSelectedStation(station)}
                              className={`w-full text-left px-6 py-4 flex items-center hover:bg-gray-50 ${
                                selectedStation?.id === station.id ? 'bg-indigo-50' : ''
                              }`}
                            >
                              <div>
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                  {station.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {station.address}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 반납 버튼 */}
                  {selectedStation && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleReturnUmbrella}
                        disabled={isLoading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      >
                        {isLoading ? '반납 처리 중...' : '반납하기'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

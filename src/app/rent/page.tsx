'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { useRentalStore } from '../../store/rental.store';
import { useWalletStore } from '../../store/wallet.store';
import { Station, Umbrella } from '../../types/rental';

export default function RentPage() {
  const router = useRouter();
  const {
    stations, selectedStation, umbrellas, activeRental,
    isLoading, error, fetchStations, selectStation,
    fetchActiveRental, rentUmbrella
  } = useRentalStore();

  const { wallet, fetchWallet } = useWalletStore();
  const [selectedUmbrella, setSelectedUmbrella] = useState<Umbrella | null>(null);

  useEffect(() => {
    fetchStations();
    fetchActiveRental();
    fetchWallet();
  }, [fetchStations, fetchActiveRental, fetchWallet]);

  const handleStationSelect = (station: Station) => {
    selectStation(station);
    setSelectedUmbrella(null);
  };

  const handleRentUmbrella = async () => {
    if (!selectedUmbrella) return;

    try {
      await rentUmbrella(selectedUmbrella.id);
      alert('우산 대여 요청이 완료되었습니다!');
      router.push('/dashboard');
    } catch (error: any) {
      alert(`우산 대여 실패: ${error.message || '알 수 없는 오류가 발생했습니다.'}`);
    }
  };

  if (activeRental) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">우산 대여</h1>
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
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        이미 대여 중인 우산이 있습니다. 새로운 우산을 대여하기 전에 현재 우산을 반납해주세요.
                      </p>
                      <div className="mt-4 flex -mx-2 -my-1.5">
                        <button
                          onClick={() => router.push('/dashboard')}
                          className="bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
                        >
                          대시보드로 이동
                        </button>
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
            <h1 className="text-3xl font-bold text-gray-900">우산 대여</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">츄르 잔액:</span> {wallet?.churuBalance || 0} 츄르
              </div>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-indigo-600 hover:text-indigo-900"
              >
                대시보드로 돌아가기
              </button>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* 대여소 목록 */}
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                      <h3 className="text-lg font-medium text-gray-900">대여소 목록</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        우산을 대여할 대여소를 선택하세요.
                      </p>
                    </div>
                    <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                      {stations.map((station) => (
                        <li key={station.id}>
                          <button
                            onClick={() => handleStationSelect(station)}
                            className={`w-full text-left px-6 py-4 flex items-center hover:bg-gray-50 ${
                              selectedStation?.id === station.id ? 'bg-indigo-50' : ''
                            }`}
                          >
                            <div>
                              <p className="text-sm font-medium text-indigo-600 truncate">{station.name}</p>
                              <p className="text-sm text-gray-500">{station.address}</p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 우산 목록 */}
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                      <h3 className="text-lg font-medium text-gray-900">우산 목록</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {selectedStation
                          ? `${selectedStation.name}에서 대여 가능한 우산 목록입니다.`
                          : '왼쪽에서 대여소를 선택하세요.'}
                      </p>
                    </div>
                    {selectedStation ? (
                      umbrellas.length > 0 ? (
                        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                          {umbrellas.map((umbrella) => (
                            <li key={umbrella.id}>
                              <button
                                onClick={() => setSelectedUmbrella(umbrella)}
                                className={`w-full text-left px-6 py-4 flex items-center hover:bg-gray-50 ${
                                  selectedUmbrella?.id === umbrella.id ? 'bg-indigo-50' : ''
                                }`}
                              >
                                <div>
                                  <p className="text-sm font-medium text-indigo-600 truncate">
                                    우산 코드: {umbrella.code}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    상태: {umbrella.status === 'AVAILABLE' ? '대여 가능' : '대여 불가'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    대여료: {umbrella.rentalFeePerHour} 츄르/시간
                                  </p>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-6 py-4 text-sm text-gray-500">
                          이 대여소에는 현재 대여 가능한 우산이 없습니다.
                        </div>
                      )
                    ) : (
                      <div className="px-6 py-4 text-sm text-gray-500">
                        왼쪽에서 대여소를 선택하세요.
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* 대여 버튼 */}
              {selectedUmbrella && (
                <div className="mt-6 bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">우산 대여 확인</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>선택한 우산을 대여하시겠습니까?</p>
                      <p className="mt-2">
                        <span className="font-medium text-gray-900">대여소:</span> {selectedStation?.name}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">우산 코드:</span> {selectedUmbrella.code}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">보증금:</span> 500 츄르
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">1일 대여료:</span> 150 츄르
                      </p>
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={handleRentUmbrella}
                        disabled={isLoading}
                        className={`inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white ${
                          isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
                      >
                        {isLoading ? '대여 처리 중...' : '대여하기'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

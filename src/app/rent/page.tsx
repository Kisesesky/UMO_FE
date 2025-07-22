// src/app/rent/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { useRentalStore } from '../../store/rental.store';
import { useWalletStore } from '../../store/wallet.store';
import { Station, Umbrella } from '../../types/rental';
import { FaArrowLeft } from 'react-icons/fa';

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

  // 이미 대여 중
  if (activeRental) {
    return (
      <ProtectedRoute>
        <div className="app-container flex flex-col min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm p-2 flex items-center">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="뒤로"
            >
              <FaArrowLeft size={18} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center pr-8">우산 대여</h1>
          </header>
          <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-10 overflow-y-auto">
            <div className="w-full max-w-sm mt-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-yellow-700 font-medium">
                    이미 대여 중인 우산이 있습니다. 반납 후 새로 대여하세요.
                  </span>
                </div>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="mt-4 w-full py-2 px-3 rounded-lg border font-medium bg-white text-yellow-900 shadow hover:bg-yellow-100 transition"
                >
                  대시보드로 이동
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
      <div className="app-container flex flex-col min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-2 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="뒤로"
          >
            <FaArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center pr-8">우산 대여</h1>
        </header>
        <main className="flex-1 flex flex-col items-center px-4 pt-4 pb-10 overflow-y-auto">
          <div className="w-full max-w-sm mt-4 space-y-7">
            {/* 잔액 · 에러 · 로딩 */}
            <div className="flex justify-between items-center space-x-2">
              <span className="font-medium text-gray-700">츄르 잔액:</span>
              <span className="px-2 py-1 bg-indigo-50 rounded font-bold text-indigo-600">
                {wallet?.churuBalance ?? 0} 츄르
              </span>
            </div>
            {isLoading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* 대여소, 우산 목록 */}
            <div className="bg-white rounded-xl shadow space-y-4 p-4">
              <h3 className="text-lg font-bold text-gray-900">대여소 선택</h3>
              <p className="text-sm text-gray-500 mb-1">우산을 대여할 대여소를 선택하세요.</p>
              <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
                {stations.map(station => (
                  <li key={station.id}>
                    <button
                      onClick={() => handleStationSelect(station)}
                      className={`w-full text-left px-4 py-3 flex items-center hover:bg-indigo-50 rounded-md ${
                        selectedStation?.id === station.id ? 'bg-indigo-100' : ''
                      }`}
                    >
                      <div>
                        <span className="text-sm font-semibold text-indigo-700">{station.name}</span>
                        <div className="text-xs text-gray-500">{station.address}</div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow space-y-4 p-4">
              <h3 className="text-lg font-bold text-gray-900">우산 선택</h3>
              <p className="text-sm text-gray-500 mb-1">
                {selectedStation ? `${selectedStation.name}에서 대여 가능한 우산입니다.` : '대여소를 먼저 선택하세요.'}
              </p>
              {selectedStation ? (
                umbrellas.length > 0 ? (
                  <ul className="divide-y divide-gray-200 max-h-48 overflow-y-auto">
                    {umbrellas.map((umbrella) => (
                      <li key={umbrella.id}>
                        <button
                          onClick={() => setSelectedUmbrella(umbrella)}
                          className={`w-full text-left px-4 py-3 flex items-center hover:bg-indigo-50 rounded-md ${
                            selectedUmbrella?.id === umbrella.id ? 'bg-indigo-100' : ''
                          }`}
                        >
                          <div>
                            <span className="text-sm font-medium text-indigo-700">
                              우산 코드: {umbrella.code}
                            </span>
                            <div className="text-xs text-gray-500">
                              상태: {umbrella.status === 'AVAILABLE' ? '대여 가능' : '대여 불가'}
                            </div>
                            <div className="text-xs text-gray-500">
                              대여료: {umbrella.rentalFeePerHour} 츄르/시간
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-2 py-3 text-sm text-gray-400">이 대여소에는 대여가능 우산이 없습니다.</div>
                )
              ) : (
                <div className="px-2 py-3 text-sm text-gray-400">대여소를 먼저 선택하세요.</div>
              )}
            </div>

            {/* 대여 확인 */}
            {selectedUmbrella && (
              <div className="bg-white rounded-xl shadow p-4 mt-2">
                <h3 className="text-lg font-bold text-gray-900 mb-2">대여 확인</h3>
                <div className="text-sm text-gray-500">
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
                    <span className="font-medium text-gray-900">1시간 대여료:</span> {selectedUmbrella.rentalFeePerHour} 츄르
                  </p>
                </div>
                <button
                  onClick={handleRentUmbrella}
                  disabled={isLoading}
                  className={`mt-5 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white ${
                    isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none`}
                >
                  {isLoading ? '대여 처리 중...' : '대여하기'}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

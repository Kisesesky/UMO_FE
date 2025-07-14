// src/app/page.tsx
'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Drawer from '@/components/drawer';
import MapControls from '@/components/map-controls';
import WeatherInfo from '@/components/weather';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState, useEffect } from 'react';

import { useStationMarkers } from '@/hooks/useStationMarkers';
import { useUserMarkers } from '@/hooks/useUserMarkers';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';

import type { KakaoMapRef } from '@/types/kakao-types';

const KakaoMap = dynamic(
  () => import('@/components/kakao-map').then(mod => mod.default),
  { ssr: false }
);

export default function HomePage() {
  const router = useRouter();
  const mapRef = useRef<KakaoMapRef>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // stations & markers 훅 (stations 상태 + 마커 관리)
  const { stations, addMarkersToMap } = useStationMarkers(mapRef);

  // 사용자 위치 마커 훅
  const { setUserMarker } = useUserMarkers();

  // 현재 위치 훅

  const { userCoords, fetchCurrentPosition, moveToCurrentLocation } = useCurrentLocation(mapRef);

  // KakaoMap이 준비되었을 때
  const handleMapLoad = useCallback((mapInstance: KakaoMapRef) => {
    mapRef.current = mapInstance;
    setIsMapReady(true);
    if (stations.length > 0) {
      addMarkersToMap();
    }
  }, [addMarkersToMap, stations.length]);

  // stations 바뀌면 마커 갱신
  useEffect(() => {
    if (isMapReady && stations.length > 0) {
      addMarkersToMap();
    }
  }, [isMapReady, stations, addMarkersToMap]);

  useEffect(() => {
    if (isMapReady) {
      moveToCurrentLocation(); // 지도 로드 완료 후 한 번만 호출
    }
  }, [isMapReady]);

  // 페이지 첫 렌더 시 현재 위치 가져오기
  useEffect(() => {
    fetchCurrentPosition();
  }, [fetchCurrentPosition]);

  // 현재 위치 버튼 클릭 시
  const handleCurrentLocation = useCallback(() => {
    if (!mapRef.current) {
      console.error('지도 참조가 없습니다.');
      return;
    }
    moveToCurrentLocation();
    // 마커도 갱신
    if (userCoords) {
      const kakaoMaps = window.kakao.maps;
      const position = new kakaoMaps.LatLng(userCoords.latitude, userCoords.longitude);
      const mapInstance = mapRef.current.getMapInstance();
      if (mapInstance) {
        setUserMarker(mapInstance, position);
      }
    }
  }, [moveToCurrentLocation, setUserMarker, userCoords]);

  // 새로고침 버튼 핸들러
  const handleRefresh = () => {
    setIsRefreshing(true);
    if (mapRef.current) {
      const mapInstance = mapRef.current.getMapInstance();
      if (mapInstance) {
        const center = mapInstance.getCenter();
        mapInstance.setCenter(center);
        mapInstance.setLevel(3);
      }
    }
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // 대여 페이지 이동
  const handleRentClick = () => {
    router.push('/rent');
  };

  return (
    <ProtectedRoute checkAuth={false}>
      <div className="app-container">
        <div className="map-container">
          <KakaoMap onMapLoad={handleMapLoad} />
        </div>

        <div className="ui-container">
          <div className="top-search-bar-container">
            <div className="search-bar">
              <div className="absolute inset-y-0 left-4 pl-3 flex items-center pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m1.35-4.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input type="text" placeholder="어디로 가시나요?" className="search-input pl-10 pr-3" />
              <div className="flex items-center gap-2 pr-2">
                <button className="icon-button-small">
                  {/* 벨 아이콘 */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <button className="icon-button-small" onClick={() => setIsDrawerOpen(true)}>
                  {/* 메뉴 아이콘 */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-600"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute top-20 left-4 w-64 z-10">
            {userCoords && <WeatherInfo latitude={userCoords.latitude} longitude={userCoords.longitude} />}
          </div>

          <div className="controls-container">
            <MapControls
              onRefresh={handleRefresh}
              onCurrentLocation={handleCurrentLocation}
              isRefreshing={isRefreshing}
            />
          </div>

          <div className="rent-button-container">
            <button className="rent-button" onClick={handleRentClick}>
              {/* 대여중이면 반납, 아니면 대여 */}
              {stations.length > 0 ? '반납하기' : '대여하기'}
            </button>
          </div>
        </div>

        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </ProtectedRoute>
  );
}

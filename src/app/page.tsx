// src/app/page.tsx
'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Drawer from '@/components/drawer';
import MapControls from '@/components/map-controls';
import WeatherInfo from '@/components/weather';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useStationMarkers } from '@/hooks/useStationMarkers';
import { useUserMarkers } from '@/hooks/useUserMarkers';
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

  // 토글 검색 상태
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

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

  // 검색 토글 핸들러
  const handleToggleSearch = () => setIsSearchOpen(open => !open);

  // searchbar 외부 클릭 시, ESC 닫기
  useEffect(() => {
    if (!isSearchOpen) return;
  
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
  
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSearchOpen]);

  return (
    <ProtectedRoute checkAuth={false}>
      <div className="app-container">
        <div className="map-container relative z-0">
          <KakaoMap onMapLoad={handleMapLoad} />
        </div>

        <div className="ui-container relative z-10 pointer-events-none">
          {/* ----- 상단 바 ----- */}
          <div className="flex items-center justify-between px-4 py-4 pointer-events-auto">
            {/* 왼쪽: ○ 또는 pill 검색바 */}
            <div className="flex-1 flex">
              {!isSearchOpen ? (
                <button
                  onClick={handleToggleSearch}
                  aria-label="검색 창 열기"
                  className="w-12 h-12 flex items-center justify-center rounded-full border-4 border-indigo-300 
                    bg-white transition-transform duration-300 ease-in-out transform 
                    hover:scale-105 active:scale-90 shadow-md hover:shadow-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.35)', // 내부 채우기
                    border: '13px solid #6366F1', // 테두리만 퍼플
                  }}
                >
                  {/* ◎ 스타일 SVG */}
                  <svg viewBox="0 0 40 40" width={22} height={22}>
                    <circle cx="20" cy="20" r="17" stroke="#fff" strokeWidth="4" fill="none" />
                    <circle cx="20" cy="20" r="15" fill="#fff" fillOpacity={0.4} />
                  </svg>
                </button>
              ) : (
                // pill형 검색바: animation & 그라데이션
                <div
                  ref={searchBarRef}
                  className={`
                    flex items-center w-full max-w-xl px-6 py-3
                    rounded-full shadow-md transition-all duration-300 transform scale-95
                    animate-fade-in border-2 border-[#6366F1]/70
                    backdrop-blur-md
                  `}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.35)', // 전문적인 투명도
                  }}
                >
                  <input
                    autoFocus
                    className="w-full bg-transparent border-none outline-none text-indigo-700 placeholder-indigo-400 text-base"
                    placeholder="어디로 가시나요?"
                  />
                </div>
              )}
            </div>

            {/* 오른쪽: 알람/메뉴 동그라미 버튼, pill 검색바 열렸으면 사라짐 */}
            {!isSearchOpen && (
              <div className="flex items-center gap-3 ml-2">
                {/* 알람 */}
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 border border-gray-300 shadow-md     transition-all duration-200 ease-in-out
                    hover:-translate-y-1 hover:shadow-lg"
                  aria-label="알림"
                >
                  {/* 벨 SVG */}
                  <svg width={30} height={30} fill="none" stroke="#4B5563" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {/* 메뉴 */}
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 border border-gray-300 shadow-md     transition-all duration-200 ease-in-out
                    hover:-translate-y-1 hover:shadow-lg"
                  aria-label="메뉴"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  {/* 메뉴 SVG */}
                  <svg width={30} height={30} fill="none" stroke="#4B5563" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* 나머지 UI 영역 */}
          <div className="absolute top-20 left-4 w-64 z-10 pointer-events-auto">
            {userCoords && <WeatherInfo latitude={userCoords.latitude} longitude={userCoords.longitude} />}
          </div>

          <div className="controls-container pointer-events-auto">
            <MapControls
              onRefresh={handleRefresh}
              onCurrentLocation={handleCurrentLocation}
              isRefreshing={isRefreshing}
            />
          </div>

          <div className="rent-button-container pointer-events-auto">
            <button className="rent-button" onClick={handleRentClick}>
              {stations.length > 0 ? '반납하기' : '대여하기'}
            </button>
          </div>
        </div>

        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </ProtectedRoute>
  );
}

// src/app/page.tsx
'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Drawer from '@/components/drawer';
import MapControls from '@/components/map-controls';
import WeatherInfo from '@/components/weather';
import { StationService } from '@/services/station.service';
import { useAuthStore } from '@/store/auth.store';
import { useRentalStore } from '@/store/rental.store';
import { useWalletStore } from '@/store/wallet.store';
import type { KakaoMapProps, KakaoMapRef, KakaoMarker } from '@/types/kakao';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';

import type { Station } from '@/types/rental';

// KakaoMap 컴포넌트 동적 import (SSR 비활성)
const KakaoMap = dynamic<KakaoMapProps>(
  () => import('@/components/kakao-map').then(mod => (mod as any).default),
  { ssr: false }
);

export default function HomePage() {
  const router = useRouter();

  const { user } = useAuthStore();
  const { wallet, fetchWallet } = useWalletStore();
  const { activeRental, fetchActiveRental } = useRentalStore();

  // KakaoMap ref (KakaoMapRef 타입)
  const mapRef = useRef<KakaoMapRef | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // 마커 refs
  const stationMarkersRef = useRef<KakaoMarker[]>([]);
  const userMarkerRef = useRef<KakaoMarker | null>(null);

  // 대여소 데이터 상태 및 ref (ref는 마커 관리용, 상태는 렌더링용)
  const [stations, setStations] = useState<Station[]>([]);
  const stationsRef = useRef<Station[]>([]);

  // 사용자 위치 상태
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  // Drawer 열림 상태
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 새로고침 진행 상태
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 초기 데이터 불러오기
  useEffect(() => {
    fetchWallet();
    fetchActiveRental();

    const loadStations = async () => {
      try {
        const stationData = await StationService.getAllStations();
        stationsRef.current = stationData;
        setStations(stationData);
      } catch (err) {
        console.error('대여소 정보를 불러오는데 실패했습니다:', err);
      }
    };

    loadStations();
  }, [fetchWallet, fetchActiveRental]);

  // 마커 추가 함수
  const addMarkersToMap = useCallback(() => {
    if (!mapRef.current || !window.kakao?.maps) return;

    // 기존 마커 삭제
    stationMarkersRef.current.forEach(marker => marker.setMap(null));
    stationMarkersRef.current = [];

    const kakaoMaps = window.kakao.maps;

    stationsRef.current.forEach(station => {
      const position = new kakaoMaps.LatLng(station.latitude, station.longitude);

      const marker = new kakaoMaps.Marker({
        map: mapRef.current!.getMapInstance()!,
        position,
        title: station.name,
      });

      kakaoMaps.event.addListener(marker, 'click', () => {
        const infowindow = new kakaoMaps.InfoWindow({
          content: `
            <div style="padding:10px;width:200px;">
              <h3 style="margin-bottom:5px;font-weight:bold;">${station.name}</h3>
              <p style="margin-bottom:5px;font-size:12px;">${station.address || '주소 정보 없음'}</p>
              <button 
                onclick="window.location.href='/rent?stationId=${station.id}'" 
                style="background:#4f46e5;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:12px;"
              >
                이 대여소에서 대여하기
              </button>
            </div>
          `,
        });
        infowindow.open(mapRef.current!.getMapInstance()!, marker);
      });

      stationMarkersRef.current.push(marker);
    });
  }, []);

  // KakaoMap 로드 시 호출되는 콜백
  const handleMapLoad = useCallback((mapInstance: KakaoMapRef) => {
    mapRef.current = mapInstance;
    setIsMapReady(true);

    if (stationsRef.current.length > 0) {
      addMarkersToMap();
    }
  }, [addMarkersToMap]);

  // stations 상태가 바뀌면 마커 갱신
  useEffect(() => {
    if (mapRef.current && stations.length > 0) {
      addMarkersToMap();
    }
  }, [stations, addMarkersToMap]);

  // 사용자 현재 위치 받아오기
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  // 현재 위치로 이동 및 마커 표시
  const handleCurrentLocation = useCallback(() => {
    if (!mapRef.current) {
      console.error('mapRef가 아직 설정되지 않았습니다.');
      return;
    }
  
    const mapInstance = mapRef.current.getMapInstance();
    if (!mapInstance) {
      console.error('지도 인스턴스가 아직 준비되지 않았습니다.');
      return;
    }
  
    if (!navigator.geolocation) {
      alert('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const kakaoMaps = window.kakao.maps;
        const newCenter = new kakaoMaps.LatLng(latitude, longitude);
  
        mapInstance.setCenter(newCenter);
        mapInstance.setLevel(3);
  
        // 이전 마커 제거
        if (userMarkerRef.current) {
          userMarkerRef.current.setMap(null);
          userMarkerRef.current = null;
        }
  
        // 마커 이미지 설정 (스타 마커)
        const markerImage = new kakaoMaps.MarkerImage(
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          new kakaoMaps.Size(24, 35),
          { offset: new kakaoMaps.Point(12, 35) }
        );
  
        // 새 마커 생성
        const marker = new kakaoMaps.Marker({
          position: newCenter,
          map: mapInstance,
          image: markerImage,
          title: '내 위치',
        });
  
        userMarkerRef.current = marker;
      },
      (error) => {
        console.error('Error getting current location:', error);
        let message = '현재 위치를 가져올 수 없습니다.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = '위치 권한이 거부되었습니다. 브라우저의 위치 권한을 허용해주세요.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = '위치 정보를 사용할 수 없습니다.';
            break;
          case error.TIMEOUT:
            message = '위치 정보 요청 시간이 초과되었습니다.';
            break;
        }
        alert(message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);  

  // 새로고침 핸들러 (레벨 유지하며 중심 다시 설정)
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

  // 대여/반납 페이지 이동 핸들러
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
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="어디로 가시나요?"
                className="search-input pl-10 pr-3"
              />
              <div className="flex items-center gap-2 pr-2">
                <button className="icon-button-small">
                  <FaBell size={18} color="#666" />
                </button>
                <button
                  className="icon-button-small"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <FaBars size={18} color="#666" />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute top-20 left-4 w-64 z-10">
            {userCoords && (
              <WeatherInfo latitude={userCoords.latitude} longitude={userCoords.longitude} />
            )}
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
              {activeRental ? '반납하기' : '대여하기'}
            </button>
          </div>
        </div>

        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </ProtectedRoute>
  );
}

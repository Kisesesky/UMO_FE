// src/hooks/useCurrentLocation.ts
import { useCallback, useRef, useState } from 'react';
import type { KakaoMapRef, KakaoMarker } from '@/types/kakao-types';

export function useCurrentLocation(mapRef: React.RefObject<KakaoMapRef | null>) {
  const userMarkerRef = useRef<KakaoMarker | null>(null);
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  // 위치 가져오기(초기 혹은 필요 시 호출)
  const fetchCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      pos => setUserCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      err => console.error('위치 정보를 가져오는데 실패:', err)
    );
  }, []);

  // 지도 중심 이동 및 사용자 위치 마커 표시
  const moveToCurrentLocation = useCallback(() => {
    if (!mapRef.current) return;

    const mapInstance = mapRef.current.getMapInstance();
    if (!mapInstance) return;

    if (!navigator.geolocation) {
      alert('위치 서비스를 지원하지 않는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        const kakaoMaps = window.kakao.maps;
        const newCenter = new kakaoMaps.LatLng(latitude, longitude);

        mapInstance.setCenter(newCenter);
        mapInstance.setLevel(3);

        if (userMarkerRef.current) {
          userMarkerRef.current.setMap(null);
          userMarkerRef.current = null;
        }

        const markerImage = new kakaoMaps.MarkerImage(
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          new kakaoMaps.Size(24, 35),
          { offset: new kakaoMaps.Point(12, 35) }
        );

        const marker = new kakaoMaps.Marker({
          position: newCenter,
          map: mapInstance,
          image: markerImage,
          title: '내 위치',
        });

        userMarkerRef.current = marker;
        setUserCoords({ latitude, longitude });
      },
      err => {
        console.error('위치 정보를 가져오는 중 오류 발생:', err);
        alert('현재 위치를 가져올 수 없습니다.');
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [mapRef.current]);

  return {
    userCoords,
    fetchCurrentPosition,
    moveToCurrentLocation,
  };
}

// src/components/kakao-map/KakaoMap.tsx

'use client';

import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import type { KakaoMap, KakaoMapRef, KakaoMapProps, LatLng } from '@/types/kakao';

const KakaoMap = forwardRef<KakaoMapRef, KakaoMapProps>(({
  center = { lat: 37.5665, lng: 126.978 },
  level = 3,
  onMapLoad,
  onClick,
  onDragEnd,
  onZoomChanged,
  onMouseMove,
  autoCenterCurrentLocation = false,
  onGeolocationError,
}, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<KakaoMap | null>(null);
  const markersRef = useRef<any[]>([]);
  const currentLocationMarkerRef = useRef<any | null>(null);
  const eventListenersRef = useRef<any[]>([]);

  // 이벤트 리스너 등록
  const addEventListener = (target: any, eventName: string, handler: any) => {
    if (!window.kakao?.maps) return;
    const listener = window.kakao.maps.event.addListener(target, eventName, handler);
    eventListenersRef.current.push(listener);
  };

  // KakaoMapRef 객체
  const imperativeRef: KakaoMapRef = {
    getMapInstance: () => map,
    addMarker: (position: LatLng, options = {}) => {
      if (!map || !window.kakao?.maps) return null;
      const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        ...options,
      });
      marker.setMap(map);
      markersRef.current.push(marker);
      return marker;
    },
    clearMarkers: () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    },
    moveToCurrentLocation: () => {
      if (!map || !window.kakao?.maps || !navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const currentPos = new window.kakao.maps.LatLng(latitude, longitude);
          map.setCenter(currentPos);
          if (currentLocationMarkerRef.current) {
            currentLocationMarkerRef.current.setMap(null);
          }
          const marker = new window.kakao.maps.Marker({
            position: currentPos,
            title: '현재 위치',
          });
          marker.setMap(map);
          currentLocationMarkerRef.current = marker;
        },
        (error) => {
          onGeolocationError?.(error);
        }
      );
    },
  };

  useImperativeHandle(ref, () => imperativeRef, [map, onGeolocationError]);

  // 지도 초기화
  const initMap = () => {
    if (!containerRef.current || !window.kakao?.maps) return;
    const mapOptions = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level,
    };
    const mapInstance = new window.kakao.maps.Map(containerRef.current, mapOptions);
    setMap(mapInstance);

    // 이벤트 등록
    if (onClick) addEventListener(mapInstance, 'click', onClick);
    if (onDragEnd) addEventListener(mapInstance, 'dragend', onDragEnd);
    if (onZoomChanged) addEventListener(mapInstance, 'zoom_changed', onZoomChanged);
    if (onMouseMove) addEventListener(mapInstance, 'mousemove', onMouseMove);

    // 현재 위치 자동 이동
    if (autoCenterCurrentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const currentPos = new window.kakao.maps.LatLng(latitude, longitude);
          mapInstance.setCenter(currentPos);
          if (currentLocationMarkerRef.current) {
            currentLocationMarkerRef.current.setMap(null);
          }
          const marker = new window.kakao.maps.Marker({
            position: currentPos,
            title: '현재 위치',
          });
          marker.setMap(mapInstance);
          currentLocationMarkerRef.current = marker;
        },
        (error) => {
          onGeolocationError?.(error);
        }
      );
    }

    // KakaoMapRef 객체를 onMapLoad에 전달
    onMapLoad?.(imperativeRef);
  };

  // Kakao 지도 스크립트 로드 및 초기화
  useEffect(() => {
    const scriptId = 'kakao-map-script';
    const existingScript = document.getElementById(scriptId);

    if (window.kakao?.maps) {
      initMap();
    } else if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(initMap);
      };
      document.head.appendChild(script);
    } else {
      existingScript.addEventListener('load', () => {
        window.kakao.maps.load(initMap);
      });
    }

    return () => {
      // 이벤트 리스너 해제
      eventListenersRef.current.forEach(listener => {
        window.kakao.maps.event.removeListener(listener);
      });
      eventListenersRef.current = [];
      // 마커 제거
      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.setMap(null);
        currentLocationMarkerRef.current = null;
      }
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      setMap(null);
    };
  }, [
    center.lat,
    center.lng,
    level,
    onClick,
    onDragEnd,
    onZoomChanged,
    onMouseMove,
    onMapLoad,
    autoCenterCurrentLocation,
    onGeolocationError,
  ]);

  // center, level 변경 시 지도 상태 업데이트
  useEffect(() => {
    if (map && window.kakao?.maps) {
      map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
      map.setLevel(level);
    }
  }, [center, level, map]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
  );
});

KakaoMap.displayName = 'KakaoMap';

export default KakaoMap;

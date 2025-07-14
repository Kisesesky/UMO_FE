// src/components/kakao-map/KakaoMap.tsx
'use client';

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import type { KakaoMapRef, KakaoMapProps } from '@/types/kakao-types';

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
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const currentLocationMarkerRef = useRef<kakao.maps.Marker | null>(null);
  const eventListenersRef = useRef<any[]>([]);

  /** 지도 이벤트 리스너 등록 */
  const addEventListener = (
    target: kakao.maps.Map | kakao.maps.Marker,
    eventName: string,
    handler: (event: any) => void
  ) => {
    if (!window.kakao?.maps) return;
    const listener = kakao.maps.event.addListener(target, eventName, handler);
    eventListenersRef.current.push(listener);
  };

  /** Imperative handle (외부 제어용) */
  const imperativeRef: KakaoMapRef = {
    getMapInstance: () => map,
    addMarker: (position, options = {}) => {
      if (!map) return null;
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(position.lat, position.lng),
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
      if (!map || !navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const currentPos = new kakao.maps.LatLng(latitude, longitude);
          map.setCenter(currentPos);

          // 이전 마커 제거
          if (currentLocationMarkerRef.current) {
            currentLocationMarkerRef.current.setMap(null);
          }

          const marker = new kakao.maps.Marker({
            position: currentPos,
            title: '현재 위치',
          });
          marker.setMap(map);
          currentLocationMarkerRef.current = marker;
        },
        (error) => {
          onGeolocationError?.(error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    },
  };

  useImperativeHandle(ref, () => imperativeRef, [map, onGeolocationError]);

  /** Kakao 지도 초기화 */
  const initMap = () => {
    if (!containerRef.current || !window.kakao?.maps) return;

    const mapOptions = {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,
    };
    const mapInstance = new kakao.maps.Map(containerRef.current, mapOptions);
    setMap(mapInstance);

    // 이벤트 바인딩
    if (onClick) addEventListener(mapInstance, 'click', onClick);
    if (onDragEnd) addEventListener(mapInstance, 'dragend', onDragEnd);
    if (onZoomChanged) addEventListener(mapInstance, 'zoom_changed', onZoomChanged);
    if (onMouseMove) addEventListener(mapInstance, 'mousemove', onMouseMove);

    // 현재 위치 자동 이동
    if (autoCenterCurrentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const currentPos = new kakao.maps.LatLng(latitude, longitude);
          mapInstance.setCenter(currentPos);

          if (currentLocationMarkerRef.current) {
            currentLocationMarkerRef.current.setMap(null);
          }

          const marker = new kakao.maps.Marker({
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

    onMapLoad?.(imperativeRef);
  };

  /** Kakao 스크립트 로드 */
  useEffect(() => {
    const scriptId = 'kakao-map-script';

    if (window.kakao?.maps) {
      initMap();
      return;
    }

    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
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
      eventListenersRef.current.forEach(listener => {
        kakao.maps.event.removeListener(listener);
      });
      eventListenersRef.current = [];

      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.setMap(null);
        currentLocationMarkerRef.current = null;
      }

      setMap(null);
    };
  }, []);

  /** center/level 변경 반영 */
  useEffect(() => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
      map.setLevel(level);
    }
  }, [center, level, map]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
});

KakaoMap.displayName = 'KakaoMap';

export default KakaoMap;

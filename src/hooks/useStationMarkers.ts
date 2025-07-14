// src/hooks/useStationMarkers.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { StationService } from '@/services/station.service';
import type { Station } from '@/types/rental';
import type { KakaoMapRef, KakaoMarker } from '@/types/kakao-types';

export function useStationMarkers(mapRef: React.RefObject<KakaoMapRef | null>) {
  const [stations, setStations] = useState<Station[]>([]);
  const stationsRef = useRef<Station[]>([]);
  const markersRef = useRef<KakaoMarker[]>([]);

  useEffect(() => {
    async function loadStations() {
      try {
        const stationData = await StationService.getAllStations();
        stationsRef.current = stationData;
        setStations(stationData);
      } catch (e) {
        console.error('대여소 데이터 로드 실패:', e);
      }
    }
    loadStations();
  }, []);

  const addMarkersToMap = useCallback(() => {
    if (!mapRef.current || !window.kakao?.maps) return;

    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

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

      markersRef.current.push(marker);
    });
  }, [mapRef]);

  useEffect(() => {
    if (mapRef.current && stations.length) {
      addMarkersToMap();
    }
  }, [stations, addMarkersToMap, mapRef]);

  return {
    stations,
    addMarkersToMap,
  };
}

'use client';
import React from 'react';
import { useEffect, useState } from 'react';

export default function KakaoMap() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById('map');
      const defaultPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
      const options = {
        center: defaultPosition,
        level: 3,
      };

      const mapInstance = new window.kakao.maps.Map(container, options);
      setMap(mapInstance);

      // 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const userPosition = new window.kakao.maps.LatLng(lat, lng);
            
            // 지도 중심을 현재 위치로 이동
            mapInstance.setCenter(userPosition);

            // 현재 위치 마커 표시
            const marker = new window.kakao.maps.Marker({
              position: userPosition,
              map: mapInstance,
            });

            // 인포윈도우로 현재 위치 표시
            const infowindow = new window.kakao.maps.InfoWindow({
              content: '<div style="padding:5px;">현재 위치</div>'
            });
            infowindow.open(mapInstance, marker);
          },
          (error) => {
            console.error('위치 정보를 가져올 수 없습니다:', error);
          }
        );
      }
    };

    // 카카오 맵 스크립트 로드
    if (!process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY) {
      console.error('Kakao Map API key is not set');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        try {
          loadKakaoMap();
        } catch (error) {
          console.error('Error loading Kakao Map:', error);
        }
      });
    };

    script.onerror = (error) => {
      console.error('Error loading Kakao Map script:', error);
    };

    document.head.appendChild(script);

    // 클린업 함수
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '1150px' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StationMap() {
  const [map, setMap] = useState(null);
  const [stations, setStations] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

  // 카카오 맵 초기화
  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById('map');
      const defaultPosition = new window.kakao.maps.LatLng(37.5665, 126.9780); // 서울 시청
      const options = {
        center: defaultPosition,
        level: 4,
      };

      const mapInstance = new window.kakao.maps.Map(container, options);
      setMap(mapInstance);
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
  }, []);

  // 사용자 위치 및 주변 스테이션 표시
  useEffect(() => {
    if (!map) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const loc = new window.kakao.maps.LatLng(lat, lng);
        map.setCenter(loc);
        setUserPosition({ lat, lng });

        // 사용자 위치 마커
        const userMarker = new window.kakao.maps.Marker({
          map,
          position: loc,
          title: '내 위치',
        });

        // 주변 스테이션 로드
        fetchStations(lat, lng);
      },
      (err) => {
        console.error('사용자 위치를 찾을 수 없습니다', err);
      }
    );
  }, [map]);

  // 주변 스테이션 데이터 가져오기
  const fetchStations = async (lat, lng) => {
    try {
      const res = await axios.get(`/api/stations/nearby?lat=${lat}&lng=${lng}`);
      setStations(res.data);

      // 각 스테이션에 마커 추가
      res.data.forEach((station) => {
        const marker = new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(station.latitude, station.longitude),
          title: station.name,
        });

        // 정보창 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">
            ${station.name}<br/>
            우산 ${station.availableUmbrellas}개
          </div>`,
        });

        // 마커 이벤트
        window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
        window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
      });
    } catch (err) {
      console.error('스테이션 API 오류', err);
    }
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}
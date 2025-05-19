'use client';
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById('map');
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
      };

      const map = new window.kakao.maps.Map(container, options);
      setMap(map);
    };

    if (window.kakao?.maps) {
      loadKakaoMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(loadKakaoMap);
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }} />
  );
}
// src/hooks/useUserMarkers.ts
import { useRef } from 'react';

export function useUserMarkers() {
  const userMarkerRef = useRef<kakao.maps.Marker | null>(null);

  const setUserMarker = (map: kakao.maps.Map, position: kakao.maps.LatLng) => {
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }

    const markerImage = new kakao.maps.MarkerImage(
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
      new kakao.maps.Size(24, 35),
      { offset: new kakao.maps.Point(12, 35) }
    );

    const marker = new kakao.maps.Marker({
      position,
      map,
      image: markerImage,
      title: '내 위치',
    });

    userMarkerRef.current = marker;
  };

  return { setUserMarker, userMarkerRef };
}

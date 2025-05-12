// StationMap.js
'use client';
import { useEffect } from 'react';

export default function StationMap() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 여러 마커 위치 배열
        const positions = [
          { title: '서울 시청', latlng: new window.kakao.maps.LatLng(37.5665, 126.9780) },
          { title: '서울역', latlng: new window.kakao.maps.LatLng(37.5547, 126.9706) },
          { title: '광화문', latlng: new window.kakao.maps.LatLng(37.5714, 126.9768) },
        ];
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        const imageSize = new window.kakao.maps.Size(24, 35);

        positions.forEach(pos => {
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
          const marker = new window.kakao.maps.Marker({
            map,
            position: pos.latlng,
            title: pos.title,
            image: markerImage,
          });
        });
      });
    };
    document.head.appendChild(script);
  }, []);

  // 반드시 아래 div를 반환해야 map이 보입니다!
  return (
    <div
      id="map"
      style={{ width: "100%", height: "400px" }}
    />
  );
}

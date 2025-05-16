'use client';
import dynamic from 'next/dynamic';

const KakaoMap = dynamic(() => import('@/components/KakaoMap'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="app-page">
      <div className="app-card">
        <h3>현재 날씨 : 맑음 / 23°C</h3>
      </div>
      
      <div id="map">
        <KakaoMap />
      </div>
    </div>
  );
}
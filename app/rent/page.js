'use client';
import dynamic from 'next/dynamic';

const KakaoMap = dynamic(() => import('@/components/KakaoMap'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="app-page">
      <div className="app-card">
        <h2>현재 날씨</h2>
        <p>맑음 / 23°C</p>
      </div>
      
      <div className="app-card">
        <h2>가까운 스테이션</h2>
        <KakaoMap />
      </div>

      <div className="app-card">
        <h2>빠른 대여</h2>
        <input 
          type="text" 
          className="app-input" 
          placeholder="스테이션 코드 입력"
        />
        <button className="app-button">
          우산 대여하기
        </button>
      </div>
    </div>
  );
}
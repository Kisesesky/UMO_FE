'use client';
import dynamic from 'next/dynamic';

const StationMap = dynamic(() => import('@/components/map/StationMap'), {
  ssr: false,
});

export default function MapPage() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>근처 우산 스테이션</h1>
      <StationMap />
    </main>
  );
}

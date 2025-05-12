'use client';

import dynamic from 'next/dynamic';

const StationMap = dynamic(
  () => import('@/components/map/StationMap'),
  { ssr: false }
);

export default function StationMapWrapper() {
  return <StationMap />;
}

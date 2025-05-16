'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="splash-page">
      <img
        src="/assets/character/umo-body.png"
        alt="UMO 로고"
        className="splash-logo"
      />
      <h1>UMO</h1>
      <p>도시형 공유 우산 플랫폼</p>
      <button className="start-button" onClick={() => router.push('/rent')}>
        시작하기
      </button>
    </div>
  );
}

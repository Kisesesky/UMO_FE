// components/AppBody.js (클라이언트 컴포넌트로 분리)
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AppBody({ children }) {
  const pathname = usePathname();
  const showNav = pathname !== '/';

  return (
    <div className="app-container">
      <main className="app-content">{children}</main>
      {showNav && (
        <nav className="app-navigation">
          <Link href="/store" className="nav-item">
            <span className="icon">🛒</span>
            <span>스토어</span>
          </Link>
          <Link href="/benefits" className="nav-item">
            <span className="icon">🎁</span>
            <span>혜택</span>
          </Link>
          <Link href="/rent" className="nav-item">
            <span className="icon">☔</span>
            <span>대여</span>
          </Link>
          <Link href="/profile" className="nav-item">
            <span className="icon">👤</span>
            <span>내정보</span>
          </Link>
          <Link href="/all" className="nav-item">
            <span className="icon">📋</span>
            <span>전체</span>
          </Link>
        </nav>
      )}
    </div>
  );
}

// src/components/splash/SplashWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/custom-loading/LoadingScreen';

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2초 강제 로딩

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingScreen /> : <>{children}</>;
}

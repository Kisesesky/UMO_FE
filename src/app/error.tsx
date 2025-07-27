// src/app/error.tsx
'use client';

import ErrorPage from './errors/error';
import NotFoundPage from './errors/not-found';
import TimeoutPage from './errors/timeout';

interface GlobalErrorProps {
  error: Error & { statusCode?: number }; // statusCode가 있을 수도 있으니 확장
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const statusCode = (error as any)?.statusCode || 500;

  if (statusCode === 404) return <NotFoundPage />;
  if (statusCode === 504) return <TimeoutPage />;

  return <ErrorPage error={error} reset={reset} />;
}

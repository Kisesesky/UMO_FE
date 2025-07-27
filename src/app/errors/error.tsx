'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <img
        src="https://storage.googleapis.com/everyday-umo-bucket/default/character/umo-face2.png"
        alt="UMO 캐릭터"
        className="w-40 h-40 mb-6"
      />
      <h1 className="text-4xl font-bold text-red-600 mb-2">문제가 발생했어요</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-sm">
        죄송합니다. 예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition"
      >
        다시 시도하기
      </button>
    </div>
  );
}

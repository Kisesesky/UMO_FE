'use client';

import { useRouter } from 'next/navigation';

export default function TimeoutPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <img
        src="https://storage.googleapis.com/everyday-umo-bucket/default/character/umo-face2.png"
        alt="UMO 캐릭터"
        className="w-40 h-40 mb-6"
      />
      <h1 className="text-4xl font-bold text-yellow-600 mb-2">요청 시간이 초과되었습니다</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-sm">
        서버가 응답하지 않습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 active:bg-yellow-800 transition"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

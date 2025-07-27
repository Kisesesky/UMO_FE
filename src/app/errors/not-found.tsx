'use client';

import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <img
        src="https://storage.googleapis.com/everyday-umo-bucket/default/character/umo-face2.png"
        alt="UMO 캐릭터"
        className="w-40 h-40 mb-6"
      />
      <h1 className="text-4xl font-bold text-indigo-600 mb-2">페이지를 찾을 수 없어요</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-sm">
        요청하신 페이지가 없거나 이동하신 주소가 잘못되었어요.
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

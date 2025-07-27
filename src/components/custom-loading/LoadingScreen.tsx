// src/components/custom-loading/LoadingScreen.tsx
'use client';

import { useEffect, useState } from 'react';

const loadingMessages = [
  { text: '우산 펼치는 중... ☂️', color: 'text-blue-500' },
  { text: 'UMO가 위치를 찾고 있어요 🧭', color: 'text-green-500' },
  { text: '곧 비가 올지도 몰라요... 🌧️', color: 'text-purple-500' },
  { text: '잠시만요, 준비하는 중이에요 🛠️', color: 'text-yellow-500' },
  { text: 'Tip: 비 오는 날엔 공유 우산을 사용해보세요 ☔️', color: 'text-blue-500' },
  { text: '잠시만 기다려주세요... 우산 챙기는 중이에요 🧼', color: 'text-green-500' },
  { text: '오늘도 UMO가 당신의 우산이 되어드릴게요 🌂', color: 'text-purple-500' },
  { text: '곧 만나요! UMO가 준비 중이에요 🐧', color: 'text-yellow-500' },
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 3000); // 3초마다 메시지 변경

    return () => clearInterval(interval);
  }, []);

  const currentMessage = loadingMessages[messageIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <img
        src="https://storage.googleapis.com/everyday-umo-bucket/default/character/umo-body.png"
        alt="UMO 캐릭터"
        className="w-28 h-28 animate-bounce mb-6"
      />
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500" />
        <p className={`text-lg font-medium ${currentMessage.color}`}>
          {currentMessage.text}
        </p>
      </div>
    </div>
  );
}

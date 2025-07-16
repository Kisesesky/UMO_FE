// src/app/find-password/page.tsx
'use client';

import { useState } from 'react';
import EmailStep from './EmailStep';
import ResetStep from './ResetStep';
import SuccessStep from './SuccessStep';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function FindPasswordPage() {
  const router = useRouter();

  // 스텝: 1=이메일 입력/코드, 2=새 비밀번호, 3=완료
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  // (선택) 인증 성공 여부 등 덧붙이기
  return (
    <div className="app-container flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm p-2 flex items-center">
        <button
          onClick={() => router.push('/login')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaArrowLeft size={18} className="text-gray-700" />
        </button>
        <h2 className="text-md font-semibold text-gray-800 flex-1 text-center pr-8">
          비밀번호 찾기
        </h2>
      </header>

      {/* 메인 */}
      <main className="flex flex-col items-center px-6 pt-8 flex-1">
        <div className="w-full max-w-sm">
          {/* 캐릭터/로고 */}
          <div className="text-center mt-2 mb-7 flex flex-col items-center">
            <Image
              src="/assets/character/umo-face.png"
              alt="우모 캐릭터"
              width={120}
              height={120}
              className="mx-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
              priority
            />
          </div>

          {/* 단계별 Step */}
          {step === 1 && <EmailStep email={email} setEmail={setEmail} onSuccess={() => setStep(2)} />}
          {step === 2 && <ResetStep email={email} onSuccess={() => setStep(3)} />}
          {step === 3 && <SuccessStep />}
        </div>
      </main>
    </div>
  );
}

// src/app/auth/social-terms/SocialTermsContent.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import TermsModal from '@/components/terms/TermsModal';
import PRIVACY_CONTENT from '@/constants/privacy';
import TERMS_CONTENT from '@/constants/terms';
import api from '@/lib/api';
import TermsAgreement from 'components/auth/TermsAgreement';
import Image from 'next/image';
import { FaArrowLeft, FaInfoCircle } from 'react-icons/fa';

export default function SocialTermsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const socialId = params.get('socialId');
  const provider = params.get('provider');

  // 동의 상태
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 모달 상태
  const [currentModalType, setCurrentModalType] = useState<'terms' | 'privacy' | null>(null);
  const isTermsModalOpen = currentModalType === 'terms';
  const isPrivacyModalOpen = currentModalType === 'privacy';

  // 모달 오픈
  const handleOpenTermsModal = (type: 'terms' | 'privacy') => setCurrentModalType(type);
  const handleCloseTermsModal = () => setCurrentModalType(null);
  const handleAgreeTerms = () => {
    if (currentModalType === 'terms') setAgreedTerms(true);
    else if (currentModalType === 'privacy') setAgreedPrivacy(true);
    handleCloseTermsModal();
  };

  // 약관 동의 후 서버 제출
  const handleAgree = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await api.patch('/auth/social-terms/agree', {
        socialId,
        provider,
        agreedTerms,
        agreedPrivacy,
      });
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || '약관 동의 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container flex flex-col bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm p-2 flex items-center">
        <button
          onClick={() => router.push('/')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaArrowLeft size={18} className="text-gray-700" />
        </button>
        <h2 className="text-md font-semibold text-gray-800 flex-1 text-center pr-8">
          소셜 회원가입 약관동의
        </h2>
      </header>

      <main
        className="flex-1 flex flex-col items-center px-6 pt-4 md:pt-8 lg:pt-10 overflow-y-auto justify-start"
      >
        <div className="w-full max-w-sm">
          {/* 브랜드/캐릭터 영역 */}
          <div className="text-center mb-4">
            <Image
              src="/assets/character/umo-body.png"
              alt="우모 캐릭터"
              width={80}
              height={80}
              priority
              className="mx-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <h2 className="text-2xl font-bold text-primary-600 mt-2">UMO</h2>
            <p className="text-gray-600">우산 대여 서비스</p>
          </div>

          {/* 안내문구 */}
          <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-700 px-5 py-3 rounded-xl shadow-md flex flex-col items-center text-sm font-medium">
            <span className="flex items-center gap-2 mb-1 justify-center">
              <FaInfoCircle className="text-yellow-500" />
              <b className="text-primary-600 font-bold">소셜 로그인</b>으로 회원가입 시
            </span>
            서비스 이용을 위한 <b className="text-primary-600 font-bold">필수 약관</b>에 동의해 주세요.
          </div>

          <form
            className="space-y-0 md:space-y-1 bg-white shadow-md rounded-xl py-6 px-5"
            onSubmit={e => { e.preventDefault(); handleAgree(); }}
          >
            <div className="pb-4 mb-4 border-b border-gray-100">
              <div className="space-y-3">
                <TermsAgreement
                  agreedTerms={agreedTerms}
                  setAgreedTerms={setAgreedTerms}
                  agreedPrivacy={agreedPrivacy}
                  setAgreedPrivacy={setAgreedPrivacy}
                  handleOpenTermsModal={handleOpenTermsModal}
                />
              </div>
            </div>
            {/* 약관 동의 버튼 */}
            <button
              type="submit"
              disabled={!agreedTerms || !agreedPrivacy || isLoading}
              className={
                `w-full py-3 rounded-lg font-medium text-white shadow-button transition-colors text-lg
                ${(!agreedTerms || !agreedPrivacy || isLoading)
                  ? 'bg-primary-400 cursor-not-allowed opacity-60'
                  : 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800'}`
              }
              style={{ marginTop: '10px', marginBottom: error ? '0' : '10px' }}
            >
              {isLoading ? '처리 중...' : '동의하고 시작하기'}
            </button>

            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mt-3 text-center"
              >
                {error}
              </div>
            )}
          </form>
          {(isTermsModalOpen || isPrivacyModalOpen) && currentModalType && (
            <TermsModal
              isOpen={!!currentModalType}
              onClose={handleCloseTermsModal}
              onAgree={handleAgreeTerms}
              title={currentModalType === 'terms' ? '서비스 이용 약관' : '개인정보 처리 방침'}
              content={currentModalType === 'terms' ? TERMS_CONTENT : PRIVACY_CONTENT}
            />
          )}
        </div>
      </main>
    </div>
  );
}

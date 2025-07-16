// src/components/auth/TermsAgreement.tsx
import { TermsAgreementProps } from '@/types/components/auth';
import React from 'react';

export default function TermsAgreement({
  agreedTerms, setAgreedTerms,
  agreedPrivacy, setAgreedPrivacy,
  handleOpenTermsModal,
}: TermsAgreementProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <input
          id="agree-terms"
          name="agree-terms"
          type="checkbox"
          checked={agreedTerms}
          onChange={() => !agreedTerms && handleOpenTermsModal('terms')}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
        />
        <label
          htmlFor="agree-terms"
          className="ml-2 block text-sm text-gray-900 cursor-pointer"
          onClick={() => !agreedTerms && handleOpenTermsModal('terms')}
        >
          <span className="font-bold text-primary-600 hover:text-primary-500">서비스 이용 약관</span> 동의 <b className="font-bold">(필수)</b>
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="agree-privacy"
          name="agree-privacy"
          type="checkbox"
          checked={agreedPrivacy}
          onChange={() => !agreedPrivacy && handleOpenTermsModal('privacy')}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
        />
        <label
          htmlFor="agree-privacy"
          className="ml-2 block text-sm text-gray-900 cursor-pointer"
          onClick={() => !agreedPrivacy && handleOpenTermsModal('privacy')}
        >
          <span className="font-bold text-primary-600 hover:text-primary-500">개인정보 처리 방침</span> 동의 <b className="font-bold">(필수)</b>
        </label>
      </div>
    </div>
  );
}

// src/components/auth/EmailInputWithVerification.tsx
import { EmailInputWithVerificationProps } from '@/types/components/auth';
import React, { useRef } from 'react';
import { FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function EmailInputWithVerification({
  email, setEmail, hint, setHint, isEmailVerified, isSendingCode,
  codeSentMessage, codeError, emailError, showVerificationInput,
  verificationCode, setVerificationCode, isVerifyingCode,
  handleSendVerificationCode, handleVerifyCode,
  handleEmailChange, handleEmailKeyDown, handleHintClick,
}: EmailInputWithVerificationProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        이메일
      </label>
      <div className="relative flex">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaEnvelope className="text-gray-400 dark:text-gray-500" />
        </div>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleEmailKeyDown}
          onFocus={() => {
            // 모바일에서만 동작
            if (window.innerWidth < 768) {
              inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="이메일 주소"
          disabled={isEmailVerified || isSendingCode}
        />
        <button
          type="button"
          onClick={handleSendVerificationCode}
          disabled={isSendingCode || isEmailVerified || !email}
          className={`shrink-0 px-4 py-2 rounded-r-lg font-medium text-white transition-colors ${
            (isSendingCode || isEmailVerified || !email)
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          {isSendingCode ? '전송 중...' : (isEmailVerified ? '인증 완료' : '인증 요청')}
        </button>
        {hint && hint !== email && (
          <span
            className="absolute left-10 top-0 h-full flex items-center text-gray-400 dark:text-gray-500 select-none cursor-pointer"
            style={{
              pointerEvents: 'auto',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onMouseDown={handleHintClick}
            tabIndex={-1}
          >
            <span style={{ opacity: 0 }}>{email}</span>
            <span style={{ color: '#bbb' }}>{hint.slice(email.length)}</span>
          </span>
        )}
      </div>
      {emailError && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FaExclamationCircle />{emailError}</p>}
      {codeSentMessage && <p className="mt-1 text-sm text-green-500 flex items-center gap-1"><FaCheckCircle />{codeSentMessage}</p>}
      {showVerificationInput && !isEmailVerified && (
        <div>
          <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">인증 코드</label>
          <div className="relative flex">
            <input
              id="verification-code"
              name="verification-code"
              type="text"
              required
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="인증 코드 6자리"
              disabled={isVerifyingCode}
            />
            <button
              type="button"
              onClick={handleVerifyCode}
              disabled={verificationCode.length !== 6 || isVerifyingCode}
              className={`shrink-0 px-4 py-3 rounded-r-lg font-medium text-white transition-colors ${
                (verificationCode.length !== 6 || isVerifyingCode)
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700'
              }`}
            >
              {isVerifyingCode ? '확인 중...' : '확인'}
            </button>
          </div>
          {codeError && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FaExclamationCircle />{codeError}</p>}
        </div>
      )}
    </div>
  );
}

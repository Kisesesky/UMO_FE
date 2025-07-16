// src/app/find-password/EmailStep.tsx
'use client';

import api from '@/lib/api';
import { useState, useEffect } from 'react';
import { useEmailAutocomplete } from '@/hooks/useEmailAutocomplete';
import { useRouter } from 'next/navigation';
import { validateEmail } from '@/utils/validation';
import { FaLock, FaEnvelope } from 'react-icons/fa';

interface EmailStepProps {
  email: string;
  setEmail: (val: string) => void;
  onSuccess: () => void;
}

export default function EmailStep({ email, setEmail, onSuccess }: EmailStepProps) {
  const router = useRouter();

  const {
    email: emailValue, setEmail: setEmailValue, hint, handleEmailChange,
    handleEmailKeyDown, handleHintClick
  } = useEmailAutocomplete(email);

  const [isSent, setIsSent] = useState(false);
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [emailError, setEmailError] = useState('');

  // 쿨타임 타이머
  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // 토스트 메시지 자동 사라지기
  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(''), 2000);
    return () => clearTimeout(t);
  }, [toastMsg]);

  useEffect(() => {
    if (emailValue.length > 0 && !validateEmail(emailValue)) {
      setEmailError('유효한 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  }, [emailValue]);

  //이메일 유효성 검사
  const handleEmailConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    setEmail(nextVal);
    setEmailError(
      nextVal.length > 0 && !validateEmail(nextVal)
        ? '유효한 이메일 형식이 아닙니다.'
        : ''
    );
  };

  // 인증번호 발송
  const handleSendCode = async () => {
    if (!validateEmail(emailValue)) {
      setInputError('올바른 이메일을 입력해주세요.');
      return;
    }
    setInputError('');
    setLoading(true);
    try {
      await api.post('/auth/service/password/find/email', { email: emailValue });
      setIsSent(true);
      setCooldown(60);
      setToastMsg('인증번호가 이메일로 발송되었습니다.');
    } catch (e: any) {
      setInputError(e.response?.data?.message || '오류가 발생했습니다. 다시 시도');
    }
    setLoading(false);
  };

  // 인증번호 확인
  const handleVerify = async () => {
    setLoading(true);
    setInputError('');
    try {
      await api.post('/auth/service/password/find/verify', { email: emailValue, code });
      setToastMsg('이메일 인증 성공!');
      setTimeout(() => {
        setEmail(emailValue);      // **이메일 스텝 벗어날 때 상태 전달 잊지 마세요!**
        onSuccess();
      }, 700);
    } catch (e: any) {
      setInputError(e.response?.data?.message || '인증번호가 올바르지 않습니다');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* 토스트 메시지 */}
      {toastMsg && (
        <div className="
          fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900/90
          text-sm text-white font-bold py-2 px-5 rounded-lg shadow
        ">
          {toastMsg}
        </div>
      )}

      {/* 이메일+버튼 한 줄 + 오토컴플리트 */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
        <div className="flex w-full">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </span>
          <input
            id="email"
            name="email"
            type="email"
            value={emailValue}
            onChange={e => {
              handleEmailChange(e);          // 오토컴플리트 반영
              setEmailValue(e.target.value);  // 훅 내부 상태도 갱신
              setEmail(e.target.value);      // 부모(상위) 상태 동기화
              handleEmailConfirm(e);
            }}
            onKeyDown={handleEmailKeyDown}
            autoComplete="email"
            placeholder="이메일 주소"
            className={`
              block w-full pl-10 pr-3 py-2 border-y border-l border-gray-300
              rounded-l-lg focus:border-primary-500 bg-white
              ${emailError ? 'border-red-400 focus:border-red-500' : 'focus:ring-primary-500'}
            `}
            disabled={loading || isSent}
          />

          {hint && hint !== emailValue && (
            <span
              className="absolute left-10 top-0 h-full flex items-center text-gray-400 cursor-pointer select-none"
              onMouseDown={handleHintClick}
              tabIndex={-1}
            >
              <span style={{opacity: 0}}>{emailValue}</span>
              <span style={{color: '#bbb'}}>{hint.slice(emailValue.length)}</span>
            </span>
          )}
        </div>
        <button
          disabled={loading || !validateEmail(emailValue) || cooldown > 0}
          className={`
            px-4 py-2 rounded-r-lg font-medium text-white transition-colors border
            border-l-0 border-gray-300
            ${
              !validateEmail(emailValue) || loading || cooldown > 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'
            }
          `}
          onClick={handleSendCode}
          style={{ minWidth: '110px' }}
        >
          {isSent
            ? cooldown > 0
              ? `재전송 (${cooldown}s)`
              : '재전송'
            : '인증 요청'}
        </button>
      </div>

      {/* 에러 메시지 */}
      <div className="min-h-[24px] mt-1">
        {emailError && <p className="text-xs text-red-500">{emailError}</p>}
      </div>
      </div>

      {/* 인증번호 입력 - 발송 후 노출 */}
      {isSent && (
        <div className="mt-3">
          <label className="block text-sm mb-1">인증번호</label>
          <div className="flex w-full">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={e => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                className={`
                  block w-full pl-10 pr-3 py-2 border-y border-l border-gray-300
                  rounded-l-lg focus:border-primary-500 bg-white
                  focus:ring-primary-500
                `}
                placeholder="6자리 인증코드"
                disabled={loading}
              />
            </div>
            <button
              className={`
                px-4 py-2 rounded-r-lg font-medium text-white transition-colors border
                border-l-0 border-gray-300
                ${
                  loading || code.length !== 6
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700'
                }
              `}
              disabled={loading || code.length !== 6}
              onClick={handleVerify}
              style={{ minWidth: '110px' }}
            >
              확 인
            </button>
          </div>
        </div>
      )}
  </div>
  )
}
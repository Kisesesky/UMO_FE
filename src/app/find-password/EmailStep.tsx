// src/app/find-password/EmailStep.tsx
'use client';
import api from '@/lib/api';
import { useState } from 'react';
import { useEmailAutocomplete } from '@/hooks/useEmailAutocomplete';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

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

  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // 인증번호 발송
  const sendCode = async () => {
    setError(''); setLoading(true); setSuccessMsg('');
    try {
      await api.post('/auth/service/password/find/email', { email: emailValue });
      setSent(true);
      setSuccessMsg('인증번호가 이메일로 발송되었습니다.');
    } catch (e: any) {
      setError(e.response?.data?.message || '인증번호 발송 실패');
    }
    setLoading(false);
  };

  // 인증번호 확인
  const verifyCode = async () => {
    setError(''); setLoading(true);
    try {
      await api.post('/auth/service/password/find/verify', { email: emailValue, code });
      setVerified(true);
      setSuccessMsg('이메일 인증 성공!');
      setTimeout(onSuccess, 600);
    } catch (e: any) {
      setError(e.response?.data?.message || '인증번호가 올바르지 않습니다');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">이메일</label>
        <div className="relative">
          <input
            type="email"
            value={emailValue}
            onChange={e => { handleEmailChange(e); setEmailValue(e.target.value); setEmail(e.target.value); }}
            onKeyDown={handleEmailKeyDown}
            autoComplete="email"
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="가입한 이메일"
            disabled={sent}
          />
          {hint && hint !== emailValue && (
            <span
              className="absolute left-3 top-0 h-full flex items-center text-gray-400 cursor-pointer select-none"
              onMouseDown={handleHintClick}
              tabIndex={-1}
            >
              <span style={{ opacity: 0 }}>{emailValue}</span>
              <span style={{ color: '#bbb' }}>{hint.slice(emailValue.length)}</span>
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={sendCode}
        className={`w-full py-2 rounded-lg font-bold text-white 
          ${(!emailValue || loading) ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800'}
        `}
        disabled={!emailValue || loading}
      >
        {sent ? '재발송' : '인증번호 전송'}
      </button>

      {sent && (
        <div>
          <label className="block text-sm mb-1">인증번호</label>
          <input
            type="text"
            value={code}
            onChange={e=>setCode(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            maxLength={6}
            placeholder="6자리 인증코드"
            disabled={verified}
          />
          <button
            type="button"
            className={`mt-2 w-full py-2 rounded-lg font-bold text-white 
              ${(!code || loading || verified) ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800'}
            `}
            onClick={verifyCode}
            disabled={loading || !code || verified}
          >
            인증번호 확인
          </button>
        </div>
      )}
      {/* 성공/실패 안내 */}
      {successMsg && <p className="text-sm text-green-600 mt-1 text-center">{successMsg}</p>}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

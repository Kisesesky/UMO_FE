// src/hooks/useEmailVerification.ts
import { useState } from 'react';
import api from '@/services/api';

export function useEmailVerification(email: string) {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [codeSentMessage, setCodeSentMessage] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleSendVerificationCode = async () => {
    setIsSendingCode(true);
    setCodeSentMessage('');
    setCodeError('');
    try {
      await api.post('/auth/service/signup/sendcode', { email });
      setCodeSentMessage('인증 코드가 이메일로 발송되었습니다.');
      setShowVerificationInput(true);
    } catch (err: any) {
      setCodeError(
        err.response?.data?.message || '인증 코드 발송에 실패했습니다.'
      );
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      setCodeError('6자리 인증 코드를 입력해주세요.');
      return;
    }
    setIsVerifyingCode(true);
    setCodeError('');
    try {
      await api.post('/auth/service/signup/verifycode', {
        email,
        code: verificationCode,
      });
      setIsEmailVerified(true);
      setCodeSentMessage('이메일 인증이 완료되었습니다.');
    } catch (err: any) {
      setCodeError(
        err.response?.data?.message || '인증 코드 확인에 실패했습니다.'
      );
    } finally {
      setIsVerifyingCode(false);
    }
  };

  return {
    isEmailVerified,
    verificationCode,
    setVerificationCode,
    showVerificationInput,
    isSendingCode,
    isVerifyingCode,
    codeSentMessage,
    codeError,
    handleSendVerificationCode,
    handleVerifyCode,
    setShowVerificationInput,
    setIsEmailVerified,
    setCodeSentMessage,
    setCodeError,
  };
}

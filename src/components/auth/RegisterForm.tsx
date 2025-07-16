// src/components/auth/RegisterForm.tsx
import React, { useState, useEffect } from 'react';
import ProfileImageUploader from './ProfileImageUploader';
import NameInput from './NameInput';
import EmailInputWithVerification from './EmailInputWithVerification';
import PasswordInput from './PasswordInput';
import PasswordConfirmInput from './PasswordConfirmInput';
import TermsAgreement from './TermsAgreement';
import Toast from '@/components/toast/Toast';
import TermsModal from '@/components/terms/TermsModal';
import Link from 'next/link';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { validateName, validateEmail, validatePassword } from '@/utils/validation';
import TERMS_CONTENT from '@/constants/terms';
import PRIVACY_CONTENT from '@/constants/privacy';
import { emailDomains } from '@/utils/autocomplete';
import { useEmailAutocomplete } from '@/hooks/useEmailAutocomplete';

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error: authError } = useAuthStore();

  // 상태 선언
  const [name, setName] = useState('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const profileImagePreview = profileImageFile
    ? URL.createObjectURL(profileImageFile)
    : '/assets/character/umo-face.png';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    email, setEmail,
    hint, setHint,
    handleEmailChange,
    handleEmailKeyDown,
    handleHintClick
  } = useEmailAutocomplete();


  // 이메일 인증 훅
  const {
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
  } = useEmailVerification(email);

  // 유효성 검사 및 에러
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [registerError, setRegisterError] = useState('');

  // 약관 모달
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<'terms' | 'privacy' | null>(null);

  const handleOpenTermsModal = (type: 'terms' | 'privacy') => {
    setCurrentModalType(type);
    if (type === 'terms') setIsTermsModalOpen(true);
    else setIsPrivacyModalOpen(true);
  };
  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false);
    setIsPrivacyModalOpen(false);
    setCurrentModalType(null);
  };
  const handleAgreeTerms = () => {
    if (currentModalType === 'terms') setAgreedTerms(true);
    else if (currentModalType === 'privacy') setAgreedPrivacy(true);
    handleCloseTermsModal();
  };

  // 토스트
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 폼 유효성 검사
  useEffect(() => {
    const isNameValid = validateName(name);
    const isEmailFormatValid = validateEmail(email);
    const isPasswordFormatValid = validatePassword(password);
    const isPasswordMatch = password === confirmPassword;
    const isTermsAgreed = agreedTerms && agreedPrivacy;

    setEmailError(email.length > 0 && !isEmailFormatValid ? '유효한 이메일 형식이 아닙니다.' : '');
    setPasswordError(password.length > 0 && !isPasswordFormatValid ? '영문 대/소문자, 숫자, 특수문자 포함 9~20자' : '');
    setConfirmPasswordError(confirmPassword.length > 0 && !isPasswordMatch ? '비밀번호가 일치하지 않습니다.' : '');
    setNameError(name.length > 0 && !isNameValid ? '이름은 1~8자, 한글/영문/숫자만 가능합니다.' : '');

    setFormValid(
      isNameValid &&
      isEmailFormatValid &&
      isPasswordFormatValid &&
      isPasswordMatch &&
      isTermsAgreed &&
      isEmailVerified
    );
  }, [name, email, password, confirmPassword, agreedTerms, agreedPrivacy, isEmailVerified]);

  // 회원가입 제출
  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    if (!formValid) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('agreedTerms', String(agreedTerms));
    formData.append('agreedPrivacy', String(agreedPrivacy));
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }

    try {
      await api.post('/auth/register', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' },
       });
      setToastMessage('회원가입이 완료되었습니다! 로그인 해주세요.');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2200);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setRegisterError(
        err.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.'
      );
    }
  };

  return (
    <div>
      <Toast message={toastMessage} visible={toastVisible} />
      <form onSubmit={handleSubmitRegister} className="space-y-3 md:space-y-5 lg:space-y-6 xl:space-y-7">
        <ProfileImageUploader
          profileImageFile={profileImageFile}
          setProfileImageFile={setProfileImageFile}
          previewUrl={profileImagePreview}
        />
        <NameInput
          value={name}
          onChange={setName}
          error={nameError}
        />
        <EmailInputWithVerification
          email={email}
          setEmail={setEmail}
          hint={hint}
          setHint={setHint}
          isEmailVerified={isEmailVerified}
          isSendingCode={isSendingCode}
          codeSentMessage={codeSentMessage}
          codeError={codeError}
          emailError={emailError}
          showVerificationInput={showVerificationInput}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          isVerifyingCode={isVerifyingCode}
          handleSendVerificationCode={handleSendVerificationCode}
          handleVerifyCode={handleVerifyCode}
          handleEmailChange={handleEmailChange}
          handleEmailKeyDown={handleEmailKeyDown}
          handleHintClick={handleHintClick}
        />
        <PasswordInput
          value={password}
          onChange={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          error={passwordError}
        />
        <PasswordConfirmInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
          error={confirmPasswordError}
        />
        <TermsAgreement
          agreedTerms={agreedTerms}
          setAgreedTerms={setAgreedTerms}
          agreedPrivacy={agreedPrivacy}
          setAgreedPrivacy={setAgreedPrivacy}
          handleOpenTermsModal={handleOpenTermsModal}
        />
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {authError}
          </div>
        )}
        <div>
          <button
            type="submit"
            disabled={isLoading || !formValid}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-button transition-colors ${
              (isLoading || !formValid)
                ? 'bg-primary-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800'
            }`}
          >
            {isLoading ? '회원가입 중...' : '회원가입'}
          </button>
        </div>
      </form>
      
      {(isTermsModalOpen || isPrivacyModalOpen) && currentModalType && (
        <TermsModal
          isOpen={currentModalType === 'terms' ? isTermsModalOpen : isPrivacyModalOpen}
          onClose={handleCloseTermsModal}
          onAgree={handleAgreeTerms}
          title={currentModalType === 'terms' ? '서비스 이용 약관' : '개인정보 처리 방침'}
          content={currentModalType === 'terms' ? TERMS_CONTENT : PRIVACY_CONTENT}
        />
      )}
    </div>
  );
}

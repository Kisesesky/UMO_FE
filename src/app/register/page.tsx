// src/app/register/page.tsx
'use client';

import TermsModal from '@/components/terms/TermsModal';
import Toast from '@/components/Toast';
import api from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FaArrowLeft, FaCheckCircle, FaEnvelope, FaExclamationCircle, FaEye, FaEyeSlash, FaLock, FaUser, FaPencilAlt } from 'react-icons/fa';
import { useAuthStore } from '../../store/auth.store';

// 약관 내용 (기존과 동일)
const TERMS_CONTENT = `
  <h2 class="text-lg font-semibold mb-2">제1조 (목적)</h2>
  <p class="mb-3">본 약관은 UMO(이하 “회사”라 함)가 제공하는 우산 대여 서비스 및 관련 제반 서비스(이하 “서비스”라 함)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
  
  <h2 class="text-lg font-semibold mb-2">제2조 (용어의 정의)</h2>
  <p class="mb-1">본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
  <ul class="list-disc list-inside mb-3 ml-2">
    <li>“서비스”라 함은 구현되는 단말기(PC, 휴대형 단말기 등의 각종 유무선 장치를 포함)와 상관없이 회원이 이용할 수 있는 우산 대여 및 반납, 결제 등 회사가 제공하는 일체의 서비스를 의미합니다.</li>
    <li>“회원”이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
    <li>“아이디”라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.</li>
    <li>“비밀번호”라 함은 회원이 부여받은 아이디와 일치되는 회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자와 숫자의 조합을 의미합니다.</li>
  </ul>
  <p class="text-sm text-gray-500 mt-6">본 약관은 2025년 7월 15일부터 적용됩니다.</p>
`;

const PRIVACY_CONTENT = `
  <h2 class="text-lg font-semibold mb-2">제1조 (개인정보의 처리 목적)</h2>
  <p class="mb-3">회사는 다음의 목적을 위하여 개인정보를 처리하며, 다음의 목적 이외의 용도로는 이용하지 않습니다.</p>
  <ul class="list-disc list-inside mb-3 ml-2">
    <li>회원 가입 및 관리: 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별/인증, 회원 자격 유지/관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만14세 미만 아동 개인정보 처리 시 법정대리인의 동의 여부 확인, 각종 고지/통지, 고충 처리 등을 목적으로 개인정보를 처리합니다.</li>
    <li>서비스 제공: 우산 대여 및 반납 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 요금 결제 및 정산 등을 목적으로 개인정보를 처리합니다.</li>
  </ul>
  
  <h2 class="text-lg font-semibold mb-2">제2조 (처리하는 개인정보 항목)</h2>
  <p class="mb-1">회사는 서비스 제공을 위해 다음의 개인정보 항목을 처리하고 있습니다.</p>
  <ul class="list-disc list-inside mb-3 ml-2">
    <li>필수 항목: 이름, 이메일 주소, 비밀번호, 휴대전화번호</li>
    <li>선택 항목: 주소, 결제 정보 (카드 번호 일부, 유효기간 등)</li>
  </ul>
  <p class="text-sm text-gray-500 mt-6">본 개인정보 처리 방침은 2025년 7월 15일부터 적용됩니다.</p>
`;


// 유효성 검사 함수
const validateName = (name: string) => /^[가-힣a-zA-Z0-9]{1,8}$/.test(name);
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$/.test(password); // 9~20자, 영문 대소문자, 숫자, 특수문자(@$!%*?&) 모두 포함
const emailDomains = [
    'gmail.com', 'naver.com', 'nate.com', 'daum.net', 'hanmail.net',
    'kakao.com', 'hotmail.com', 'icloud.com', 'outlook.com'
];
  
export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error: authError } = useAuthStore();
  
  // 폼 상태
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const profileImagePreview = profileImageFile
    ? URL.createObjectURL(profileImageFile)
    : '/assets/character/umo-face.png'; 

  // 비밀번호 가시성 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 유효성 검사 메시지
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [registerError, setRegisterError] = useState('');

  // 이메일 자동 완성
  const [hint, setHint] = useState('');

  // 이메일 인증 관련 상태 (UI 흐름만)
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [codeSentMessage, setCodeSentMessage] = useState('');
  const [codeError, setCodeError] = useState('');

  // 약관 모달 관련 상태
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<'terms' | 'privacy' | null>(null);

  // 토스트 메세지
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 전체 폼 유효성 검사
  useEffect(() => {
    const isNameValid = name.trim().length > 0;
    const isEmailFormatValid = validateEmail(email);
    const isPasswordFormatValid = validatePassword(password);
    const isPasswordMatch = password === confirmPassword;
    const isTermsAgreed = agreedTerms && agreedPrivacy;

    setEmailError(email.length > 0 && !isEmailFormatValid ? '유효한 이메일 형식이 아닙니다.' : '');
    setPasswordError(password.length > 0 && !isPasswordFormatValid ? '영문 대/소문자, 숫자, 특수문자 포함 9~20자' : '');
    setConfirmPasswordError(confirmPassword.length > 0 && !isPasswordMatch ? '비밀번호가 일치하지 않습니다.' : '');

    setFormValid(
      isNameValid &&
      isEmailFormatValid &&
      isPasswordFormatValid &&
      isPasswordMatch &&
      isTermsAgreed &&
      isEmailVerified
    );
  }, [name, email, password, confirmPassword, agreedTerms, agreedPrivacy, isEmailVerified]);

  // 이메일 자동완성 로직
  const getHint = (value: string) => {
    const atIndex = value.indexOf('@');
    if (atIndex > -1) {
      const keyword = value.slice(atIndex + 1).toLowerCase();
      if (keyword.length > 0) {
        const found = emailDomains.find(domain => domain.startsWith(keyword));
        if (found) return value.slice(0, atIndex + 1) + found;
      }
    }
    return '';
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setHint(getHint(value));
  };

  // 키보드 네비게이션(선택)
  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hint || hint === email) return;
    if (
      e.key === 'Tab' ||
      e.key === 'ArrowRight' ||
      e.key === 'End'
    ) {
      e.preventDefault();
      setEmail(hint);
      setHint('');
    }
  };

  const handleHintClick = () => {
    if (hint && hint !== email) {
      setEmail(hint);
      setHint('');
    }
  };

  // 이메일 인증 코드 발송 (UI 로직)
  const handleSendVerificationCode = async () => {
    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 형식을 입력해주세요.');
      return;
    }
    setIsSendingCode(true);
    setCodeSentMessage('');
    setCodeError('');
    try {
      const res = await api.post('/auth/service/signup/sendcode', { email });
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

  // 이메일 인증 코드 확인 (UI 로직)
  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      setCodeError('6자리 인증 코드를 입력해주세요.');
      return;
    }
    setIsVerifyingCode(true);
    setCodeError('');
    try {
      const res = await api.post('/auth/service/signup/verifycode', {
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

  // 약관 모달 열기 핸들러
  const handleOpenTermsModal = (type: 'terms' | 'privacy') => {
    setCurrentModalType(type);
    if (type === 'terms') setIsTermsModalOpen(true);
    else setIsPrivacyModalOpen(true);
  };

  // 약관 모달 닫기 핸들러
  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false);
    setIsPrivacyModalOpen(false);
    setCurrentModalType(null);
  };

  // 약관 동의 핸들러 (모달에서 호출됨)
  const handleAgreeTerms = () => {
    if (currentModalType === 'terms') setAgreedTerms(true);
    else if (currentModalType === 'privacy') setAgreedPrivacy(true);
    handleCloseTermsModal();
  };

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
      formData.append('profileImage', profileImageFile); // key 이름 주의!
    }

    try {
      await api.post('/auth/register', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' },
       });
      // 회원가입 성공 후 라우팅 등 추가 로직
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
    <div className="app-container flex flex-col bg-gray-50">
      <Toast message={toastMessage} visible={toastVisible} />
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button
          onClick={() => router.push('/login')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaArrowLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center pr-8">회원가입</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-600">UMO</h2>
            <p className="text-gray-600 mt-3">우산 대여 서비스</p>
          </div>

          <form onSubmit={handleSubmitRegister} className="space-y-6">
            {/* 프로필 이미지 업로드 */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2 group">
                <img
                  src={profileImagePreview}
                  alt="프로필 이미지"
                  className="w-24 h-24 rounded-full object-cover border border-gray-200 bg-white transition-opacity duration-200 group-hover:opacity-80"
                  style={{ aspectRatio: '1/1' }}
                />
                <label
                  className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center"
                  title="프로필 이미지 변경"
                  style={{ zIndex: 2 }}
                >
                  <FaPencilAlt className="text-gray-600" />
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setProfileImageFile(e.target.files?.[0] || null)}
                  />
                </label>
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-10 pointer-events-none group-hover:bg-opacity-20 transition"></div>
              </div>
              <span className="text-xs text-gray-500 mt-1">프로필 이미지는 선택사항입니다</span>
            </div>

            <div className="space-y-4">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
                    placeholder="이름"
                  />
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <div className="relative flex">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white"
                    placeholder="이메일 주소"
                    disabled={isEmailVerified || isSendingCode}
                  />
                  <button
                    type="button"
                    onClick={handleSendVerificationCode}
                    disabled={!validateEmail(email) || isSendingCode || isEmailVerified}
                    className={`shrink-0 px-4 py-3 rounded-r-lg font-medium text-white transition-colors ${
                      (!validateEmail(email) || isSendingCode || isEmailVerified)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700'
                    }`}
                  >
                    {isSendingCode ? '전송 중...' : (isEmailVerified ? '인증 완료' : '인증 요청')}
                  </button>
                  {/* 이메일 자동완성 추천 */}
                  {hint && hint !== email && (
                  <span
                    className="absolute left-10 top-0 h-full flex items-center text-gray-400 pointer-events-auto select-none"
                    style={{
                      // input padding-left와 동일하게 left 조정
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                    onMouseDown={handleHintClick}
                    tabIndex={-1}
                  >
                    {/* 이미 입력한 부분은 투명, 추천되는 부분은 연하게 */}
                    <span style={{ opacity: 0 }}>{email}</span>
                    <span style={{ color: '#bbb' }}>{hint.slice(email.length)}</span>
                  </span>
                )}
                </div>
                {emailError && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FaExclamationCircle />{emailError}</p>}
                {codeSentMessage && <p className="mt-1 text-sm text-green-500 flex items-center gap-1"><FaCheckCircle />{codeSentMessage}</p>}
              </div>

              {/* 이메일 인증 코드 입력 */}
              {showVerificationInput && !isEmailVerified && (
                <div>
                  <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-1">인증 코드</label>
                  <div className="relative flex">
                    <input
                      id="verification-code"
                      name="verification-code"
                      type="text"
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white"
                      placeholder="인증 코드 6자리"
                      disabled={isVerifyingCode}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={verificationCode.length !== 6 || isVerifyingCode}
                      className={`shrink-0 px-4 py-3 rounded-r-lg font-medium text-white transition-colors ${
                        (verificationCode.length !== 6 || isVerifyingCode)
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-primary-600 hover:bg-primary-700'
                      }`}
                    >
                      {isVerifyingCode ? '확인 중...' : '확인'}
                    </button>
                  </div>
                  {codeError && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FaExclamationCircle />{codeError}</p>}
                </div>
              )}

              {/* 비밀번호 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
                    placeholder="최소 8자, 영문/숫자 포함"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {passwordError && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FaExclamationCircle />{passwordError}</p>}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
                    placeholder="비밀번호 재입력"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {confirmPasswordError && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FaExclamationCircle />{confirmPasswordError}</p>}
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={agreedTerms}
                  onClick={() => !agreedTerms && handleOpenTermsModal('terms')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 block text-sm text-gray-900 cursor-pointer"
                  onClick={() => !agreedTerms && handleOpenTermsModal('terms')}
                >
                  <span className="font-medium text-primary-600 hover:text-primary-500">서비스 이용 약관</span> 동의 (필수)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="agree-privacy"
                  name="agree-privacy"
                  type="checkbox"
                  checked={agreedPrivacy}
                  onClick={() => !agreedPrivacy && handleOpenTermsModal('privacy')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="agree-privacy"
                  className="ml-2 block text-sm text-gray-900 cursor-pointer"
                  onClick={() => !agreedPrivacy && handleOpenTermsModal('privacy')}
                >
                  <span className="font-medium text-primary-600 hover:text-primary-500">개인정보 처리 방침</span> 동의 (필수)
                </label>
              </div>
            </div>

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

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                로그인하기
              </Link>
            </p>
          </div>
        </div>
      </main>

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

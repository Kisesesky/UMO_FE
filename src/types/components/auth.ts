// src/types/components/auth.ts

export interface NameInputProps {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export interface EmailInputWithVerificationProps {
  email: string;
  setEmail: (v: string) => void;
  hint: string;
  setHint: (v: string) => void;
  isEmailVerified: boolean;
  isSendingCode: boolean;
  codeSentMessage: string;
  codeError: string;
  emailError: string;
  showVerificationInput: boolean;
  verificationCode: string;
  setVerificationCode: (v: string) => void;
  isVerifyingCode: boolean;
  handleSendVerificationCode: () => void;
  handleVerifyCode: () => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleHintClick: () => void;
}

export interface PasswordInputProps {
  value: string;
  onChange: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  error?: string;
}

export interface PasswordConfirmInputProps extends PasswordInputProps {}

export interface ProfileImageUploaderProps {
  profileImageFile: File | null;
  setProfileImageFile: (file: File | null) => void;
  previewUrl: string;
}

export interface TermsAgreementProps {
  agreedTerms: boolean;
  setAgreedTerms: (v: boolean) => void;
  agreedPrivacy: boolean;
  setAgreedPrivacy: (v: boolean) => void;
  handleOpenTermsModal: (type: 'terms' | 'privacy') => void;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  checkAuth?: boolean; // 인증 체크 여부 (기본값: true)
}
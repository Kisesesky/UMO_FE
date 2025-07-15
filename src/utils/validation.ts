// src/utils/validation.ts
export const validateName = (name: string) => 
  /^[a-zA-Z0-9가-힣]{1,8}$/.test(name) && !/[ㄱ-ㅎㅏ-ㅣ]/.test(name);
export const validateEmail = (email: string) => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$/.test(password); 
  // 9~20자, 영문 대소문자, 숫자, 특수문자(@$!%*?&) 모두 포함
// src/services/auth.service.ts
import api from '@/lib/api';
import { LoginRequest, RegisterRequest, AuthResponse, UserProfile } from '@/types/auth';
import { getErrorMessage } from '@/utils/errorMessage';
import { toFormData } from '@/utils/toFormData';

export const AuthService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const res = await api.post<AuthResponse>('/auth/login', data);
      return res.data;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error, '로그인에 실패했습니다.'));
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const formData = toFormData(data);
      const res = await api.post<AuthResponse>('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error, '회원가입에 실패했습니다.'));
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error, '로그아웃에 실패했습니다.'));
    }
  },

  getProfile: async (): Promise<UserProfile> => {
    try {
      const res = await api.get<UserProfile>('/auth/profile');
      return res.data;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error, '프로필 정보를 불러오지 못했습니다.'));
    }
  },
};

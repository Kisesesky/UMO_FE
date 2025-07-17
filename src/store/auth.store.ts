// src/store/auth.store.ts
import { create } from 'zustand';
import { AuthService } from '../services/auth.service';
import { LoginRequest, RegisterRequest } from '../types/auth';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  getProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await AuthService.login(data);
      set({ user: response.user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '로그인에 실패했습니다.', 
        isLoading: false 
      });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await AuthService.register(data);
      localStorage.setItem('token', response.accessToken);
      set({ user: response.user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || '회원가입에 실패했습니다.', 
        isLoading: false 
      });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  getProfile: async () => {
    set({ isLoading: true });
    try {
      const user = await AuthService.getProfile();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  }
}));
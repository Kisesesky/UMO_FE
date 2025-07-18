// src/store/auth.store.ts
import { toFormData } from '@/utils/toFormData';
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
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (data) => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const res = await AuthService.login(data);
      set({ user: res.user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || '로그인에 실패했습니다.', isLoading: false });
    }
  },

  register: async (data) => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const res = await AuthService.register(data);
      set({ user: res.user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || '회원가입에 실패했습니다.', isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false, error: null });
    }
  },

  getProfile: async () => {
    set({ isLoading: true });
    try {
      const user = await AuthService.getProfile();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

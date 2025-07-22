// src/store/admin-auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdminProfile } from '@/types/admin/admin-profile';
import { AdminAuthService } from '@/services/admin/admin-auth.service';

interface AdminAuthState {
  admin: AdminProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      async login(email, password) {
        set({ loading: true, error: null });
        try {
          const { token, admin } = await AdminAuthService.login(email, password);
          set({ token, admin, isAuthenticated: true, error: null });
          // 토큰 저장 방식: localStorage(쿠키, 보안 고려)
          localStorage.setItem('accessToken', token);
        } catch (err: any) {
          set({ error: err.response?.data?.message ?? '로그인 실패', isAuthenticated: false });
        } finally {
          set({ loading: false });
        }
      },
      logout() {
        set({ admin: null, token: null, isAuthenticated: false });
        // 토큰/스토리지 삭제
      },
      async fetchProfile() {
        set({ loading: true });
        try {
          const admin = await AdminAuthService.getMe();
          set({ admin, isAuthenticated: true, error: null });
        } catch {
          set({ admin: null, isAuthenticated: false });
        } finally {
          set({ loading: false });
        }
      }
    }),
    {
      name: 'admin-auth-store', // localStorage 키
      partialize: state => ({ admin: state.admin, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

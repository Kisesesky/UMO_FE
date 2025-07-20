// src/services/admin/admin-auth.service.ts
import api from '@/services/api';
import type { AdminProfile } from '@/types/admin/admin-profile';

export const AdminAuthService = {
  // 관리자 로그인 (JWT 반환) 
  async login(email: string, password: string): Promise<{ token: string; admin: AdminProfile }> {
    const { data } = await api.post('/admin/login', { email, password });
    /**
     * 백엔드가 { token, admin } 반환:  
     * - token: JWT access token  
     * - admin: 관리자의 기본 정보 (id, name, email, role 등)
     * 현업에서는 httpOnly 쿠키로도 세션 발급 가능. 
     */
    // 필요시 localStorage/sessionStorage에 토큰 저장
    return data;
  },

  // 관리자 로그아웃
  async logout(adminId?: number): Promise<{ message: string }> {
    // 일부 시스템은 백엔드 /admin/logout에 adminId 전송 필요
    const { data } = await api.post('/admin/logout', { adminId });
    // 클라이언트 토큰/쿠키 만료 처리도 추가
    return data;
  },

  // 인증 후 프로필 조회 (토큰 필요)
  async getMe(): Promise<AdminProfile> {
    const { data } = await api.get('/admin/me');
    return data;
  },
};

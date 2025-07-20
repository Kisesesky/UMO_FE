// src/services/admin/admin-profile.service.ts
import api from '@/services/api';
import type { AdminProfile, UpdateAdminProfileDto, ChangeAdminPasswordDto } from '@/types/admin/admin-profile';

export const AdminProfileService = {
  // 내 정보(프로필) 조회
  async getProfile(): Promise<AdminProfile> {
    const { data } = await api.get('/admin/me');
    return data;
  },

  // 내 정보(프로필) 수정
  async updateProfile(payload: UpdateAdminProfileDto): Promise<AdminProfile> {
    const { data } = await api.patch('/admin/me', payload);
    return data;
  },

  // 비밀번호 변경
  async changePassword(payload: ChangeAdminPasswordDto): Promise<{ message: string }> {
    const { data } = await api.patch('/admin/me/password', payload);
    return data;
  }
};

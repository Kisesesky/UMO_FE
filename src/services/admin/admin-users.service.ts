// src/services/admin/admin-users.service.ts
import api from '@/services/api';
import type { AdminUser, UpdateAdminUserDto } from '@/types/admin/admin-users';

export const AdminUsersService = {
  async getAll(): Promise<AdminUser[]> {
    const { data } = await api.get('/users');
    return data;
  },
  async getById(id: number): Promise<AdminUser> {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },
  async update(id: number, payload: UpdateAdminUserDto): Promise<AdminUser> {
    const { data } = await api.patch(`/users/${id}`, payload);
    return data;
  },
  // 계정 정지, 탈퇴 등 특수관리 메서드는 내부 컨트롤러 정책에 맞춰 추가
};

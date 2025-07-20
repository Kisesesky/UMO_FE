// src/services/admin/admin-logs.service.ts
import api from '@/services/api';
import type { AdminLog } from '@/types/admin/admin-logs';

export const AdminLogsService = {
  // 전체 로그 또는 필터(관리자별, 기간 등)
  async getAll(params?: { adminId?: number; from?: string; to?: string }): Promise<AdminLog[]> {
    const { data } = await api.get('/admin/logs', { params });
    return data;
  },

  // 특정 관리자 로그만
  async getByAdminId(adminId: number): Promise<AdminLog[]> {
    const { data } = await api.get(`/admin/${adminId}/logs`);
    return data;
  }
};

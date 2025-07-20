// src/services/admin/admin-umbrellas.service.ts
import api from '@/services/api';
import type { AdminUmbrella, CreateUmbrellaDto, UpdateUmbrellaDto } from '@/types/admin/admin-umbrellas';

export const AdminUmbrellasService = {
  async getAll(): Promise<AdminUmbrella[]> {
    const { data } = await api.get('/umbrellas');
    return data;
  },
  async getById(id: number): Promise<AdminUmbrella> {
    const { data } = await api.get(`/umbrellas/${id}`);
    return data;
  },
  async create(payload: CreateUmbrellaDto): Promise<AdminUmbrella> {
    const { data } = await api.post('/umbrellas', payload);
    return data;
  },
  async update(id: number, payload: UpdateUmbrellaDto): Promise<AdminUmbrella> {
    const { data } = await api.put(`/umbrellas/${id}`, payload);
    return data;
  },
  // 상태 변경 (대여중, 비활성, 분실 등)
  async changeStatus(id: number, status: string): Promise<AdminUmbrella> {
    const { data } = await api.put(`/umbrellas/${id}/status`, { status });
    return data;
  },
  // 분실 처리
  async markAsLost(id: number): Promise<AdminUmbrella> {
    const { data } = await api.put(`/umbrellas/${id}/lost`);
    return data;
  },
  // 위치 이동
  async moveToStation(id: number, stationId: number): Promise<AdminUmbrella> {
    const { data } = await api.put(`/umbrellas/${id}/move`, { stationId });
    return data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/umbrellas/${id}`);
  },
};

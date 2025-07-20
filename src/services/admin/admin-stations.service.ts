// src/services/admin/admin-stations.service.ts
import api from '@/services/api';
import type { AdminStation, CreateStationDto, UpdateStationDto } from '@/types/admin/admin-stations';
import { AdminUmbrella } from '@/types/admin/admin-umbrellas';

export const AdminStationsService = {
  async getAll(): Promise<AdminStation[]> {
    const { data } = await api.get('/stations');
    return data;
  },
  async getById(id: number): Promise<AdminStation> {
    const { data } = await api.get(`/stations/${id}`);
    return data;
  },
  async create(payload: CreateStationDto): Promise<AdminStation> {
    const { data } = await api.post('/stations', payload);
    return data;
  },
  async update(id: number, payload: UpdateStationDto): Promise<AdminStation> {
    const { data } = await api.put(`/stations/${id}`, payload);
    return data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/stations/${id}`);
  },
  // 대여소 우산 목록
  async getUmbrellas(stationId: number): Promise<AdminUmbrella[]> {
    const { data } = await api.get(`/stations/${stationId}/umbrellas`);
    return data;
  },
};

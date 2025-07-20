// src/services/admin/admin-events.service.ts
import api from '@/services/api';
import type { AdminEvent, CreateEventDto, UpdateEventDto } from '@/types/admin/admin-events';

export const AdminEventsService = {
  async getAll(): Promise<AdminEvent[]> {
    const { data } = await api.get('/events');
    return data;
  },

  async getById(id: number): Promise<AdminEvent> {
    const { data } = await api.get(`/events/${id}`);
    return data;
  },

  async create(payload: CreateEventDto): Promise<AdminEvent> {
    const { data } = await api.post('/events', payload);
    return data;
  },

  async update(id: number, payload: UpdateEventDto): Promise<AdminEvent> {
    const { data } = await api.patch(`/events/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/events/${id}`);
  }
};

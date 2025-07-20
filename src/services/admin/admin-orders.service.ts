// src/services/admin/admin-orders.service.ts
import type { AdminOrder } from '@/types/admin/admin-orders';
import api from '@/services/api';

export const AdminOrdersService = {
  // 전체 주문 목록
  async getAll(params?: { [key: string]: any }): Promise<AdminOrder[]> {
    const { data } = await api.get('/orders', { params });
    return data;
  },

  // 단일 주문 조회
  async getById(id: number): Promise<AdminOrder> {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  // 주문 완료 처리
  async complete(id: number): Promise<AdminOrder> {
    const { data } = await api.post(`/orders/${id}/complete`);
    return data;
  },

  // 주문 취소 처리
  async cancel(id: number): Promise<AdminOrder> {
    const { data } = await api.post(`/orders/${id}/cancel`);
    return data;
  }
};

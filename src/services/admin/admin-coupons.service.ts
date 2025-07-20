// src/services/admin/admin-coupons.service.ts
import api from '@/services/api';
import type { AdminCoupon, CreateCouponDto, UpdateCouponDto } from '@/types/admin/admin-coupons';

export const AdminCouponsService = {
  // 쿠폰 전체 조회(필터, 검색 등은 추후 파라미터 확장)
  async getAll(): Promise<AdminCoupon[]> {
    const { data } = await api.get('/coupons');
    return data;
  },

  // 단일 쿠폰 조회
  async getById(id: number): Promise<AdminCoupon> {
    const { data } = await api.get(`/coupons/${id}`);
    return data;
  },

  // 쿠폰 생성
  async create(payload: CreateCouponDto): Promise<AdminCoupon> {
    const { data } = await api.post('/coupons', payload);
    return data;
  },

  // 쿠폰 수정
  async update(id: number, payload: UpdateCouponDto): Promise<AdminCoupon> {
    const { data } = await api.patch(`/coupons/${id}`, payload);
    return data;
  },

  // 쿠폰 삭제
  async remove(id: number): Promise<void> {
    await api.delete(`/coupons/${id}`);
  },

  // 쿠폰 발급(특수 케이스용)
  async issueToUser(couponId: number, userId: number) {
    const { data } = await api.post(`/coupons/${couponId}/issue`, { userId });
    return data;
  }
};

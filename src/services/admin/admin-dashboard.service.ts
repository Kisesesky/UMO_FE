// src/services/admin/admin-dashboard.service.ts
import api from '@/services/api';
import type { AdminDashboardStats, DashboardChartData } from '@/types/admin/admin-dashboard';

export const AdminDashboardService = {
  // 통계 요약
  async getSummary(): Promise<AdminDashboardStats> {
    const { data } = await api.get('/admin/stats/summary');
    return data;
  },

  // 주요 지표 차트/트렌드 데이터
  async getCharts(): Promise<DashboardChartData> {
    const { data } = await api.get('/admin/stats/actions/daily');
    return data;
  },

  // 최근 액션/이벤트, 장애 현황 등 추가
  async getRecentEvents(): Promise<any[]> {
    const { data } = await api.get('/admin/dashboard/events');
    return data;
  }
};

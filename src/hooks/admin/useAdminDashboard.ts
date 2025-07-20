// src/hooks/admin/useAdminDashboard.ts
import useSWR from 'swr';
import { AdminDashboardService } from '@/services/admin/admin-dashboard.service';
import { AdminDashboardStats, DashboardChartData } from '@/types/admin/admin-dashboard';

export function useAdminDashboardSummary() {
  const { data, error, isLoading, mutate } = useSWR<AdminDashboardStats>('/admin/dashboard/summary', AdminDashboardService.getSummary);
  return { summary: data, error, isLoading, refresh: mutate };
}

export function useAdminDashboardCharts() {
  const { data, error, isLoading, mutate } = useSWR<DashboardChartData>('/admin/dashboard/charts', AdminDashboardService.getCharts);
  return { charts: data, error, isLoading, refresh: mutate };
}

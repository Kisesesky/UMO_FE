// src/hooks/admin/useAdminLogs.ts
import useSWR from 'swr';
import { AdminLogsService } from '@/services/admin/admin-logs.service';
import { AdminLog } from '@/types/admin/admin-logs';

export function useAdminLogs(params = {}) {
  const queryKey = ['/admin/logs', JSON.stringify(params)];
  const { data, error, isLoading, mutate } = useSWR<AdminLog[]>(queryKey, () => AdminLogsService.getAll(params));
  return { logs: data, error, isLoading, refresh: mutate };
}

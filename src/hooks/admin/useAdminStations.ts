// src/hooks/admin/useAdminStations.ts
import useSWR from 'swr';
import { AdminStationsService } from '@/services/admin/admin-stations.service';
import { AdminStation } from '@/types/admin/admin-stations';

export function useAdminStations() {
  const { data, error, mutate, isLoading } = useSWR<AdminStation[]>('/admin/stations', AdminStationsService.getAll);
  return { stations: data, isLoading, error, refresh: mutate };
}

export function useAdminStationDetail(id: number | string) {
  const { data, error, mutate, isLoading } = useSWR<AdminStation>(id ? `/admin/stations/${id}` : null, () => AdminStationsService.getById(Number(id)));
  return { station: data, isLoading, error, refresh: mutate };
}

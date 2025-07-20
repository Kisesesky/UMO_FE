// src/hooks/admin/useAdminUmbrellas.ts
import useSWR from 'swr';
import { AdminUmbrellasService } from '@/services/admin/admin-umbrellas.service';
import { AdminUmbrella } from '@/types/admin/admin-umbrellas';

export function useAdminUmbrellas() {
  const { data, error, mutate, isLoading } = useSWR<AdminUmbrella[]>('/admin/umbrellas', AdminUmbrellasService.getAll);
  return { umbrellas: data, isLoading, error, refresh: mutate };
}

export function useAdminUmbrellaDetail(id: number | string) {
  const { data, error, mutate, isLoading } = useSWR<AdminUmbrella>(id ? `/admin/umbrellas/${id}` : null, () => AdminUmbrellasService.getById(Number(id)));
  return { umbrella: data, isLoading, error, refresh: mutate };
}

// src/hooks/admin/useAdminEvents.ts
import useSWR from 'swr';
import { AdminEventsService } from '@/services/admin/admin-events.service';
import { AdminEvent } from '@/types/admin/admin-events';

export function useAdminEvents() {
  const { data, error, isLoading, mutate } = useSWR<AdminEvent[]>('/admin/events', AdminEventsService.getAll);
  return { events: data, error, isLoading, refresh: mutate };
}

export function useAdminEventDetail(id: number | string) {
  const { data, error, isLoading, mutate } = useSWR<AdminEvent>(id ? `/admin/events/${id}` : null, () => AdminEventsService.getById(Number(id)));
  return { event: data, error, isLoading, refresh: mutate };
}

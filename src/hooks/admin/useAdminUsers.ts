// src/hooks/admin/useAdminUsers.ts
import useSWR from 'swr';
import { AdminUsersService } from '@/services/admin/admin-users.service';
import { AdminUser } from '@/types/admin/admin-users';

export function useAdminUsers() {
  const { data, error, mutate, isLoading } = useSWR<AdminUser[]>('/admin/users', AdminUsersService.getAll);
  return { users: data, isLoading, error, refresh: mutate };
}

export function useAdminUserDetail(id: number | string) {
  const { data, error, mutate, isLoading } = useSWR<AdminUser>(id ? `/admin/users/${id}` : null, () => AdminUsersService.getById(Number(id)));
  return { user: data, isLoading, error, refresh: mutate };
}

// src/hooks/admin/useAdminProfile.ts
import useSWR from 'swr';
import { AdminProfileService } from '@/services/admin/admin-profile.service';
import { AdminProfile } from '@/types/admin/admin-profile';

export function useAdminProfile() {
  const { data, error, isLoading, mutate } = useSWR<AdminProfile>('/admin/profile', AdminProfileService.getProfile);
  return { profile: data, error, isLoading, refresh: mutate };
}

// src/services/user.service.ts
import api from '@/services/api'; // axios 인스턴스
import { UserProfile, NotificationSettings } from '@/types/user'; // 타입 정의

export const userService = {
  // 사용자 프로필 업데이트
  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.patch<UserProfile>(`/users/${userId}/profile`, data);
    return response.data;
  },
  
  // 알림 설정 불러오기
  async getNotificationSettings(userId: string): Promise<NotificationSettings> {
    const response = await api.get<NotificationSettings>(`/users/${userId}/settings/notifications`);
    return response.data;
  },
  
  // 알림 설정 업데이트
  async updateNotificationSettings(userId: string, settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const response = await api.patch<NotificationSettings>(`/users/${userId}/settings/notifications`, settings);
    return response.data;
  },
  
  // 계정 삭제 (auth.service.ts에 있을 수도 있음)
  async deleteAccount(): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>('/users/me'); // 또는 /auth/delete-account
    return response.data;
  },
};

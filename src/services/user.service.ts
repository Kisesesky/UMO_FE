// src/services/user.service.ts
import api from '@/services/api';
import { NotificationSettings } from '@/types/user';

export const userService = {
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
    const response = await api.delete<{ message: string }>('/users/me');
    return response.data;
  },

  // (내) 프로필(이름/이미지) 수정
  async updateMe(form: { name?: string; profileImage?: File | string }) {
    const formData = new FormData();
    if (form.name) formData.append('name', form.name);
    if (typeof form.profileImage === 'object') {
      // File 객체(새로 업로드)
      formData.append('profileImage', form.profileImage);
    } else if (typeof form.profileImage === 'string' && form.profileImage.length > 0) {
      // 기존 이미지 문자열(바꾸지 않으면 보내지 않기)
      // formData.append('profileImage', form.profileImage);
    }
    // PATCH or PUT => /users/me
    const res = await api.patch('/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  // 내 비밀번호 변경: PUT /users/me/password
  async changePassword(payload: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    const res = await api.put<{ message: string }>('/users/me/password', payload);
    return res.data;
  },
};

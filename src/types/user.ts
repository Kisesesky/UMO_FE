// src/types/user.ts
export interface UserProfile {
  id: string;
  email: string;
  name: string;
   // ... 기타 프로필 정보
}

export interface NotificationSettings {
  pushNotificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  smsNotificationsEnabled: boolean;
  // ... 기타 알림 설정
}
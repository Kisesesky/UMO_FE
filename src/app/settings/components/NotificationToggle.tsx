// src/app/settings/components/NotificationToggle.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { userService } from '@/services/user.service'; // 사용자 서비스 임포트
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // React Query 사용 예시
import toast from "react-hot-toast";

interface NotificationToggleProps {
  userId: string; // 현재 로그인한 사용자 ID
}

export const NotificationToggle: React.FC<NotificationToggleProps> = ({ userId }) => {
  const queryClient = useQueryClient();

  // React Query를 사용하여 알림 설정 상태 불러오기
  const { data: notificationsEnabled, isLoading, isError } = useQuery({
    queryKey: ['userNotifications', userId],
    queryFn: () => userService.getNotificationSettings(userId), // 백엔드에서 알림 설정 불러오는 API
    select: (data) => data.pushNotificationsEnabled, // 응답에서 특정 필드 선택
  });

  // React Query를 사용하여 알림 설정 업데이트 뮤테이션
  const updateNotificationMutation = useMutation({
    mutationFn: (enabled: boolean) => userService.updateNotificationSettings(userId, { pushNotificationsEnabled: enabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userNotifications', userId] }); // 성공 시 캐시 무효화
      toast.success('알림 설정이 업데이트되었습니다.');
    },
    onError: (error) => {
      toast.error(`알림 설정 업데이트 실패: ${error.message}`);
    },
  });

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked;
    updateNotificationMutation.mutate(newStatus);
  };

  if (isLoading) return <span>로딩 중...</span>;
  if (isError) return <span>알림 설정을 불러올 수 없습니다.</span>;

  return (
    <label htmlFor="toggle-notifications" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id="toggle-notifications"
          className="sr-only"
          checked={notificationsEnabled}
          onChange={handleToggle}
          disabled={updateNotificationMutation.isPending} // API 호출 중에는 비활성화
        />
        <div className="block bg-gray-300 dark:bg-gray-600 w-10 h-6 rounded-full"></div>
        <div className={`dot absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition
          ${notificationsEnabled ? 'translate-x-full bg-indigo-600 dark:bg-indigo-500' : ''}`}></div>
      </div>
    </label>
  );
};
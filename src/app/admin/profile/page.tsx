// src/app/admin/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { AdminProfileService } from '@/services/admin/admin-profile.service';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import type { AdminProfile } from '@/types/admin/admin-profile';
import { roleLabel } from '../utils/adminRoleLabel';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    AdminProfileService.getProfile().then(setProfile);
  }, []);

  if (!profile)
    return (
      <ProtectedAdminRoute>
        <div className="py-16 text-center text-gray-400 font-medium">로딩...</div>
      </ProtectedAdminRoute>
    );

  return (
    <ProtectedAdminRoute>
      <section className="max-w-sm mx-auto bg-white rounded-2xl shadow px-8 py-10 mt-10">
        <h1 className="text-2xl font-bold mb-8 text-center">내 관리자 계정</h1>
        <ProfileField label="이름" value={profile.name} />
        <ProfileField label="이메일" value={profile.email} />
        <ProfileField label="역할" value={roleLabel(profile.role)} />
        <ProfileField label="가입일" value={new Date(profile.createdAt).toLocaleDateString()} />
        {/* 비밀번호 변경 버튼/모달 없음 */}
        {/* 권한상 상위관리자만 변경 */}
      </section>
    </ProtectedAdminRoute>
  );
}

function ProfileField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex mb-5">
      <span className="w-20 font-semibold text-gray-500 flex-shrink-0">{label}</span>
      <span className="">{value}</span>
    </div>
  );
}

// src/app/admin/profile/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { AdminProfileService } from '@/services/admin/admin-profile.service';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import type { AdminProfile } from '@/types/admin/admin-profile';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [showPwModal, setShowPwModal] = useState(false);

  useEffect(() => {
    AdminProfileService.getProfile().then(setProfile);
  }, []);

  if (!profile) return <div>로딩...</div>;

  return (
    <ProtectedAdminRoute>
      <div style={{
        maxWidth: 420, margin: '2rem auto', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px #eee',
        background: 'white'
      }}>
        <h1 style={{ marginBottom: 32 }}>내 관리자 계정</h1>
        <ProfileField label="이름" value={profile.name} />
        <ProfileField label="이메일" value={profile.email} />
        <ProfileField label="역할" value={profile.role} />
        <ProfileField label="가입일" value={new Date(profile.createdAt).toLocaleDateString()} />
        <button onClick={() => setShowPwModal(true)} style={{ marginTop: 24 }}>
          비밀번호 변경
        </button>
        {showPwModal && <ChangePasswordModal onClose={() => setShowPwModal(false)} />}
      </div>
    </ProtectedAdminRoute>
  );
}

// 🟢 정보 한 칸 스타일링용 컴포넌트 (Option: UI 프레임워크 Table/Field/Box/Stack 등으로 대체 가능)
function ProfileField({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', marginBottom: 12 }}>
      <div style={{ width: 80, color: '#888', fontWeight: 600 }}>{label}</div>
      <div>{value}</div>
    </div>
  );
}

// 🟢 비밀번호 변경 모달(기본 예시, 실제 Validation/에러처리 추가 권장)
function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 변경 호출
    await AdminProfileService.changePassword({ currentPassword: currentPw, newPassword: newPw })
      .then(() => setResult('비밀번호가 변경되었습니다.')).catch(() => setResult('변경 실패! 다시 시도해주세요.'));
  };

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000
    }}>
      <form onSubmit={handleSubmit}
        style={{
          background: "white", borderRadius: 8, boxShadow: '0 2px 12px #eee',
          padding: 32, minWidth: 320,
        }}
      >
        <h3 style={{ marginBottom: 16 }}>비밀번호 변경</h3>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={currentPw}
            onChange={e => setCurrentPw(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPw}
            onChange={e => setNewPw(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button type="button" onClick={onClose}>닫기</button>
          <button type="submit">변경</button>
        </div>
        {result && <div style={{ marginTop: 16, color: result.includes('실패') ? 'red' : 'green' }}>{result}</div>}
      </form>
    </div>
  );
}

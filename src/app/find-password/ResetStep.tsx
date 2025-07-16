// src/app/find-password/ResetStep.tsx
'use client';
import { useState } from 'react';
import api from '@/lib/api';

export default function ResetStep({ email, onSuccess }: { email:string; onSuccess:()=>void }) {
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError('');
    setLoading(true);
    try {
      await api.patch('/auth/service/password/find/reset', {
        email,
        newPassword: pw1,
        confirmPassword: pw2,
      });
      onSuccess();
    } catch (e: any) {
      setError(e.response?.data?.message || '비밀번호 변경 실패');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">새 비밀번호</label>
        <input
          type="password"
          value={pw1}
          onChange={e=>setPw1(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          placeholder="새 비밀번호"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">비밀번호 확인</label>
        <input
          type="password"
          value={pw2}
          onChange={e=>setPw2(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          placeholder="비밀번호 재입력"
        />
      </div>
      <button
        className="w-full py-2 rounded-lg bg-primary-600 text-white font-bold"
        onClick={handleReset}
        disabled={!pw1 || !pw2 || pw1 !== pw2 || loading}
        type="button"
      >비밀번호 변경</button>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

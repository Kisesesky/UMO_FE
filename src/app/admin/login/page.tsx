// src/app/admin/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuthService } from '@/services/admin/admin-auth.service';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await AdminAuthService.login(email, password);
    router.push('/admin/dashboard');
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>관리자 로그인</h2>
      <input type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">로그인</button>
    </form>
  );
}

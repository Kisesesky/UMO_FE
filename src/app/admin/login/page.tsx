// src/app/admin/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { AdminAuthService } from '@/services/admin/admin-auth.service';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await AdminAuthService.login(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          '로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인하세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-md w-full mx-auto"
      autoComplete="on"
    >
      <h2 className="text-2xl font-bold text-center mb-6">관리자 로그인</h2>

      {/* 이메일 입력 */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          이메일
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
            placeholder="이메일 주소"
          />
        </div>
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          비밀번호
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
            placeholder="비밀번호"
          />
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* 로그인 버튼 */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-3 rounded-lg font-medium text-white shadow-button transition-colors ${
            isLoading
              ? 'bg-primary-400 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-700 active:bg-primary-800'
          }`}
          aria-busy={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </div>
    </form>
  );
}

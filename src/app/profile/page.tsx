// src/app/profile/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft, FaUser, FaCamera } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 프로필 업데이트 API 호출 (실제 구현 필요)
      // await UserService.updateProfile({ name, phone });
      alert('프로필이 성공적으로 업데이트되었습니다.');
      router.back();
    } catch (error: any) {
      alert(`프로필 업데이트 실패: ${error.message || '알 수 없는 오류가 발생했습니다.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4"
            >
              <FaArrowLeft />
            </button>
            <h1 className="header-title">프로필 편집</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <FaUser size={40} className="text-gray-400" />
                </div>
                <button className="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-full p-2">
                  <FaCamera size={14} />
                </button>
              </div>
              <h2 className="mt-4 font-medium text-lg">{name || '사용자'}</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">이메일은 변경할 수 없습니다.</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 ${isLoading ? 'bg-gray-400' : 'bg-black'} text-white rounded-lg`}
              >
                {isLoading ? '저장 중...' : '저장하기'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
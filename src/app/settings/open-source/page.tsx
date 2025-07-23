// src/app/settings/open-source/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import ModernScrollbar from '@/components/custom-scrollbar/ModernScrollbar';
import OpenSourceLicenseItem from '../components/OpenSourceLicenseItem';
import { openSourceLicenses } from '../data/openSourceLicenses';

export default function OpenSourceLicensesPage() {
  const router = useRouter();

  return (
    <div className="app-container flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* 상단 헤더 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-2 flex items-center">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="뒤로"
        >
          <FaArrowLeft className="text-gray-700 dark:text-gray-300" size={18} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex-1 text-center pr-8">
          오픈소스 라이선스
        </h1>
      </header>

      {/* 스크롤 가능한 컨텐츠 */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-6 pb-10 overflow-hidden">
        <ModernScrollbar className="h-full">
          <section className="min-h-full space-y-4">
            {openSourceLicenses.map((license) => (
              <OpenSourceLicenseItem key={license.name} {...license} />
            ))}
          </section>
        </ModernScrollbar>
      </main>
    </div>
  );
}

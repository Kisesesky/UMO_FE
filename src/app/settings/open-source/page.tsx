// src/app/settings/open-source/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import OpenSourceLicenseItem from '../components/OpenSourceLicenseItem';
import { openSourceLicenses } from '../data/openSourceLicenses';

export default function OpenSourceLicensesPage() {
  const router = useRouter();

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white flex items-center transition-colors"
        type="button"
        aria-label="뒤로가기"
      >
        <FaArrowLeft className="mr-2" />
        뒤로가기
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        오픈소스 라이선스
      </h1>

      <div className="space-y-4">
        {openSourceLicenses.map((license) => (
          <OpenSourceLicenseItem key={license.name} {...license} />
        ))}
      </div>
    </div>
  );
}

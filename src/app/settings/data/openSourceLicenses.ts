// src/app/settings/data/openSourceLicenses.ts
export type OpenSourceLicense = {
  name: string;
  description: string;
  license: string;
  url: string;
};

export const openSourceLicenses = [
  {
    name: 'React',
    description: 'UI 라이브러리',
    license: 'MIT',
    url: 'https://github.com/facebook/react',
  },
  {
    name: 'Next.js',
    description: 'React 기반 프레임워크',
    license: 'MIT',
    url: 'https://github.com/vercel/next.js',
  },
  {
    name: 'Tailwind CSS',
    description: '유틸리티 퍼스트 CSS 프레임워크',
    license: 'MIT',
    url: 'https://github.com/tailwindlabs/tailwindcss',
  },
  {
    name: 'React Icons',
    description: '아이콘 라이브러리',
    license: 'MIT',
    url: 'https://github.com/react-icons/react-icons',
  },
];

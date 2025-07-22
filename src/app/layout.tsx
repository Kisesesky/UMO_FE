// src/app/layout.tsx
import { ThemeProvider } from '@/context/TemeContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UMO - 우산 대여 서비스',
  description: '언제 어디서나 편리하게 우산을 대여하세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

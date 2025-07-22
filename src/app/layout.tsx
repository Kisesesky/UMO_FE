// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from "next";
import ClientProviders from './ClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UMO - 우산 대여 서비스',
  description: '언제 어디서나 편리하게 우산을 대여하세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

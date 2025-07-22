// src/app/admin/layout.tsx
import React from 'react';
import AdminDrawer from './_components/AdminDrawer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminDrawer />
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}


// src/app/admin/logs/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { AdminLogsService } from '@/services/admin/admin-logs.service';
import type { AdminLog } from '@/types/admin/admin-logs';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import AdminLogTable from '@/components/admin/AdminLogTable';

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  useEffect(() => {
    AdminLogsService.getAll().then(setLogs);
  }, []);
  return (
    <ProtectedAdminRoute>
      <section className="max-w-5xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-8">운영 로그</h1>
        <div className="bg-white rounded-xl shadow p-5">
          <AdminLogTable logs={logs} />
        </div>
      </section>
    </ProtectedAdminRoute>
  );
}

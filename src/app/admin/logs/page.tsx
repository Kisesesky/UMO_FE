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
      <h1>운영 로그</h1>
      <AdminLogTable logs={logs} />
    </ProtectedAdminRoute>
  );
}

// src/app/admin/events/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { AdminEventsService } from '@/services/admin/admin-events.service';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import type { AdminEvent } from '@/types/admin/admin-events';
import AdminEventTable from 'components/admin/AdminEventTable';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);

  useEffect(() => {
    AdminEventsService.getAll().then(setEvents);
  }, []);

    return (
    <ProtectedAdminRoute>
      <h1>이벤트/공지 관리</h1>
      <button>신규 이벤트 등록</button>
      <AdminEventTable events={events} />
    </ProtectedAdminRoute>
  );
}

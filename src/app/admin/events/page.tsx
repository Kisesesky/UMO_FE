// src/app/admin/events/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { AdminEventsService } from '@/services/admin/admin-events.service';
import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';
import type { AdminEvent } from '@/types/admin/admin-events';
import AdminEventTable from '@/components/admin/AdminEventTable';
import { FaPlus } from 'react-icons/fa';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminEventsService.getAll()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedAdminRoute>
      <section className="max-w-5xl mx-auto p-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">이벤트/공지 관리</h1>
          <button
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow hover:bg-primary-700 transition-colors"
            onClick={() => alert('신규 이벤트 등록')}
          >
            <FaPlus className="mr-2" />
            신규 이벤트 등록
          </button>
        </header>

        <div className="bg-white rounded-xl shadow p-5">
          {loading ? (
            <div className="py-16 text-center text-gray-400 font-medium">로딩 중...</div>
          ) : (
            <AdminEventTable events={events} />
          )}
        </div>
      </section>
    </ProtectedAdminRoute>
  );
}

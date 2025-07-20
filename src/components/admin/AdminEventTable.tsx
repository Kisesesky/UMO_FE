// src/components/admin/AdminEventTable.tsx
import AdminTable from './AdminTable';
import { AdminEvent } from '@/types/admin/admin-events';

interface Props {
  events: AdminEvent[];
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}
export default function AdminEventTable({ events, onEdit, onRemove }: Props) {
  // 여기서 (e: AdminEvent)로 정확히 명시!
  const columns = [
    { header: 'ID', accessor: (e: AdminEvent) => e.id },
    { header: '제목', accessor: (e: AdminEvent) => e.title },
    { header: '상태', accessor: (e: AdminEvent) => (e.isActive ? '진행중' : '종료') },
    { header: '시작일', accessor: (e: AdminEvent) => e.startDate ?? '-' },
    { header: '종료일', accessor: (e: AdminEvent) => e.endDate ?? '-' },
  ];

  return (
    <AdminTable<AdminEvent>
      columns={columns}
      data={events}
      rowKey={e => e.id}
      actions={e => (
        <>
          {onEdit && <button onClick={evt => { evt.stopPropagation(); onEdit(e.id); }}>수정</button>}
          {onRemove && <button onClick={evt => { evt.stopPropagation(); onRemove(e.id); }}>삭제</button>}
        </>
      )}
    />
  );
}

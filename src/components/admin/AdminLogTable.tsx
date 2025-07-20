// src/components/admin/AdminLogTable.tsx
import AdminTable from './AdminTable';
import { AdminLog } from '@/types/admin/admin-logs';

interface Props {
  logs: AdminLog[];
}

export default function AdminLogTable({ logs }: Props) {
  const columns = [
    { header: '일시', accessor: (l: AdminLog) => new Date(l.createdAt).toLocaleString() },
    { header: '관리자', accessor: (l: AdminLog) => l.admin?.name ?? '-' },
    { header: '액션', accessor: (l: AdminLog) => l.action },
    { header: '타입', accessor: (l: AdminLog) => l.targetType },
    { header: '상세', accessor: (l: AdminLog) => l.message },
  ];
  return (
    <AdminTable<AdminLog>
      columns={columns}
      data={logs}
      rowKey={l => l.id}
    />
  );
}

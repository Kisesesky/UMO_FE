// src/components/admin/AdminUserTable.tsx
import AdminTable from './AdminTable';
import { AdminUser } from '@/types/admin/admin-users';

interface Props {
  users: AdminUser[];
  onDetail?: (id: number) => void;
  onEdit?: (id: number) => void;
}
export default function AdminUserTable({ users, onDetail, onEdit }: Props) {
  const columns = [
    { header: 'ID', accessor: (u: AdminUser) => u.id },
    { header: '이름', accessor: (u: AdminUser) => u.name },
    { header: '이메일', accessor: (u: AdminUser) => u.email },
    { header: '권한', accessor: (u: AdminUser) => u.role },
    { header: '상태', accessor: (u: AdminUser) => u.isActive ? '활성' : '비활성' },
    { header: '가입일', accessor: (u: AdminUser) => new Date(u.createdAt).toLocaleDateString() },
  ];
  return (
    <AdminTable<AdminUser>
      columns={columns}
      data={users}
      rowKey={u => u.id}
      actions={u => (
        <>
          {onDetail && <button onClick={e => { e.stopPropagation(); onDetail(u.id); }}>상세</button>}
          {onEdit && <button onClick={e => { e.stopPropagation(); onEdit(u.id); }}>수정</button>}
        </>
      )}
    />
  );
}

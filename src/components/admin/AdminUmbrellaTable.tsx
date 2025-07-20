// src/components/admin/AdminUmbrellaTable.tsx
import AdminTable from './AdminTable';
import { AdminUmbrella } from '@/types/admin/admin-umbrellas';

interface Props {
  umbrellas: AdminUmbrella[];
  onDetail?: (id: number) => void;
  onMarkLost?: (id: number) => void;
  onEdit?: (id: number) => void;
}

export default function AdminUmbrellaTable({ umbrellas, onDetail, onMarkLost, onEdit }: Props) {
  const columns = [
    { header: 'ID', accessor: (u: AdminUmbrella) => u.id },
    { header: '코드', accessor: (u: AdminUmbrella) => u.code },
    { header: '상태', accessor: (u: AdminUmbrella) => u.status },
    { header: '대여소', accessor: (u: AdminUmbrella) => u.station?.name ?? '-' },
    { header: '등록일', accessor: (u: AdminUmbrella) => new Date(u.createdAt).toLocaleDateString() },
  ];
  return (
    <AdminTable<AdminUmbrella>
      columns={columns}
      data={umbrellas}
      rowKey={u => u.id}
      actions={u => (
        <>
          {onDetail && <button onClick={e => { e.stopPropagation(); onDetail(u.id); }}>상세</button>}
          {onEdit && <button onClick={e => { e.stopPropagation(); onEdit(u.id); }}>수정</button>}
          {onMarkLost && u.status !== 'LOST' && (
            <button
              onClick={e => {
                e.stopPropagation();
                if (window.confirm('정말 분실 처리 하시겠습니까?')) {
                  onMarkLost(u.id);
                }
              }}
            >분실</button>
          )}
        </>
      )}
    />
  );
}

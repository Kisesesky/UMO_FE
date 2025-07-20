// src/components/admin/AdminStationTable.tsx
import AdminTable from './AdminTable';
import { AdminStation } from '@/types/admin/admin-stations';

interface Props {
  stations: AdminStation[];
  onDetail?: (id: number) => void;
  onEdit?: (id: number) => void;
}
export default function AdminStationTable({ stations, onDetail, onEdit }: Props) {
  const columns = [
    { header: 'ID', accessor: (s: AdminStation) => s.id },
    { header: '이름', accessor: (s: AdminStation) => s.name },
    { header: '주소', accessor: (s: AdminStation) => s.address ?? '-' },
    { header: '위도', accessor: (s: AdminStation) => s.latitude },
    { header: '경도', accessor: (s: AdminStation) => s.longitude },
    { header: '우산수', accessor: (s: AdminStation) => s.umbrellaCount ?? '-' },
    { header: '상태', accessor: (s: AdminStation) => s.isActive ? '활성' : '비활성' },
    { header: '수정일', accessor: (s: AdminStation) => new Date(s.updatedAt).toLocaleDateString() },
  ];
  return (
    <AdminTable<AdminStation>
      columns={columns}
      data={stations}
      rowKey={s => s.id}
      actions={s => (
        <>
          {onDetail && <button onClick={e => { e.stopPropagation(); onDetail(s.id); }}>상세</button>}
          {onEdit && <button onClick={e => { e.stopPropagation(); onEdit(s.id); }}>수정</button>}
        </>
      )}
    />
  );
}

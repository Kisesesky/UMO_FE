// src/components/admin/AdminProductTable.tsx
import AdminTable from './AdminTable';
import { AdminProduct } from '@/types/admin/admin-products';

interface Props {
  products: AdminProduct[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}
export default function AdminProductTable({ products, onEdit, onDelete }: Props) {
  const columns = [
    { header: 'ID', accessor: (p: AdminProduct) => p.id },
    { header: '이름', accessor: (p: AdminProduct) => p.name },
    { header: '타입', accessor: (p: AdminProduct) => p.productType },
    { header: '가격', accessor: (p: AdminProduct) => `${p.price} ${p.currencyType}` },
    { header: '상태', accessor: (p: AdminProduct) => p.isActive ? '활성' : '비활성' },
    { header: '수정일', accessor: (p: AdminProduct) => new Date(p.updatedAt).toLocaleDateString() },
  ];
  return (
    <AdminTable<AdminProduct>
      columns={columns}
      data={products}
      rowKey={p => p.id}
      actions={p => (
        <>
          {onEdit && <button onClick={e => { e.stopPropagation(); onEdit(p.id); }}>수정</button>}
          {onDelete && <button onClick={e => { e.stopPropagation(); onDelete(p.id); }}>삭제</button>}
        </>
      )}
    />
  );
}
